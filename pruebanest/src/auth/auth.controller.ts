import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { stringToSha1 } from "./crypto.utils";
import { UserDto } from "./dto/user.dto";
import { AuthGuard } from "./auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
// import { ApiTags } from "@nestjs/swagger";

// @ApiTags("usuarios")
@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() signInDto: UserDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
    @Post("register")
    async register(@Body() registerDto: UserDto): Promise<any> {
        const user = await this.usersService.findByEmail(registerDto.email);
        if (user) {
            throw new BadRequestException("User already exists");
        }
        const createdUser = await this.usersService.createUser({
            id: 0,
            email: registerDto.email,
            password: stringToSha1(registerDto.password),
        });
        return {
            id: createdUser.id,
            email: createdUser.email,
        };
    }
    @UseGuards(AuthGuard)
    @Get("me")
    @ApiBearerAuth()
    getProfile(@Request() req) {
        return req.user;
    }
}
