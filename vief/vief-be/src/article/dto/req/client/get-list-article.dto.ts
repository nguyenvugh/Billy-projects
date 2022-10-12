import { ApiProperty } from '@nestjs/swagger';
import { IsValidText } from '../../../../common/decorators/custom-validator.decorator';
import { GetListArticleDto } from '../admin/get-list-articles.dto';

export class GetListArticleByClientDto extends GetListArticleDto {
  @ApiProperty({ required: false })
  @IsValidText({ required: false })
  slugCategory: string;
}
