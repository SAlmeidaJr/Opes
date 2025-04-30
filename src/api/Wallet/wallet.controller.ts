import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../User/user.service';
import { Param } from '@nestjs/common';

@Controller('wallet')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }
}
