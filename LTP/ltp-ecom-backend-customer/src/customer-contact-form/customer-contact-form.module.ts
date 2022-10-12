import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerContactFormService } from './customer-contact-form.service';
import { CustomerContactFormController } from './customer-contact-form.controller';
import { CustomerContactFormRepository } from './repository/customer-contact-form.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerContactFormRepository])],
  controllers: [CustomerContactFormController],
  providers: [CustomerContactFormService],
})
export class CustomerContactFormModule {}
