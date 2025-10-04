import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { PrismaModule } from '../../common/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BlockchainService],
  controllers: [BlockchainController],
})
export class BlockchainModule {}
