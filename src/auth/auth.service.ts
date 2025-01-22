import { BadRequestException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { ValidatedDto } from './dtos/validated.dto';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedDto } from './dtos/authenticated.dto';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login( loginDto: LoginDto): Promise<AuthenticatedDto>{
        const user = await this.validateUser(loginDto);
        if(!user){
            throw new UnauthorizedException()
        }
        return this.signIn(user);
    }

    async validateUser( loginDto: LoginDto ): Promise<ValidatedDto> {
        const {email, password} = loginDto;
        const user = await this.usersService.findUserByEmail(email);
        if(!user){
            throw new NotFoundException(`User ${email} is not found`);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw new UnauthorizedException('Wrong password');
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    }

    async signIn( validatedDto: ValidatedDto ): Promise<AuthenticatedDto>{

        const tokenPayload = {
            sub: validatedDto.id,
            email: validatedDto.email,
            name: validatedDto.name,
            role: validatedDto.role
        }

        const accesToken = await this.jwtService.signAsync(tokenPayload);

        return {
            accesToken
        }
    }

    async signup( signupDto: SignupDto){
        const {email, password, name, role} = signupDto
        const user = await this.usersService.findUserByEmail(email)
        if(user){
            throw new BadRequestException('Email already in use')
        }
        const hasedPassword = await bcrypt.hash(password, 10)
        await this.usersService.createUser({
            name,
            email,
            role,
            password: hasedPassword,
        })
        return {
            code: 201,
            message: 'User created successfully'
        }
    }
}
