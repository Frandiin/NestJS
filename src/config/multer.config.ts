// src/config/multer.config.ts
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = './uploads'; // Pode ser ajustado dinamicamente (ex.: './uploads/products')
      if (!path.isAbsolute(uploadPath)) {
        const absolutePath = path.join(__dirname, '../../', uploadPath);
        if (!fs.existsSync(absolutePath)) {
          fs.mkdirSync(absolutePath, { recursive: true });
        }
        cb(null, absolutePath);
      } else {
        cb(null, uploadPath);
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
    },
  }),
  //   limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new BadRequestException(
          'Formato de imagem inválido. Use JPEG, PNG ou GIF.',
        ),
        false,
      );
    }
    cb(null, true);
  },
};
