import { Module } from '@nestjs/common';
import { SolanaService } from './solana.service';
import { EthereumService } from './ethereum.service';

@Module({
  providers: [SolanaService, EthereumService]
})
export class BlockchainModule {}
