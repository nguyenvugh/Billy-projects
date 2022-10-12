import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerContactFormService } from './customer-contact-form.service';
import { CustomerContactFormController } from './customer-contact-form.controller';
import { CustomerContactFormRepository } from './repository/customer-contact-form.repository';
import { AuthModule } from 'src/auth/auth.module';
import { JwtCoreModule } from '../jwt-core/jwt-core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerContactFormRepository]),
    AuthModule,
    JwtCoreModule,
  ],
  controllers: [CustomerContactFormController],
  providers: [CustomerContactFormService],
})
export class CustomerContactFormModule {}
