import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
// import { KEY_LANG_HEADER, LangEnum } from '../constants/global.constant';

export const CurrentLang = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.i18nLang;
  },
);

// export function LangHeaderDecor() {
//   return applyDecorators(
//     ApiHeader({
//       name: KEY_LANG_HEADER,
//       description: 'Input language for request header. ex: lang = vi',
//       schema: {
//         default: LangEnum.Vi,
//       },
//     }),
//   );
// }
