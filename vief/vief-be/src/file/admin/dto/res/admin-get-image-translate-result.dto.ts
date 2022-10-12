import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdminGetImageTranslateResultDto {
  @Expose()
  lang: string;

  @Expose()
  alt: string;

  @Expose()
  title: string;
}
