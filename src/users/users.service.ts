import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { SignupDto } from 'src/auth/dtos/signup.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private UsersModel: Model<User>,
    ) {}
    async findUserByEmail(email: string) {
        return await this.UsersModel.findOne({
            email
        });
    }

    async createUser(signupDto: SignupDto){
        return await this.UsersModel.create(signupDto);
    }
}
