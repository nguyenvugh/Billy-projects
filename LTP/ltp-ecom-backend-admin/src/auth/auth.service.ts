import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AdminStatusConst } from 'src/common/constants/admin.constant';
import { JwtCoreService } from 'src/jwt-core/jwt-core.service';

import { AdminService } from '../admin/admin.service';

const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtCoreService: JwtCoreService,
  ) { }

  async login(loginRequest: any) {
    const { username, password } = loginRequest;
    const checkUser = await this.validateUser(username, password);
    if (checkUser.type === SUCCESS) {
      const { id, fullname, group_obj } = checkUser.data;
      const permissionsCanAccess = Object.keys(group_obj.permissions).filter(
        (key) => group_obj.permissions[key],
      );
      return {
        code: 200,
        access_token: await this.jwtCoreService.sign({
          id,
          username,
          fullname,
          permissions: permissionsCanAccess,
        }),
        user: { id, username, fullname, permissions: permissionsCanAccess },
      };
    } else {
      return checkUser.data;
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.adminService.findByUsername(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        if (user.status === AdminStatusConst.ACTIVATED) {
          return {
            type: SUCCESS,
            data: user,
          };
        } else {
          return {
            type: ERROR,
            data: {
              code: 401,
              message: 'User is not activated',
            },
          };
        }
      } else {
        return {
          type: ERROR,
          data: {
            code: 401,
            message: 'Wrong password',
          },
        };
      }
    } else {
      return {
        type: ERROR,
        data: {
          code: 404,
          message: 'User not found',
        },
      };
    }
  }

  async getPermission(id: number): Promise<any> {
    const user = await this.adminService.findOne(id);
    if (user) {
      return user.permissions;
    } else {
      return null;
    }
  }
}
