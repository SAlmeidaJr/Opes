import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from '../../../dto/createUser.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserByUsernameOrEmail(name: string, email: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
            { name: { equals: name } },
            { email: { equals: email } }
            ],
      },
    });
  }

  async register(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const checkUserExist = await this.findUserByUsernameOrEmail(name, email);
    if (checkUserExist) {
      throw new Error('Usuário já cadastrado com esse nome e email');
    }

    try {
      const hashPassword = await argon2.hash(password);

      const user = await this.prisma.user.create({
        data: {
          name: name,
          email,
          password: hashPassword,
        },
      });
      return user;
    } catch (err) {
      throw new InternalServerErrorException('Erro ao cadastrar usuário');
    }
  }

  async login(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    const user = await this.findUserByUsernameOrEmail(name, ''); 

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const checkPasswordValid = await argon2.verify(user.password, password)

    if(!checkPasswordValid){
        throw new Error('Credenciais inválidas');
    }

    //implementar token depois -> retornar token ao usario
    return { message: 'Login bem-sucedido', userId: user.id, name: user.name, email: user.email };
  }
}
