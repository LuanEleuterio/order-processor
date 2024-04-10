import { HttpException, HttpStatus } from '@nestjs/common';

export class EmptyFileException extends HttpException {
  constructor() {
    super('Empty file', HttpStatus.BAD_REQUEST);
  }
}
