import { Expose } from 'class-transformer';
import { UserDTO } from 'src/auth/dto/user.dto';
import { LangEnum } from '../../../common/constants/global.constant';
import { FileAdminDto } from '../../../file/dto/file-admin.dto';

class ArticleCateTranslateDto {
  @Expose()
  lang: LangEnum;

  @Expose()
  name: string;

  @Expose()
  slug: string;
}

export class ArticleCateDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  creator: UserDTO;

  @Expose()
  translates: ArticleCateTranslateDto;

  constructor(partial: Partial<ArticleCateDto>) {
    Object.assign(this, partial);
  }
}
