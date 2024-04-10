import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { ProcessOrderFileService } from './services/orders/process-order-file.service';
import { AllExceptionsFilter } from './errors/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { NormalizeOrderFileService } from './services/orders/normalize-order-file.service';
import { BuildDataStructureService } from './services/orders/build-data-structure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';
import { DataSeedService } from './services/orders/data-seed.service';
import { ListOrdersService } from './services/orders/list-orders.service';
import { ProductHistoric } from './entities/product-historic.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      // logging: true,
    }),
    TypeOrmModule.forFeature([User, Order, ProductHistoric]),
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    ProcessOrderFileService,
    NormalizeOrderFileService,
    BuildDataStructureService,
    DataSeedService,
    ListOrdersService,
  ],
})
export class AppModule {}
