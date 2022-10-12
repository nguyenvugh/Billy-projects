import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsController } from './controller/emails.controller';
import { Emails } from './entity/emails.entity';
import { EmailsRepository } from './repository/emails.repository';
import { EmailsService } from './service/emails.service';

@Module({
  imports: [TypeOrmModule.forFeature([Emails, EmailsRepository])],
  controllers: [EmailsController],
  providers: [EmailsService],
  exports: [TypeOrmModule, EmailsService],
})
export class EmailsModule {}
