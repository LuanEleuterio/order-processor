import { Types } from 'mongoose';
import { makeOrder } from '../../../test/factories/make-order';
import { FakeOrderRepository } from '../../../test/fakes/fake-order.repository';
import { CreateOrderService } from './create-order.service';

describe('create-order-service', () => {
  let fakeOrderRepository: FakeOrderRepository;
  let createOrderService: CreateOrderService;

  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    createOrderService = new CreateOrderService(fakeOrderRepository);
  });

  it('Should create an order', async () => {
    const order = makeOrder();

    const createdOrder = await createOrderService.execute(order);

    expect(createdOrder._id).toBeInstanceOf(new Types.ObjectId().constructor);
  });
});
