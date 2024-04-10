import { HttpException, HttpStatus } from '@nestjs/common';

export class GenericException extends HttpException {
  constructor(message: string | Record<string, any>) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
