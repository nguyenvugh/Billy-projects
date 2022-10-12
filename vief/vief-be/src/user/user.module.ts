import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IGlobalConfig } from '../common/config/global.config';
import { UserToGroupPoliciesRepository } from '../casl/repository/user-to-group-policies.repository';
import { FileRepository } from '../file/file.repository';
import { FileService } from '../file/file.service';
import { UtilsModule } from '../utils-module/utils.module';
import { AdminController } from './admin/controller/admin.controller';
import { Admin } from './admin/entities/admin.entity';
import { AdminRepository } from './admin/repository/admin.repository';
import { AdminService } from './admin/service/admin.service';
import { ClientController } from './client/controller/client.controller';
import { Client } from './client/entities/client.entity';
import { ClientRepository } from './client/repository/client.repository';
import { ClientService } from './client/service/client.service';
import { UserController } from './controller/user.controller';
import { UserType } from './entities/user-type.entity';
import { User } from './entities/user.entity';
import { UserTypeRepository } from './repository/user-type.repository';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      //User,
      //UserType,
      //Admin,
      //Client,
      ClientRepository,
      //FileRepository,
    ]),
    UtilsModule,
    AdminModule,
  ],
})
export class UserModule {}
