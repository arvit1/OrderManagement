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
  getHello() {
    return this.appService.getHello();
  }

  @Get("/kot")
  async entityManagerTest() {
    return await this.entityManager.query("SELECT * FROM role");
  }
}
