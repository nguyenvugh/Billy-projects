import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { FindManyOptions, Like, FindOneOptions, Not } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import * as firebase from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { v4 as uuidv4 } from 'uuid';
import { UserTypeKey } from '../../../common/enums/global.enum';
import {
  PASSWORD_SALT_LENGTH,
  PrefixType,
} from '../../../common/constants/global.constant';
import { ADMIN_GROUP_POLICY_KEY } from '../../../common/constants/group-policy.constant';
import {
  AdminFieldValidateMessages,
  AdminValidateMessage,
} from '../../../common/constants/validate.constant';
import {
  BadRequestExc,
  ConflictExc,
  InternalServerErrorExc,
  NotFoundExc,
} from '../../../common/exceptions/custom.exception';
import {
  getPagingParams,
  generateMapDataWithKeyFieldPair,
  getFieldValueOfObjectData,
} from '../../../common/utils';
import { ClientRepository } from '../../client/repository/client.repository';
import { UserRepository } from '../../repository/user.repository';
import { UserToGroupPoliciesRepository } from '../../../casl/repository/user-to-group-policies.repository';
import { CreateAdminDto } from '../dto/req/create-admin.dto';
import { UpdateAdminDto } from '../dto/req/update-admin.dto';
import { AdminLoginDto } from '../dto/req/login.dto';
import { AdminGetAdminsDto } from '../dto/req/admin-get-admins.dto';
import { AdminRepository } from '../repository/admin.repository';
import { Admin, AdminWithPolicies } from '../entities/admin.entity';
import { GroupPolicies } from '../../../casl/group-policy/entity/group-policies.entity';
// import { initializeApp } from 'firebase/app';
import { AdminGroupPolicySerrvice } from '../../../casl/group-policy/admin/service/admin-group-policy.service';

@Injectable()
export class AdminService {
  constructor(
    private jwtService: JwtService,
    private adminRepository: AdminRepository,
    private adminGroupPolicySerrvice: AdminGroupPolicySerrvice,
    private userRepo: UserRepository,
    private userToGroupPoliciesRepo: UserToGroupPoliciesRepository,
  ) {}

  async login(body: AdminLoginDto) {
    const loginFailMsg = 'Thông tin đăng nhập không đúng';
    const adminGet = await this.adminRepository.findOne({
      where: {
        email: body.email,
      },
      select: ['email', 'password'],
    });
    if (!adminGet) {
      throw new BadRequestExc(`${loginFailMsg}`);
    }
    const isValid = bcrypt.compareSync(body.password, adminGet.password);
    if (!isValid) {
      throw new BadRequestExc(`${loginFailMsg}`);
    }
    // TODO: load policy
    const accessToken = this.jwtService.sign({
      email: body.email,
    });
    return {
      accessToken,
    };
  }

  async getAdminWithPoliciesData(email: string) {
    if (!email) {
      return null;
    }
    const adminGet = await this.adminRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!adminGet) {
      return null;
    }
    // TODO: load policy
    return {
      admin: adminGet,
    };
  }

  async getAdmins(req: AdminGetAdminsDto) {
    const { page, limit, email } = req;
    const { take, skip } = getPagingParams(page, limit);
    const findConditions: any = {};
    if (email) {
      findConditions['email'] = Like(`%${email}%`);
    }
    const query: FindManyOptions<Admin> = {
      join: {
        alias: 'admin',
        innerJoinAndSelect: {
          admin_user: 'admin.user',
          admin_user_user_to_group_policy: 'admin_user.userToGroupPolicies',
          userType: 'admin_user_user_to_group_policy.groupPolicies',
        },
      },
      where: (qb) => {
        qb.where({
          ...findConditions,
        });
        qb.andWhere(
          'admin_user_user_to_group_policy.group_policies_key NOT IN (:...group_policy_keys)',
          {
            group_policy_keys: [ADMIN_GROUP_POLICY_KEY],
          },
        );
      },
      order: {
        email: 'ASC',
      },
      skip: skip,
      take: take,
    };
    const [results, total] = await Promise.all([
      this.adminRepository.find(query),
      this.adminRepository.count(query),
    ]);
    const data = this.convertGroupPolicyToUserTypeInAdmins(results);

    return {
      data,
      total,
    };
  }

  async getAdmin(id: number) {
    const idInvalid = AdminFieldValidateMessages.id.invalid;
    const idNotFoundMsg = AdminFieldValidateMessages.id.admin.not_found;
    if (!id) {
      throw new BadRequestExc(`${idInvalid}`);
    }
    const query: FindOneOptions<Admin> = {
      join: {
        alias: 'admin',
        innerJoinAndSelect: {
          admin_user: 'admin.user',
          admin_user_user_to_group_policy: 'admin_user.userToGroupPolicies',
          userType: 'admin_user_user_to_group_policy.groupPolicies',
        },
      },
      where: (qb) => {
        qb.where({
          id,
        });
        qb.andWhere(
          'admin_user_user_to_group_policy.group_policies_key NOT IN (:...group_policy_keys)',
          {
            group_policy_keys: [ADMIN_GROUP_POLICY_KEY],
          },
        );
      },
    };
    const data = await this.adminRepository.findOne(query);
    if (!data) {
      throw new NotFoundExc(`${idNotFoundMsg}`);
    }

    return {
      data: this.convertGroupPolicyToUserTypeInAdmin(data),
    };
  }

  @Transactional()
  async createAdmin(body: CreateAdminDto) {
    const createAdminFailedMsg = AdminValidateMessage.admin.create.fail;
    const { email, password, userType } = body;
    const listGroupPolicies = await this.validateDataUpdateAdmin(body);
    const mapGroupPoliciesByKey = generateMapDataWithKeyFieldPair(
      listGroupPolicies,
      'key',
    );
    const groupPolicyByKey = mapGroupPoliciesByKey[userType];

    const userCreated = await this.userRepo.save({
      userTypeKey: PrefixType.ADMIN,
      admin: {
        email,
        password,
      },
      userToGroupPolicies: [
        {
          groupPoliciesKey: userType,
        },
      ],
    });
    if (!userCreated) {
      throw new BadRequestExc(`${createAdminFailedMsg}`);
    }
    const adminCreated = userCreated.admin;

    return {
      data: {
        ...adminCreated,
        userType: [groupPolicyByKey],
      },
    };
  }

  @Transactional()
  async updateAdmin(id: number, body: UpdateAdminDto) {
    const updateAdminFailedMsg = AdminValidateMessage.admin.update.fail;
    const { email, password, userType } = body;
    const adminDetailRs = await this.getAdmin(id);
    const adminDetail = adminDetailRs.data;
    const listGroupPolicies = await this.validateDataUpdateAdmin(body, id);
    const mapGroupPoliciesByKey = generateMapDataWithKeyFieldPair(
      listGroupPolicies,
      'key',
    );
    const groupPolicyByKey = mapGroupPoliciesByKey[userType];

    const adminUpdated = await this.adminRepository.save({
      id: adminDetail.id,
      email,
      password,
    });
    if (!adminUpdated) {
      throw new BadRequestExc(`${updateAdminFailedMsg}`);
    }
    await this.userToGroupPoliciesRepo.delete({
      userId: adminDetail.user.id,
    });
    const adminToGroupPolicy = await this.userToGroupPoliciesRepo.save({
      userId: adminDetail.user.id,
      groupPoliciesKey: userType,
    });
    if (!adminToGroupPolicy) {
      throw new BadRequestExc(`${updateAdminFailedMsg}`);
    }

    return {
      data: {
        ...adminUpdated,
        userType: [groupPolicyByKey],
      },
    };
  }

  @Transactional()
  async deleteAdmin(id: number) {
    const deleteAdminFailedMsg = AdminValidateMessage.admin.delete.fail;
    const adminDetailRs = await this.getAdmin(id);
    const adminDetail = adminDetailRs.data;
    await this.adminRepository.softDelete(id);

    return 'ok';
  }

  private convertGroupPolicyToUserTypeInAdmins(admins: Admin[]) {
    if (!admins || !admins.length) {
      return admins;
    }
    admins = admins.map((admin) => {
      return this.convertGroupPolicyToUserTypeInAdmin(admin);
    });

    return admins;
  }

  private convertGroupPolicyToUserTypeInAdmin(admin: Admin) {
    if (!admin || !admin.user) {
      return admin;
    }
    const groupPolicy = getFieldValueOfObjectData(
      admin,
      'user.userToGroupPolicies[0].groupPolicies',
      {},
    );
    const adminWithPoliciesData: AdminWithPolicies = {
      ...admin,
      userType: [groupPolicy],
    };

    return adminWithPoliciesData;
  }

  private async validateDataUpdateAdmin(
    dataUpdate: CreateAdminDto | UpdateAdminDto,
    idUpdate = 0,
  ): Promise<GroupPolicies[]> {
    const { email, userType } = dataUpdate;
    const emailExistedMsg = AdminFieldValidateMessages.email.existed;
    const userTypeInvalidMsg = AdminFieldValidateMessages.user_type.invalid;
    const checkEmailExistsCondition: any = {
      email,
    };
    if (idUpdate) {
      checkEmailExistsCondition['id'] = Not(idUpdate);
    }
    const [adminGetByEmail, listGroupPoliciesRs] = await Promise.all([
      this.adminRepository.findOne({
        where: checkEmailExistsCondition,
      }),
      this.adminGroupPolicySerrvice.getGroupPolicies(),
    ]);
    if (adminGetByEmail) {
      throw new BadRequestExc(`${emailExistedMsg}`);
    }
    if (!listGroupPoliciesRs.hasOwnProperty('data')) {
      throw new BadRequestExc(`${userTypeInvalidMsg}`);
    }
    const listGroupPolicies = listGroupPoliciesRs.data;
    if (!listGroupPolicies || !listGroupPolicies.length) {
      throw new BadRequestExc(`${userTypeInvalidMsg}`);
    }
    const listGroupPolicyKeys = listGroupPolicies.map((groupPolicy) => {
      return groupPolicy.key;
    });
    if (!listGroupPolicyKeys.includes(userType)) {
      throw new BadRequestExc(`${userTypeInvalidMsg}`);
    }

    return listGroupPolicies;
  }

  // // For testing purposes only
  // async loginTest(body: LoginTestDto) {
  //   const { email, password } = body;
  //   const firebaseConfig = {
  //     apiKey: 'AIzaSyBOxS3YxOjAQoy2HQZLsSHAAC4-ukhgO0c',
  //     authDomain: 'bili-dev.firebaseapp.com',
  //     projectId: 'bili-dev',
  //     storageBucket: 'bili-dev.appspot.com',
  //     messagingSenderId: '213696605314',
  //     appId: '1:213696605314:web:0c52d075195101b484989b',
  //     measurementId: 'G-2QYDPXDQ08',
  //   };
  //   const app = initializeApp(firebaseConfig);
  //   const auth = getAuth(app);

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password,
  //     );
  //     const idToken = await userCredential.user.getIdToken();
  //     return idToken;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
