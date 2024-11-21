import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsISO8601, IsNumber, IsOptional, IsString } from "class-validator";

export class PersonaUpdateDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    readonly nombres: string;
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    readonly apellidos: string;
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional()
    readonly edad: number;
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    readonly ciudad: string;
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional()
    readonly genero: number;
    @IsOptional()
    @IsISO8601()
    @ApiPropertyOptional()
    readonly fechaNacimiento: Date;
}
