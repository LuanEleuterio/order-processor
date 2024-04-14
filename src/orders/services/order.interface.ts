import { Types } from 'mongoose';

export interface IOrderService {
  create: (
    order: IOrderService.Create.Params,
  ) => Promise<IOrderService.Create.Result>;
  list: (
    query: IOrderService.List.Params,
  ) => Promise<IOrderService.List.Result>;
}

export namespace IOrderService {
  export namespace Create {
    export type Params = {
      order_id: number;
      date: string;
      user_id: Types.ObjectId;
      total: string;
      products: {
        product_id: number;
        value: string;
      }[];
    };
    export type Result = void;
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

  export namespace ProcessOrderFile {
    export type Params = {
      file: Express.Multer.File;
    };
    export type Result = void;
  }
}

export const IOrderService = Symbol('IOrderService');
