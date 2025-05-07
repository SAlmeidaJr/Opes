import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserResponseDto } from 'src/api/User/dto/user-response.dto';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }

  async findUserByNameOrEmail(name: string, email: string) {
    return this.user.findFirst({
      where: { OR: [{ name: { equals: name } }, { email: { equals: email } }] }
    });
  }


  async findOneById(id: string): Promise<UserResponseDto> {
    const user = await this.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const { password, ...rest } = user;
    return rest;
  }

  async findOneByEmail(email: string) {
    const user = await this.user.findFirst({
      where: { email }
    })
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }
}
