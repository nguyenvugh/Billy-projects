import { Module } from '@nestjs/common';
import { CustomerContactFormService } from './customer-contact-form.service';
import { CustomerContactFormController } from './customer-contact-form.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [CustomerContactFormController],
  providers: [CustomerContactFormService],
})
export class CustomerContactFormModule {}
