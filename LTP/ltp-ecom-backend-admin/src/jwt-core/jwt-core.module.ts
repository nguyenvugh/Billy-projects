import { Module } from '@nestjs/common';
import { JwtCoreService } from './jwt-core.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'asa345346BBSH%%&&*',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [JwtCoreService],
  exports: [JwtCoreService, JwtModule],
})
export class JwtCoreModule { }
