import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { v4 as uuid } from 'uuid';

// export const multerConfig = {
//   storage: diskStorage({
//     destination: (
//       req: Request,
//       file: Express.Multer.File,
//       cb: (error: Error | null, destination: string) => void,
//     ) => {
//       const body = req?.body as Record<string, unknown> | undefined;
//       console.log('body=>>>>>>>', req);
//       const projectName =
//         typeof body?.projectName === 'string' ? body.projectName : undefined;

//       if (!projectName) {
//         return cb(new Error('Project name is required'), '');
//       }

//       const isImage = file.mimetype.startsWith('image');
//       const folderType = isImage ? 'images' : 'videos';

//       const projectPath = `storage/${projectName}`;
//       const uploadPath = `${projectPath}/${folderType}`;

//       // Create folders if not exist
//       if (!fs.existsSync(projectPath)) {
//         fs.mkdirSync(projectPath, { recursive: true });
//       }

//       if (!fs.existsSync(`${projectPath}/images`)) {
//         fs.mkdirSync(`${projectPath}/images`, {
//           recursive: true,
//         });
//       }

//       if (!fs.existsSync(`${projectPath}/videos`)) {
//         fs.mkdirSync(`${projectPath}/videos`, {
//           recursive: true,
//         });
//       }

//       cb(null, uploadPath);
//     },

//     filename: (
//       req: Request,
//       file: Express.Multer.File,
//       cb: (error: Error | null, filename: string) => void,
//     ) => {
//       const uniqueName = (uuid as () => string)() + extname(file.originalname);

//       cb(null, uniqueName);
//     },
//   }),

//   fileFilter: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, acceptFile: boolean) => void,
//   ) => {
//     const allowedMimeTypes = [
//       'image/jpeg',
//       'image/png',
//       'image/webp',
//       'image/jpg',
//       'video/mp4',
//       'video/mov',
//       'video/quicktime',
//       'video/webm',
//     ];

//     if (!allowedMimeTypes.includes(file.mimetype)) {
//       return cb(new Error('Unsupported file type'), false);
//     }

//     cb(null, true);
//   },

//   limits: {
//     fileSize: 1024 * 1024 * 500, // 500MB
//   },
// };

export const multerConfig = {
  storage: diskStorage({
    destination: './tmp', // ✅ always temp
    filename: (req, file, cb) => {
      const uniqueName = uuid() + extname(file.originalname);
      cb(null, uniqueName);
    },
  }),

  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    const allowed = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/mov',
      'video/quicktime',
      'video/webm',
    ];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'), false);
    }

    cb(null, true);
  },

  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB
  },
};
