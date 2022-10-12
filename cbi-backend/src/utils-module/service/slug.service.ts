import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugService {
  public static readonly SEPARATOR = '-';

  slug(text: string): string {
    return slugify(text, {
      remove: /[*+~.()'"!:@/]/g,
    });
  }
}
