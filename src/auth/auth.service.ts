import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { User } from './models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  signUp(userSignUpDto: UserSignUpDto) {}

  async login(userLoginDto: UserLoginDto) {
    // retrieve user
    const { email, password } = userLoginDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
