import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/api/User/dto/createUser.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from './AuthGuard';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    return this.userService.signUp(createUserDto);
  }

  @Post('Signin')
  async signIn(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string }>{
    return this.userService.signIn(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('dashboard')
  getDashboard() {
    return { message: 'hello world' };
  }
}
