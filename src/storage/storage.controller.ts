import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { multerConfig } from './multer.config';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadMediaDto } from './dto/upload-media.dto';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 20, multerConfig))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: UploadMediaDto,
  ) {
    return this.storageService.saveFiles(files, body.projectName);
  }
}
