import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // your Next.js frontend
    methods: 'GET,POST',
    credentials: true,
  });
  app.use('/storage', express.static(path.join(process.cwd(), '/storage')));
  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
