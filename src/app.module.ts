import { Module } from '@nestjs/common';
import { UserModule } from './api/User/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
