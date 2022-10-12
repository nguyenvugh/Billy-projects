import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddressService } from './customer-address.service';
import { CustomerAddressController } from './customer-address.controller';
import { CustomerAddressRepository } from './repository/customer-address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAddressRepository])],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
})
export class CustomerAddressModule {}
