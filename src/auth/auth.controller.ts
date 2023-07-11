import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { UserLoginDto } from './dtos/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @Post('signup')
  signUp(@Body() userSignUpDto: UserSignUpDto) {
    return this.authService.signUp(userSignUpDto);
  }
}
