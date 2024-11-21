import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "elchavo@lavecindad.com" })
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "ILoveKiko123" })
    readonly password: string;
}
