import { Module } from '@nestjs/common';
import { UserController } from './user.controler';
import { UserService } from './user.service';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService ],
  exports: [UserService],
})
export class UserModule {}