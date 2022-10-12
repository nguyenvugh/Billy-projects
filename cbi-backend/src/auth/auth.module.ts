import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IGlobalConfig } from 'src/common/config/global.config';
import { EXPIRE_JWT_TOKEN } from 'src/common/constants/global.constant';
import { FileModule } from 'src/file/file.module';
import { UtilsModule } from 'src/utils-module/utils.module';
import { AdminManageController } from './controller/admin-manage.controller';
import { AuthController } from './controller/auth.controller';
import { ClientManageController } from './controller/client-manage.controller';
import { UserCompany } from './entities/user-company.entity';
import { UserDocument } from './entities/user-document.entity';
import { UserType } from './entities/user-type.entity';
import { User } from './entities/user.entity';
import { UserCompanyRepository } from './repository/user-company.repository';
import { UserDocumentRepository } from './repository/user-document.repository';
import { UserTypeRepository } from './repository/user-type.repository';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';
import { UserModule as CbiUserUserModule } from '../cbi-user/cbi-user/user/user.module';
import { UserModule as CbiUserLevelUserModule } from '../cbi-user/cbi-user-level/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { CaslService } from 'src/casl/casl.service';
import { GroupPoliciesRepository } from 'src/casl/repositories/group-policies.repository';
import { UserToGroupPoliciesRepository } from 'src/casl/repositories/user-to-group-policies.repository';
import { GroupPolicies } from 'src/casl/entities/group-policies.entity';
import { UserToGroupPolicies } from 'src/casl/entities/user-to-group-policies.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserCompany,
      UserDocument,
      UserType,
      UserRepository,
      UserTypeRepository,
      UserCompanyRepository,
      UserDocumentRepository,
      GroupPolicies,
      GroupPoliciesRepository,
      UserToGroupPolicies,
      UserToGroupPoliciesRepository,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IGlobalConfig>) => {
        return {
          secret: configService.get('auth.jwtSecretKey', { infer: true }),
          signOptions: { expiresIn: EXPIRE_JWT_TOKEN, algorithm: 'HS256' },
        };
      },
      inject: [ConfigService],
    }),
    UtilsModule,
    FileModule,
    CbiUserUserModule,
    CbiUserLevelUserModule,
  ],
  providers: [UserService, JwtStrategy],
  controllers: [AuthController, AdminManageController, ClientManageController],
  exports: [TypeOrmModule, UserService],
})
export class AuthModule {}
