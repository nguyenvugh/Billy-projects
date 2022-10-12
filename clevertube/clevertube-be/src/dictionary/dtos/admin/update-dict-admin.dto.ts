import { IsDefined, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateOneDictAdminDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    @IsOptional()
    word: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    detail: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(255)
    example: string;
}