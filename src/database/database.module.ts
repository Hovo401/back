// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [DatabaseController],
  providers: [DatabaseService, PrismaService],
})
export class DatabaseModule {}
