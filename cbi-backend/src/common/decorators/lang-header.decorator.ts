import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { KEY_LANG_HEADER, LangEnum } from '../constants/global.constant';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export function LangHeaderDecor() {
  return applyDecorators(
    ApiHeader({
      name: KEY_LANG_HEADER,
      description: 'Input language for request header. ex: lang = vi',
      schema: {
        default: LangEnum.En,
      },
    }),
  );
}

export const GetLangDecor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const lang = (request.headers?.lang as LangEnum) || LangEnum.En;
    return lang;
  },
);
