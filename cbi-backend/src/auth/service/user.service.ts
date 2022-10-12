import { BadRequestExc } from './../../common/exceptions/custom.exception';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { isEmail } from 'class-validator';
import { IGlobalConfig } from 'src/common/config/global.config';
import { EUserStatus, UserType } from 'src/common/constants/global.constant';
import { NotFoundExc } from 'src/common/exceptions/custom.exception';
import { toLimitOffset, toListResponse } from 'src/common/utils';
import { FileAdmin } from 'src/file/entities/file-admin.entity';
import { FileAdminService } from 'src/file/service/file-admin.service';
import PaginateDto from 'src/utils-module/pagination/dto/paginate.dto';
import { MailService } from 'src/utils-module/service/mail.service';
import { Brackets, DeepPartial, In, IsNull } from 'typeorm';
import { ChangePasswordDTO } from '../dto/change-password.dto';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';
import { CreateAdminDTO } from '../dto/req/create-admin.dto';
import { CreateUserTypeDTO } from '../dto/req/create-user-type.dto';
import { DeleteMultiAdmin } from '../dto/req/delete-multi-admin.dto';
import { GetClientManageParams } from '../dto/req/get-client-manage-params.dto';
import { UpdateAdminAccountDTO } from '../dto/req/update-admin-account.dto';
import { ChangeForgetPassDto } from '../dto/req/forget-password.dto';
import { UpdateAdminDTO } from '../dto/req/update-admin-profile.dto';
import { UpdateClientProfileDTO } from '../dto/req/update-client-profile.dto';
import { UpdateStatusClientManage } from '../dto/req/update-status-client-manage.dto';
import { UpdateProfileDTO } from '../dto/update-profile';
import { UserCompany } from '../entities/user-company.entity';
import { UserDocument } from '../entities/user-document.entity';
import { User } from '../entities/user.entity';
import { UserCompanyRepository } from '../repository/user-company.repository';
import { UserDocumentRepository } from '../repository/user-document.repository';
import { UserTypeRepository } from '../repository/user-type.repository';
import { UserRepository } from '../repository/user.repository';
import { ChangeUserClientPasswordDTO } from '../dto/req/change-user-client-password.dto';
import { CaslService } from 'src/casl/casl.service';
import { GroupPoliciesRepository } from 'src/casl/repositories/group-policies.repository';
import { UserToGroupPoliciesRepository } from 'src/casl/repositories/user-to-group-policies.repository';

@Injectable()
export class UserService {
  private readonly sendGridKey: string;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly caslService: CaslService,
    private readonly configService: ConfigService<IGlobalConfig>,
    private readonly userTypeRepository: UserTypeRepository,
    private readonly userCompanyRepository: UserCompanyRepository,
    private fileAdminService: FileAdminService,
    private userDocumentRepository: UserDocumentRepository,
    private readonly groupPoliciesRepo: GroupPoliciesRepository,
    private readonly userToGroupPoliciesRepo: UserToGroupPoliciesRepository,
  ) {
    this.sendGridKey = this.configService.get('sendGrid.key', {
      infer: true,
    });
  }
  async login(body: LoginDTO) {
    const userDetails = await this.userRepository.findOne(
      isEmail(body.usernameOrEmail)
        ? { email: body.usernameOrEmail }
        : { username: body.usernameOrEmail },
    );

    if (!userDetails) {
      throw new HttpException(
        `Không thể tìm thấy tài khoản: ${body.usernameOrEmail}`,
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    if (userDetails.status !== EUserStatus.ACTIVE) {
      throw new HttpException(
        `Tài khoản '${body.usernameOrEmail}' không hoạt động.`,
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const isValid = bcrypt.compareSync(
      body.password,
      userDetails.encryptedPassword,
    );
    if (isValid) {
      const userWithPolicies = await this.caslService.getUserWithPolicies(
        body.usernameOrEmail,
      );
      let policies = [];
      if (userWithPolicies) {
        userWithPolicies.userToGroupPolicies.forEach((group) => {
          policies = group.groupPolicies.groupToPolicies.map(
            (policy) => policy.policies,
          );
        });
      }

      const accessToken = this.jwtService.sign({
        usernameOrEmail: body.usernameOrEmail,
        policies,
        userType: userDetails.userTypeKey,
      });
      return {
        accessToken,
      };
    } else {
      throw new ForbiddenException('Sai thông tin! Vui lòng thử lại.');
    }
  }
  async register(body: RegisterDTO) {
    const findUser = await this.userRepository.findOne({ email: body.email });
    if (findUser) {
      throw new HttpException(
        'Email đã đăng kí trong hệ thống.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    const token = this.jwtService.sign(
      { email: body.email },
      {
        secret: this.sendGridKey,
        expiresIn: 1000 * 60 * 10,
      },
    );
    const user = new User();
    user.email = body.email;
    user.fullName = body.fullName;
    user.phoneNumber = body.phoneNumber;
    user.encryptedPassword = bcrypt.hashSync(body.password, 10);
    user.userTypeKey = UserType.CLIENT;
    user.companyCode = body.companyCode;
    // user.status = EUserStatus.ACTIVE;
    this.userRepository.save(user);

    const webClientUrl = this.configService.get('webClient.url', {
      infer: true,
    });
    this.mailService.sendEmail(
      body.email,
      `${webClientUrl}/verify-email?token=${token}`,
    );
  }
  async verifyEmail(token: string) {
    try {
      await this.jwtService.verifyAsync(token, { secret: this.sendGridKey });
    } catch (error) {
      throw new ForbiddenException('Your credentials is invalid');
    }
    const { email }: any = this.jwtService.decode(token);
    const findUser = await this.userRepository.findOne({
      email,
    });
    if (!findUser) {
      throw new HttpException(
        `Không thể tìm thấy trong hệ thống: ${email}`,
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    if (findUser.status === EUserStatus.ACTIVE) {
      throw new HttpException(
        'Tài khoản của bạn đã được kích hoạt.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    findUser.status = EUserStatus.ACTIVE;
    this.userRepository.save(findUser);
    const accessToken = this.jwtService.sign({
      usernameOrEmail: email,
    });
    return {
      accessToken,
    };
  }
  async registerAdmin(body: CreateAdminDTO) {
    let findUser = null;
    findUser = await this.userRepository.findOne({ username: body.username });
    if (findUser) {
      throw new HttpException(
        'Username is already existed',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    const existGroupPolicies = await this.groupPoliciesRepo.findOne(
      body.groupPolicyKey,
    );
    if (!existGroupPolicies)
      throw new BadRequestExc('Tên nhóm quyền không tồn tại');
    const user = new User();
    user.username = body.username;
    user.encryptedPassword = bcrypt.hashSync(body.password, 10);
    user.fullName = body?.fullName;
    user.status = body.status;
    user.phoneNumber = body?.phoneNumber;
    user.userTypeKey = UserType.ADMIN;
    const userToGroupPolicies = await this.userToGroupPoliciesRepo.create({
      groupPoliciesKey: existGroupPolicies.key,
    });
    user.userToGroupPolicies = [userToGroupPolicies];
    return this.userRepository.save(user);
  }
  async getActiveUser(usernameOrEmail: string) {
    let user = null;
    user = await this.userRepository.findOne(
      isEmail(usernameOrEmail)
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    );
    return user;
  }

  async updateProfile(user: User, body: UpdateProfileDTO) {
    user.fullName = body.fullName || user.fullName;
    user.phoneNumber = body.phoneNumber || user.phoneNumber;
    user.username = body.username || user.username;
    this.userRepository.save(user);
  }

  async updateClientProfile(user: User, body: UpdateClientProfileDTO) {
    const {
      fullName,
      birthday,
      phoneNumber,
      companyName,
      position,
      address,
      numberEmployees,
      revenue,
      phoneNumberCompany,
      website,
      workField,
      avatarId,
      documentId,
      documentDescription,
      dateCreateCompany,
      numUnofficialEmployees,
      modelManufactoring,
      sizeManufactoring,
      materialArea,
      isApplyWorkingDiary,
      isapplyDigital,
      companyCode,
    } = body;
    const { id } = user;
    await this.findOneOrError(id);
    const avatar = await this.fileAdminService.findOneOrError(avatarId);
    let document: FileAdmin;
    if (documentId) {
      document = await this.fileAdminService.findOneOrError(documentId);
    }
    const companyParam: DeepPartial<UserCompany> = {
      name: companyName,
      position,
      address,
      numberEmployees,
      revenue,
      phoneNumber: phoneNumberCompany,
      website,
      workField,
      user,
      dateCreateCompany,
      numUnofficialEmployees,
      modelManufactoring,
      sizeManufactoring,
      materialArea,
      isApplyWorkingDiary,
      isapplyDigital,
    };
    let documentParam: DeepPartial<UserDocument> = {
      description: documentDescription,
      user,
    };
    if (documentId) {
      documentParam.file = document;
    }
    const existedDocument = await this.userDocumentRepository.findOne({
      user,
    });
    if (existedDocument) {
      documentParam.id = existedDocument.id;
    }
    const existedCompany = await this.userCompanyRepository.findOne({
      user,
    });
    if (existedCompany) {
      companyParam.id = existedCompany.id;
    }
    await Promise.all([
      this.userRepository.update(id, {
        fullName,
        birthday,
        phoneNumber,
        avatar,
        companyCode,
      }),
      this.userDocumentRepository.save(documentParam),
      this.userCompanyRepository.save(companyParam),
    ]);
    return this.findProfile(id);
  }

  async findProfile(id: string) {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.userCompany', 'user_companies')
      .leftJoinAndSelect('user.userDocument', 'user_documents')
      .leftJoinAndSelect('user_documents.file', 'file')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('user.userToGroupPolicies', 'user_to_group_policies')
      .getOne();
    if (!result) throw new NotFoundExc('Profile');
    return result;
  }

  async changePassword(user: User, body: ChangePasswordDTO) {
    const { oldPassword, password } = body;
    if (oldPassword === password) {
      throw new HttpException(
        'New password must be different',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isValid = bcrypt.compareSync(
      body.oldPassword,
      user.encryptedPassword,
    );
    if (isValid) {
      user.encryptedPassword = bcrypt.hashSync(body.password, 10);
      this.userRepository.save(user);
    } else {
      throw new HttpException(
        'Your old password is not correct',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async updateAdminProfile(user: User, updateArticleDto: UpdateAdminDTO) {
    const {
      avatarId,
      password,
      confirmPassword,
      oldPassword,
      fullName,
      phoneNumber,
    } = updateArticleDto;
    const updatedAdmin: DeepPartial<User> = {
      fullName,
      phoneNumber,
    };
    if (password && confirmPassword && oldPassword) {
      const isValid = bcrypt.compareSync(oldPassword, user.encryptedPassword);
      if (!isValid) {
        throw new HttpException(
          'Your old password is not correct',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
      const isCoincided = bcrypt.compareSync(password, user.encryptedPassword);
      if (isCoincided) {
        throw new HttpException(
          'New password must be different',
          HttpStatus.BAD_REQUEST,
        );
      }
      updatedAdmin.encryptedPassword = bcrypt.hashSync(password, 10);
    }
    const avatar = await this.fileAdminService.findOneOrError(avatarId);
    updatedAdmin.avatar = avatar;
    await this.findOneOrError(user.id);
    await this.userRepository.update(user.id, updatedAdmin);
    return this.findProfile(user.id);
  }

  async updateAdminAccountById(
    id: string,
    updateAdminDto: UpdateAdminAccountDTO,
  ) {
    const {
      password,
      confirmPassword,
      fullName,
      phoneNumber,
      status,
      username,
      groupPolicyKey,
    } = updateAdminDto;
    const findUser = await this.userRepository.findOne({
      username,
    });
    if (findUser && findUser.id !== id) {
      throw new HttpException(
        'Username is already existed',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    const existGroupPolicies = await this.groupPoliciesRepo.findOne(
      groupPolicyKey,
    );
    if (!existGroupPolicies)
      throw new BadRequestExc('Tên nhóm quyền không tồn tại');
    const currentUser = await this.findOneOrError(id);
    const userToGroupPolicies = await this.userToGroupPoliciesRepo.findOne({
      userId: currentUser.id,
    });

    if (userToGroupPolicies) {
      userToGroupPolicies.groupPoliciesKey = groupPolicyKey;
      await this.userToGroupPoliciesRepo.update(
        {
          userId: currentUser.id,
        },
        userToGroupPolicies,
      );
    } else {
      await this.userToGroupPoliciesRepo.save({
        userId: currentUser.id,
        groupPoliciesKey: existGroupPolicies.key,
      });
    }

    const updatedAdmin: DeepPartial<User> = {
      id,
      fullName,
      phoneNumber,
      status,
      username,
    };
    if (password && confirmPassword) {
      updatedAdmin.encryptedPassword = bcrypt.hashSync(password, 10);
    }

    await this.userRepository.save(updatedAdmin);
    return this.findProfile(id);
  }

  async remove(id: string) {
    const result = await this.userRepository.softDelete({
      id,
      deletedAt: IsNull(),
    });
    if (!result.affected) throw new NotFoundExc('Admin');
    return;
  }

  async removeMulti(body: DeleteMultiAdmin) {
    const { ids } = body;
    const result = await this.userRepository.softDelete({
      id: In(ids),
      deletedAt: IsNull(),
    });

    if (!result.affected) throw new NotFoundExc('Admin');
    return;
  }

  async findOneOrError(id: string) {
    const exist = await this.userRepository.findOne(id);
    if (!exist) throw new NotFoundExc('Admin');
    return exist;
  }

  async createUserType(createUserType: CreateUserTypeDTO) {
    await this.userTypeRepository.save(createUserType);
  }

  async getAdminAccount({ searchText, page, limit: take }: PaginateDto) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    const skip = (page - 1) * take;
    const [results, total] = await queryBuilder
      .where('user.userTypeKey LIKE :userTypeKey', {
        userTypeKey: UserType.ADMIN,
      })
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('user.userToGroupPolicies', 'user_to_group_policies')
      .orderBy({
        'user.createdAt': 'DESC',
      })
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return { results, total };
  }

  async getClientAccount(params: GetClientManageParams) {
    const [results, total] = await this.userRepository.getAllUserClient(params);
    return toListResponse(results, total, params.limit);
  }

  async updateUserAccountStatus(
    { lockReason, status }: UpdateStatusClientManage,
    id: string,
  ) {
    const user = await this.getUserClientByIdAndFail(id);
    if (status === EUserStatus.INACTIVE) {
      user.lockReason = lockReason;
    }
    user.status = status;
    return this.userRepository.save(user);
  }

  async getUserClientByIdAndFail(id: string) {
    const user = await this.userRepository.findOne(id, {
      where: {
        userTypeKey: UserType.CLIENT,
      },
    });
    if (!user) throw new BadRequestExc('Người dùng không tồn tại!');
    return user;
  }

  async changePasswordUserClient(
    id: string,
    data: ChangeUserClientPasswordDTO,
  ) {
    const user = await this.getUserClientByIdAndFail(id);
    if (data.confirmPassword !== data.password) {
      throw new BadRequestExc(
        'Mật khẩu mới và xác nhận mật khẩu không trùng khớp!',
      );
    }
    user.encryptedPassword = bcrypt.hashSync(data.password, 10);
    return await this.userRepository.save(user);
  }

  async forgetPassword(email: string) {
    // Create a token with 30min time, put it into a route home?forget-password=true&&token=xxxx and send
    // it to user email.
    // Use sendgrid key to send it to user like old logic register.
    const findUser = await this.userRepository.findOne({
      email,
      userTypeKey: UserType.CLIENT,
    });
    if (!findUser) {
      throw new HttpException(
        'Email không tồn tại',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    const token = this.jwtService.sign(
      { email },
      {
        secret: this.sendGridKey,
        expiresIn: 1000 * 60 * 30,
      },
    );

    const webClientUrl = this.configService.get('webClient.url', {
      infer: true,
    });
    const templateForgetPassId = this.configService.get(
      'sendGrid.templateForgetPassId',
      {
        infer: true,
      },
    );
    this.mailService.sendEmailWithTemplate(
      email,
      `${webClientUrl}?forget-password=true&&token=${token}`,
      templateForgetPassId,
    );
    return 'success';
  }

  async changePasswordForget(body: ChangeForgetPassDto) {
    // Check token is valid, and get email from token.
    try {
      await this.jwtService.verifyAsync(body.token, {
        secret: this.sendGridKey,
      });
    } catch (error) {
      throw new ForbiddenException('Token không hợp lệ! Vui lòng thử lại.');
    }
    const { email }: any = this.jwtService.decode(body.token);

    // Check user exist
    const user = await this.userRepository.findOne({
      email,
      userTypeKey: UserType.CLIENT,
    });
    if (!user) {
      throw new HttpException(
        'Email không tồn tại',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    // Update password and return user.
    user.encryptedPassword = bcrypt.hashSync(body.password, 10);
    return this.userRepository.save(user);
  }
}
