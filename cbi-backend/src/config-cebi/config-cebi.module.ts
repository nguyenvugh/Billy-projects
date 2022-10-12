import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigCebiController } from './config-cebi.controller';
import { ConfigCebiService } from './config-cebi.service';
import { ConfigOxfamRepository } from './config-oxfam.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigOxfamRepository])],
  controllers: [ConfigCebiController],
  providers: [ConfigCebiService],
})
export class ConfigCebiModule {}
