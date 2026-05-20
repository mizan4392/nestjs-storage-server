import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/storage', express.static(path.join(process.cwd(), '/storage')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
