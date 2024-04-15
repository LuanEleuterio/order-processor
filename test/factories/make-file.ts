import * as fs from 'fs';
import * as path from 'path';

export const makeFile = (fileContent: string, fileName: string) => {
  const tempDir = './tmp/files';

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const tempFilePath = path.join(tempDir, `${fileName}.txt`);
  fs.writeFileSync(tempFilePath, fileContent, 'utf-8');

  const fileObject = {
    fieldname: 'file',
    originalname: `${fileName}.txt`,
    encoding: '7bit',
    mimetype: 'text/plain',
    size: fs.statSync(tempFilePath).size,
    destination: tempDir,
    filename: `${fileName}.txt`,
    path: tempFilePath,
  };

  return fileObject as Express.Multer.File;
};
