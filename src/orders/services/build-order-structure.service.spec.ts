import { BuildOrderStructureService } from './build-order-structure.service';

describe('build-order-structure', () => {
  let buildOrderStructureService: BuildOrderStructureService;

  beforeEach(() => {
    buildOrderStructureService = new BuildOrderStructureService();
  });

  it('Should build two order structure - Two order and different users', async () => {
    const orders = [
      {
        userId: 70,
        name: 'Palmer Prosacco',
        orderId: 753,
        productId: 3,
        productPrice: '1836.74',
        date: '20210308',
      },
      {
        userId: 75,
        name: 'Bobbie Batz',
        orderId: 798,
        productId: 2,
        productPrice: '1000.00',
        date: '20211116',
      },
    ];

    const orderStructure = buildOrderStructureService.execute(orders);

    expect(orderStructure[0].user_id).toEqual(orders[0].userId);
    expect(orderStructure[1].orders.length).toEqual(1);
    expect(orderStructure[1].orders[0].date).toEqual(new Date('2021-11-16'));
    expect(orderStructure.length).toEqual(2);
  });

  it('Should build an order structure - Two order and one user', async () => {
    const orders = [
      {
        userId: 70,
        name: 'Palmer Prosacco',
        orderId: 753,
        productId: 3,
        productPrice: '1500.00',
        date: '20210308',
      },
      {
        userId: 70,
        name: 'Palmer Prosacco',
        orderId: 753,
        productId: 4,
        productPrice: '1000.00',
        date: '20210308',
      },
      {
        userId: 70,
        name: 'Palmer Prosacco',
        orderId: 798,
        productId: 2,
        productPrice: '3599.98',
        date: '20211116',
      },
    ];

    const orderStructure = buildOrderStructureService.execute(orders);

    expect(orderStructure[0].user_id).toEqual(orders[0].userId);
    expect(orderStructure[0].orders.length).toEqual(2);
    expect(orderStructure[0].orders[0].total).toEqual('2500.00');
    expect(orderStructure[0].orders[1].total).toEqual('3599.98');
    expect(orderStructure[0].orders[0].products.length).toEqual(2);
    expect(orderStructure.length).toEqual(1);
  });
});
