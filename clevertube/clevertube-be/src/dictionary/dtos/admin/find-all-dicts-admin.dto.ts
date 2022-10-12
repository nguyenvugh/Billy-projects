import { IsOptional, IsString, MaxLength } from "class-validator"

export class FindAllDictsAdminDto {
    @IsString()
    @MaxLength(50)
    @IsOptional()
    word?: string;
}