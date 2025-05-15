import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import * as argon2 from 'argon2';
import { LoginUserDto } from 'src/api/User/dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { User } from 'generated/prisma';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    const { name, email, password } = createUserDto;
    const checkUserExist = await this.userRepository.findUserByNameOrEmail(
      name,
      email,
    );

    if (checkUserExist) {
      throw new ConflictException(
        'User already registered with this name and email',
      );
    }
    try {
      const user = await this.userRepository.createUser(name, email, password);
      return this.login(user);
    } catch (err) {
      throw new InternalServerErrorException('Error when registering a user');
    }
  }

  async signIn(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOneByEmail(email);

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
