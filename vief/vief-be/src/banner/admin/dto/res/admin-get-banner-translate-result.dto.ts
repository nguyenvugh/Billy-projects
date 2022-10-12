import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdminGetBannerTranslateResultDto {
  @Expose()
  lang: string;

  @Expose()
  headTitle: string;

  @Expose()
  subTitle: string;

  @Expose()
  description: string;

  @Expose()
  url: string;
}
