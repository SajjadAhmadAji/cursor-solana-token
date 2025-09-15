import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma.service';
import { QueueModule } from './queue/queue.module';
import { QueueService } from './queue.service';
import { BlockchainModule } from './blockchain/blockchain.module';
import { TokensModule } from './tokens/tokens.module';
import { TokensService } from './tokens.service';
import { MetadataModule } from './metadata/metadata.module';
import { MetadataService } from './metadata.service';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, QueueModule, BlockchainModule, TokensModule, MetadataModule, AdminModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, QueueService, TokensService, MetadataService, AdminService, UsersService],
})
export class AppModule {}
