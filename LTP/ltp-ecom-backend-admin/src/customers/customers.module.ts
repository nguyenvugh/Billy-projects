import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/city/schemas/city.schema';
import HashHelper from 'src/common/helpers/hash.helper';
import { Country } from 'src/country/schemas/country.schema';
import { District } from 'src/district/schemas/district.schema';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { OrdersModule } from 'src/orders/orders.module';
import { Orders } from 'src/orders/schemas/orders.schema';
import { Ward } from 'src/ward/schemas/ward.schema';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersAddressesRepository } from './repositories/customers-addresses.repository';
import { CustomersRepository } from './repositories/customers.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomersRepository,
      CustomersAddressesRepository,
    ]),
    TypeOrmModule.forFeature([Orders, Country, City, District, Ward]),
    JwtCoreModule,
    OrdersModule,
    HashHelper,
  ],
  controllers: [CustomersController],
  providers: [CustomersService, HashHelper],
})
export class CustomersModule { }
