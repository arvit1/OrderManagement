import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {EntityManager} from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly entityManager: EntityManager
  ) {}

  @Get()
  async getHello() {
    return await this.entityManager.query("SELECT * FROM user");
    // return this.appService.getHello();
  }
}
