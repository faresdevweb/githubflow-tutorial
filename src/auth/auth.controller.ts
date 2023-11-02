import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { loginDTO, registerDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDTO: registerDTO) {
    return this.authService.register(registerDTO);
  }

  @Post('/login')
  async login(@Body() loginDTO: loginDTO) {
    return this.authService.login(loginDTO);
  }
}
