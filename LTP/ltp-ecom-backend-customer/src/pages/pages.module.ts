import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageRepository } from './repositories/page.repository';
import { PageTranslateRepository } from './repositories/page-translate.repository';
import { PageSlugHistoryRepository } from './repositories/page-slug-histories.repository';
import { CompanyInformationRepository } from './repositories/company-information.repository';
import { CompanyInformationTranslateRepository } from './repositories/company-information-translate.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PageRepository,
      PageTranslateRepository,
      PageSlugHistoryRepository,
      CompanyInformationRepository,
      CompanyInformationTranslateRepository,
    ]),
  ],
  providers: [PagesService],
  controllers: [PagesController],
})
export class PagesModule {}
