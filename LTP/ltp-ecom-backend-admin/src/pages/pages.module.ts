import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { CompanyInformationTranslateRepository } from './repositories/company-information-translate.repository';
import { CompanyInformationRepository } from './repositories/company-information.repository';
import { PageTranslateRepository } from './repositories/page-translate.repository';
import { PageSlugHistoryRepository } from './repositories/page-slug-histories.repository';
import { PageRepository } from './repositories/page.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PageRepository,
      PageTranslateRepository,
      PageSlugHistoryRepository,
      CompanyInformationRepository,
      CompanyInformationTranslateRepository,
    ]),
    JwtCoreModule,
  ],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
