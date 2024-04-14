import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { OrderController } from './orders/controller/order.controller';
import { AllExceptionsFilter } from './errors/all-exceptions.filter';
import { Order, OrderSchema } from './orders/entities/order.entity';
import { OrderProvider } from './orders/order.provider';
import { User, UserSchema } from './users/entities/user.entity';
import { UsersProvider } from './users/users.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    ...UsersProvider,
    ...OrderProvider,
  ],
})
export class AppModule {}
