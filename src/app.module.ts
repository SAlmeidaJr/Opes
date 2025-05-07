import { Module } from '@nestjs/common';
import { UserModule } from './api/User/user.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/DataBase.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
