import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { User, UserDocument } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userSignUpDto: UserSignUpDto) {
    const { email, password } = userSignUpDto;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new this.userModel({ email, password: hashedPassword });
    return newUser.save();
  }

  async login(userLoginDto: UserLoginDto) {
    // retrieve user
    const { email, password } = userLoginDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.signUser(user.id, user.email);
    // return { user, token };
    return token;
  }

  async signUser(userId: string, email: string): Promise<string> {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }
}
