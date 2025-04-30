import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { UserResponseDto } from 'src/api/User/dto/user-response.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserResponseDto | undefined> {
    const user = await this.prisma.findOneByEmail(email);
    
    if (!user) return undefined;

    const isPasswordValid = await argon2.verify(user.password, pass);
    if (!isPasswordValid) return undefined;

    const { password, ...safeUser } = user;
    return safeUser;

  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id }; 
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}