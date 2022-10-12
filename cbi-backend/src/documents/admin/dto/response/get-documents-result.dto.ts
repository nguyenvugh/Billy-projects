import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateDocumentsResultDto } from './create-documents-result.dto';

export class GetDocumentsResultDto {
  @ApiProperty({
    type: [CreateDocumentsResultDto],
  })
  @Type(() => CreateDocumentsResultDto)
  results: CreateDocumentsResultDto[];

  @ApiProperty()
  total: number;
}
