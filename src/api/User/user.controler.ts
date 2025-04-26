import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService ) {}

  @Post('signin')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }
}
