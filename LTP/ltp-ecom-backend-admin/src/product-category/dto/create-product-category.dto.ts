import { ProductCategory } from './../schemas/product-category.schema';
import { BadRequestExc } from './../../common/exceptions/custom.exception';
import { ApiProperty } from '@nestjs/swagger';
import {
  Transform,
  Type,
  plainToClass,
  TransformPlainToClass,
} from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  validate,
  ValidatePromise,
  ValidatorConstraint,
} from 'class-validator';
import { safeParseJson } from 'src/common/utils';
import { BooleanValue } from 'src/common/constants';

// {
//   "image": 1,
//   "translates": [
//     {
//      "language_code": "vi",
//      "language_field": "name",
//      "language_value": "Nhựa nguyên khối"
//     },
// {
//      "language_code": "en",
//      "language_field": "name",
//      "language_value": "Plastic"
//     }
//   ]
// }

export class CreateProductCategoryTransDto {
  language_code: string;
  language_field: string;
  language_value: string;
  product_category?: ProductCategory;
}

export class CreateProductCategoryDto {
  // @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  // files: Express.Multer.File[];

  // @ApiProperty({ type: 'string', format: 'binary' })
  // file: Express.Multer.File;

  // @ApiProperty()
  // @ValidatePromise()
  // @Transform(async ({ value }) => {
  //   const dataObj = safeParseJson(value);
  //   // Chcek dataObj is array
  //   if (!Array.isArray(dataObj)) throw new BadRequestExc();

  //   // Validate obj inside array.
  //   const promiseList = dataObj.map(async (obj) => {
  //     const objClass = plainToClass(CreateProductCategoryTransDto, obj);
  //     return validate(objClass);
  //   });

  //   // If we not use this, application will crash
  //   const data = await Promise.all(promiseList);
  //   const existError = data.find((errorObj) => errorObj.length > 0);
  //   if (existError) throw new BadRequestExc();
  //   // console.log('existError', existError);

  //   return dataObj;
  // })
  // translates: Promise<CreateProductCategoryTransDto[]>; //CreateProductCategoryTransDto[];

  @ApiProperty()
  translates: CreateProductCategoryTransDto[];

  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  image: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  parent?: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @IsEnum(BooleanValue)
  is_feature?: number = BooleanValue.FALSE;
}
