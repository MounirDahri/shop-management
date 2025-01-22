import { Body, Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
    
    
    @Get('me')
    @UseGuards(AuthGuard)
    getUserInfo(@Request() request){
        return request.user
    }
}
