import { Test, TestingModule } from '@nestjs/testing';
import { AiToolsController } from './ai-tools.controller';
import { AiToolsService } from './ai-tools.service';
import { PrismaModule } from '../../common/prisma.module';
import { HttpModule } from '@nestjs/axios';

describe('AiToolsController', () => {
  let controller: AiToolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, HttpModule],
      controllers: [AiToolsController],
      providers: [AiToolsService],
    }).compile();

    controller = module.get<AiToolsController>(AiToolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
