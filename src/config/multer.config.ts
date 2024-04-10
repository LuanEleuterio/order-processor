import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const multerConfig = {
  storage: diskStorage({
    destination: './tmp/files',
    filename: (req, file, cb) => {
      if (path.extname(file.originalname).toLowerCase() !== '.txt') {
        const err = new HttpException(
          'Only .txt files are allowed',
          HttpStatus.BAD_REQUEST,
        );
        return cb(err, '');
      }

      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export default multerConfig;
