import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { AdminGetImageTranslateResultDto } from './admin-get-image-translate-result.dto';

@Exclude()
export class AdminGetImageResultDto {
  @Expose()
  id: number;

  @Expose()
  url: string;

  @Expose()
  @Transform(({ value, obj, type }) => {
    return obj['imageTranslates'].map((item) => {
      return {
        lang: item.lang,
        alt: item.alt,
        title: item.title,
      };
    });
  })
  translates: AdminGetImageTranslateResultDto[];
}
