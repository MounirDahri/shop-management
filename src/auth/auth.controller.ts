import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}


    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

    @Post('signup')
    signup(@Body() signupDto: SignupDto){
        return this.authService.signup(signupDto);
    }
}
