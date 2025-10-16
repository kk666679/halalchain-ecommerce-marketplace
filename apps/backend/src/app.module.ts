import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { PrismaModule } from './common/prisma.module';
import { AiToolsModule } from './modules/ai-tools/ai-tools.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProductsModule,
    CartModule,
    BlockchainModule,
    AiToolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
