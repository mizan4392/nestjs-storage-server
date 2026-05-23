import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageEntity } from './storage/entities/storage.entity';
import { ConfigModule } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-member-access
require('dotenv').config();

console.log('process.env.DATABASE_PORT', process.env.DATABASE_PORT);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT)
        : 5000,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'storage_db',

      entities: [StorageEntity],

      synchronize: true,
    }),

    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
