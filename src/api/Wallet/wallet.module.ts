import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [WalletController],
  providers: [PrismaService],
})
export class UserModule {}