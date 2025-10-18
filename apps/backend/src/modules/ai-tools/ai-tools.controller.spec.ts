import { Test, TestingModule } from '@nestjs/testing';
import { AiToolsController } from './ai-tools.controller';
import { AiToolsService } from './ai-tools.service';
import { HttpModule } from '@nestjs/axios';

describe('AiToolsController', () => {
  let controller: AiToolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AiToolsController],
      providers: [AiToolsService],
    })
      .overrideProvider(AiToolsService)
      .useValue({
        chat: jest.fn(),
        generateSite: jest.fn(),
      })
      .compile();

    controller = module.get<AiToolsController>(AiToolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
