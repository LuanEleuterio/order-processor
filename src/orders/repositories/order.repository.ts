import { Types } from 'mongoose';

export interface IOrderRepository {
  create: (
    order: IOrderRepository.Create.Params,
  ) => Promise<IOrderRepository.Create.Result>;
  list: (
    query: IOrderRepository.List.Params,
  ) => Promise<IOrderRepository.List.Result[]>;
}

export const IOrderRepository = Symbol('IOrderRepository');

export namespace IOrderRepository {
  export namespace Create {
    export type Params = {
      user_id: Types.ObjectId;
      order_id: number;
      total: string;
      date: Date;
      products?: {
        product_id: number;
        value: string;
      }[];
    };
    export type Result = {
      _id: Types.ObjectId;
      user_id: Types.ObjectId;
      order_id: number;
      total: string;
      date: Date;
      products: {
        product_id: number;
        value: string;
      }[];
    };
  }
  export namespace List {
    export type Params = {
      order_id?: number;
      start_date?: string;
      end_date?: string;
    };
    export type Result = {
      order_id: number;
      date: Date;
      total: string;
      user: {
        user_id: number;
        name: string;
      };
      products: {
        product_id: number;
        value: string;
      }[];
    };
  }
}
