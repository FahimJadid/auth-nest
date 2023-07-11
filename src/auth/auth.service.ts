import { Injectable } from '@nestjs/common';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { UserLoginDto } from './dtos/user-login.dto';

@Injectable()
export class AuthService {
  signUp(userSignUpDto: UserSignUpDto) {}

  login(userLoginDto: UserLoginDto) {}
}
