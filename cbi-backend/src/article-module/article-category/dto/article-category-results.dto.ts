import { Expose } from 'class-transformer';
import { ArticleCateDto } from './articleCategory.dto';

export class ArticleCateResultsDto {
  @Expose()
  results: ArticleCateDto;

  @Expose()
  total: number;
}
