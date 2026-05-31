import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageEntity } from './entities/storage.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(StorageEntity)
    private mediaRepository: Repository<StorageEntity>,
  ) {}

  //   async saveFiles(
  //     files: Express.Multer.File[],
  //     projectName: string,
  //   ): Promise<{ url: string }[]> {
  //     const savedFiles: StorageEntity[] = [];

  //     for (const file of files) {
  //       const type = file.mimetype.startsWith('image') ? 'image' : 'video';

  //       const url = `${file.path.replace(/\\/g, '/')}`;

  //       const media = this.mediaRepository.create({
  //         originalName: file.originalname,
  //         filename: file.filename,
  //         mimetype: file.mimetype,
  //         size: file.size,
  //         projectName,
  //         type,
  //         url,
  //         path: file.path,
  //       });

  //       const saved = await this.mediaRepository.save(media);

  //       savedFiles.push(saved);
  //     }

  //     return savedFiles?.map((file) => ({
  //       url: file.url,
  //     }));
  //   }

  async saveFiles(files: Express.Multer.File[], projectName: string) {
    const basePath = 'storage';

    // 📁 project folders
    const projectPath = path.join(basePath, projectName);
    const imagesPath = path.join(projectPath, 'images');
    const videosPath = path.join(projectPath, 'videos');

    // ✅ create folders safely
    fs.mkdirSync(imagesPath, { recursive: true });
    fs.mkdirSync(videosPath, { recursive: true });

    const results: StorageEntity[] = [];

    for (const file of files) {
      const isImage = file.mimetype.startsWith('image');

      const targetFolder = isImage ? imagesPath : videosPath;

      const finalPath = path.join(targetFolder, file.filename);

      // 🚚 move file from tmp → final
      fs.renameSync(file.path, finalPath);

      const url = `storage/${projectName}/${
        isImage ? 'images' : 'videos'
      }/${file.filename}`;

      const saved = this.mediaRepository.create({
        projectName,
        originalName: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        type: isImage ? 'image' : 'video',
        url,
        path: finalPath,
      });

      results.push(await this.mediaRepository.save(saved));
    }

    return results?.map((itm) => itm.url);
  }
}
