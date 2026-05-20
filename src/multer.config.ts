import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { join, extname, basename } from 'path';
import { randomBytes } from 'crypto';

export const uploadDir = join(process.cwd(), 'uploads');

if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/heic',
  'image/avif',
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/x-matroska',
  'video/webm',
];

const sanitizeFilename = (filename: string) => {
  return basename(filename)
    .replace(/[^a-zA-Z0-9_\-.]/g, '_')
    .replace(/_+/g, '_');
};

const generateFilename = (originalName: string) => {
  const safeName = sanitizeFilename(originalName);
  const fileExt = extname(safeName) || '';
  const nameWithoutExt = safeName.replace(new RegExp(`${fileExt}$`), '');
  const randomHash = randomBytes(8).toString('hex');
  return `${Date.now()}-${randomHash}${fileExt}`;
};

export const multerOptions = {
  storage: diskStorage({
    destination: uploadDir,
    filename: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, generateFilename(file.originalname));
    },
  }),
  fileFilter: (_req: unknown, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new BadRequestException('Only image and video files are allowed.'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
};
