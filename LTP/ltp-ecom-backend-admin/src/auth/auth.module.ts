import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';

@Module({
  controllers: [AuthController],
  imports: [AdminModule, JwtCoreModule],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule { }
