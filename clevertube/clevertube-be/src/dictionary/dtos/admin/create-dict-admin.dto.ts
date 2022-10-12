import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateDictAdminDto{
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    word: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    detail: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    example: string;
}