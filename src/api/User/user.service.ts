import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as argon2 from 'argon2';
import { LoginUser } from 'src/api/User/dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const checkUserExist = await this.prisma.findUserByUsernameOrEmail(
      name,
      email,
    );
    if (checkUserExist) {
      throw new Error('User already registered with this name and email');
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
    } catch (err) {throw new InternalServerErrorException('Error when registering a user');}
  }

  async login(loginUser: LoginUser) {
    const { name, password } = loginUser;
    const user = await this.prisma.findUserByUsernameOrEmail(name, '');
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    const checkPasswordValid = await argon2.verify(user.password, password);
    if (!checkPasswordValid) {
      throw new Error('Invalid credentials');
    }
    return {
      message: 'Login Suceed',
      userId: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
