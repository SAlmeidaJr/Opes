import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUser {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}