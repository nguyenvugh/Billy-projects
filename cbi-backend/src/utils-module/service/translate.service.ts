import { Injectable } from '@nestjs/common';
import { I18nService, translateOptions } from 'nestjs-i18n';
import { DottedLanguageObjectStringPaths } from '../../common/interfaces/translate.interface';

@Injectable()
export class TranslateService {
  constructor(private readonly i18n: I18nService) {}

  async t(key: DottedLanguageObjectStringPaths, options?: translateOptions) {
    const data = await this.i18n.t(key, options);
    return data;
  }
}
