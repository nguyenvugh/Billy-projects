import { Exclude, Expose, Type } from 'class-transformer';
import { ArticleDto } from './article.dto';

@Exclude()
export class ArticleResultsDto {
  @Expose()
  @Type(() => ArticleDto)
  results: ArticleDto;

  @Expose()
  total: number;

  @Expose()
  totalPage: number;
}
