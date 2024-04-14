export interface IBuildOrderStructureService {
  execute(
    data: IBuildOrderStructureService.Execute.Params[],
  ): IBuildOrderStructureService.Execute.Result[];
}

export const IBuildOrderStructureService = Symbol(
  'IBuildOrderStructureService',
);

export namespace IBuildOrderStructureService {
  export namespace Execute {
    export type Params = {
      userId: number;
      name: string;
      orderId: number;
      productId: number;
      productPrice: string;
      date: string;
    };
    export type Result = {
      user_id: number;
      name: string;
      orders: {
        order_id: number;
        date: Date;
        total: string;
        products: {
          product_id: number;
          value: string;
        }[];
      }[];
    };
  }
}
