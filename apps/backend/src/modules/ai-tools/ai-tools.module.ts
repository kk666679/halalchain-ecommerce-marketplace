import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AiToolsController } from './ai-tools.controller';
import { AiToolsService } from './ai-tools.service';
import { PrismaModule } from '../../common/prisma.module';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [AiToolsController],
  providers: [AiToolsService],
})
export class AiToolsModule {}
