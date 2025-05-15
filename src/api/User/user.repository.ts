import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponseDto } from 'src/api/User/dto/user-response.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as argon2 from 'argon2';
import { User } from 'generated/prisma';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByNameOrEmail(name: string, email: string): Promise<User|null> {
    return this.prisma.user.findFirst({
      where: { OR: [{ name: { equals: name } }, { email: { equals: email } }] },
    });
  }

  async findOneById(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const { password, ...rest } = user;
    return rest;
  }

  async findOneByEmail(email: string): Promise<User>{
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(name: string, email: string, password: string): Promise<User> {

    const hashPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 5,
        parallelism: 1,
      });

    return this.prisma.user.create({
        data: {
          name: name,
          email,
          password: hashPassword,
        },
      });
  }
}
