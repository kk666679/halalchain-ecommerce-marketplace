import { Controller, Post, Body } from '@nestjs/common';
import { AiToolsService } from './ai-tools.service';

@Controller('ai-tools')
export class AiToolsController {
  constructor(private readonly aiToolsService: AiToolsService) {}

  @Post('chat')
  async chat(
    @Body() body: { messages: Array<{ role: string; content: string }> },
  ) {
    return this.aiToolsService.chat(body.messages);
  }

  @Post('generate-site')
  async generateSite(@Body('prompt') prompt: string) {
    return this.aiToolsService.generateSite(prompt);
  }
}
