import { Types } from 'mongoose';

export interface IOrderRepository {
  create: (
    order: IOrderRepository.Create.Params,
  ) => Promise<IOrderRepository.Create.Result>;
  // list: (
  //   query: IOrderRepository.List.Params,
  // ) => Promise<IOrderRepository.List.Result[]>;
}

export const IOrderRepository = Symbol('IOrderRepository');

export namespace IOrderRepository {
  export namespace Create {
    export type Params = {
      user_id: Types.ObjectId;
      order_id: number;
      total: string;
      date: string;
      products?: {
        product_id: number;
        value: string;
      }[];
    };
    export type Result = {
      _id: Types.ObjectId;
      user_id: string;
      order_id: number;
      total: string;
      date: string;
      products: {
        product_id: number;
        value: string;
      }[];
    };
  }
  export namespace List {
    export type Params = {
      order_id: string;
      start_date: string;
      end_date: string;
    };
    export type Result = {
      user_id: string;
      name: string;
      order_id: number;
      date: string;
      total: string;
      products: {
        product_id: number;
        value: string;
      }[];
    };
  }
}