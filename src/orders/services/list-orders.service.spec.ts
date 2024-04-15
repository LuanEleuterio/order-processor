import { makeUser } from '../../../test/factories/make-user';
import { makeOrder } from '../../../test/factories/make-order';
import { FakeOrderRepository } from '../../../test/fakes/fake-order.repository';
import { ListOrdersService } from './list-orders.service';

describe('list-orders', () => {
  let fakeOrderRepository: FakeOrderRepository;
  let listOrdersService: ListOrdersService;

  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    listOrdersService = new ListOrdersService(fakeOrderRepository);
  });

  it('Should list all orders', async () => {
    const orderOne = makeOrder();
    const orderTwo = makeOrder({
      user_id: orderOne.user_id,
    });

    const user = makeUser({
      _id: orderOne.user_id,
    });

    fakeOrderRepository.orders.push(orderOne, orderTwo);
    fakeOrderRepository.users.push(user);

    const foundOrder = await listOrdersService.execute();

    expect(foundOrder[0].user_id).toEqual(user.user_id);
    expect(foundOrder[0].orders[0].order_id).toEqual(orderOne.order_id);
    expect(foundOrder.length).toEqual(1);
    expect(foundOrder[0].orders.length).toEqual(2);
  });

  it('Should list one order by order_id', async () => {
    const orderOne = makeOrder({
      order_id: 1,
    });

    const orderTwo = makeOrder({
      order_id: 2,
    });

    const user = makeUser({
      _id: orderOne.user_id,
    });

    fakeOrderRepository.orders.push(orderOne, orderTwo);
    fakeOrderRepository.users.push(user);

    const query = {
      order_id: 1,
    };

    const foundOrder = await listOrdersService.execute(query);

    expect(foundOrder[0].user_id).toEqual(user.user_id);
    expect(foundOrder[0].orders[0].order_id).toEqual(orderOne.order_id);
    expect(foundOrder.length).toEqual(1);
    expect(foundOrder[0].orders.length).toEqual(1);
  });

  it('Should list two orders by start_date and end_date', async () => {
    const orderOne = makeOrder({
      date: new Date('2021-11-16'),
    });

    const orderTwo = makeOrder({
      user_id: orderOne.user_id,
      date: new Date('2021-11-18'),
    });

    const orderThree = makeOrder({
      user_id: orderOne.user_id,
      date: new Date('2021-12-18'),
    });

    const user = makeUser({
      _id: orderOne.user_id,
    });

    fakeOrderRepository.orders.push(orderOne, orderTwo, orderThree);
    fakeOrderRepository.users.push(user);

    const query = {
      start_date: '2021-11-16',
      end_date: '2021-11-19',
    };

    const foundOrder = await listOrdersService.execute(query);

    expect(foundOrder[0].user_id).toEqual(user.user_id);
    expect(foundOrder[0].orders[0].order_id).toEqual(orderOne.order_id);
    expect(foundOrder.length).toEqual(1);
    expect(foundOrder[0].orders.length).toEqual(2);
  });

  it('Should list all orders by start_date', async () => {
    const orderOne = makeOrder({
      date: new Date('2021-11-16'),
    });

    const orderTwo = makeOrder({
      user_id: orderOne.user_id,
      date: new Date('2021-11-18'),
    });

    const orderThree = makeOrder({
      user_id: orderOne.user_id,
      date: new Date('2021-12-18'),
    });

    const user = makeUser({
      _id: orderOne.user_id,
    });

    fakeOrderRepository.orders.push(orderOne, orderTwo, orderThree);
    fakeOrderRepository.users.push(user);

    const query = {
      start_date: '2021-11-15',
    };

    const foundOrder = await listOrdersService.execute(query);

    expect(foundOrder[0].user_id).toEqual(user.user_id);
    expect(foundOrder[0].orders[0].order_id).toEqual(orderOne.order_id);
    expect(foundOrder.length).toEqual(1);
    expect(foundOrder[0].orders.length).toEqual(3);
  });
});
