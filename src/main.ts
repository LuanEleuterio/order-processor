import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './errors/all-exceptions.filter';
import { existsSync, unlinkSync } from 'fs';

async function bootstrap() {
  const dbFile = 'db.sqlite';
  if (existsSync(dbFile)) unlinkSync(dbFile);

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
