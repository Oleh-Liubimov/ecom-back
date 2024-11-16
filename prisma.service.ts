import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  isConnected = false;

  async onModuleInit() {
    if (!this.isConnected) {
      await this.$connect();
      console.log('Connected to postgres');
      this.isConnected = true;
    }
  }

  async onModuleDestroy() {
    if (this.isConnected) {
      await this.$disconnect();
      console.log('Disconnected from postgres');
      this.isConnected = false;
    }
  }
}
