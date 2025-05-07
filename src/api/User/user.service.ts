import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as argon2 from 'argon2';
import { LoginUserDto } from 'src/api/User/dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const checkUserExist = await this.prisma.findUserByNameOrEmail(
      name,
      email,
    );
    if (checkUserExist) {
      throw new Error('User already registered with this name and email');
    }
    try {
      const hashPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 5,
        parallelism: 1,
      });

      const user = await this.prisma.user.create({
        data: {
          name: name,
          email,
          password: hashPassword,
        },
      });
      return this.login(user);
    } catch (err) {
      throw new InternalServerErrorException('Error when registering a user');
    }
  }

  async signIn(loginUserDto: LoginUserDto) {
    const { name, password } = loginUserDto;
    const user = await this.prisma.user.findFirst({
      where: { name: name },
    });

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
