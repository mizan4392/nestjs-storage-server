import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageEntity } from './storage/entities/storage.entity';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-member-access
require('dotenv').config();

console.log('process.env.DATABASE_PORT', process.env.DATABASE_PORT);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT)
        : 5432,
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
