import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // We will setup healcheck later using Terminus
  @Get('setup/aws-healcheck')
  healCheck() {
    return 'This is healthy';
  }
}
