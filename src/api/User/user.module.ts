import { Module } from '@nestjs/common';
import { UserController } from './user.controler';
import { UserService } from './user.service';
import { PrismaService } from '../../database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  imports:[
          JwtModule.registerAsync({
              inject:[ConfigService],
              useFactory: (config: ConfigService) => ({
                  secret: config.getOrThrow('JWT_SECRET'),
                  signOptions: {expiresIn: '60s'},
              })
          })],
  providers: [UserService, PrismaService, JwtStrategy,UserRepository],
  exports: [UserService],
})
export class UserModule {}