import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';
import AppError from '@shared/errors/AppError';

const uploadsFolder = path.resolve(__dirname, '..', '..', 'uploads');

interface IUploadConfig {
  photosFolder: string;
  uploadsFolder: string;

  storage: StorageEngine;

  limits: {
    fileSize: number;
  };

  fileFilter(): any;
}

export default {
  uploadsFolder,
  photosFolder: path.resolve(uploadsFolder, 'photos'),

  storage: multer.diskStorage({
    destination: uploadsFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
  limits: {
    fileSize: 8 * 2048 * 2048,
  },
  fileFilter: (request, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new AppError('Invalid file type.'));
    }
  },
} as IUploadConfig;
