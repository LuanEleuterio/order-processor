import { unlink } from 'fs';

export async function eraseFile(path: string) {
  return new Promise((resolve, reject) => {
    unlink(path, (err) => {
      if (err) {
        console.error('Error to delete file:', err);
        reject(err);
        return;
      }
      console.log('File has been deleted');
      resolve(null);
    });
  });
}
