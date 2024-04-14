export interface IListOrdersService {
  execute(
    query: IListOrdersService.Execute.Params,
  ): Promise<IListOrdersService.Execute.Result[]>;
}

export const IListOrdersService = Symbol('IListOrdersService');

export namespace IListOrdersService {
  export namespace Execute {
    export type Params = {
      order_id: number;
      start_date: string;
      end_date: string;
    };

    export type Result = {
      user_id: number;
      name: string;
      orders: {
        order_id: number;
        date: string;
        total: string;
        products: {
          product_id: number;
          value: string;
        }[];
      }[];
    };
  }
}
