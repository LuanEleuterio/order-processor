import { Types } from 'mongoose';

export interface ICreateOrderService {
  execute: (
    order: ICreateOrderService.Execute.Params,
  ) => Promise<ICreateOrderService.Execute.Result>;
}

export namespace ICreateOrderService {
  export namespace Execute {
    export type Params = {
      order_id: number;
      date: Date;
      user_id: Types.ObjectId;
      total: string;
      products: {
        product_id: number;
        value: string;
      }[];
    };
    export type Result = {
      _id: Types.ObjectId;
      order_id: number;
      date: Date;
      user_id: Types.ObjectId;
      total: string;
      products: {
        product_id: number;
        value: string;
      }[];
    };
  }
}

export const ICreateOrderService = Symbol('ICreateOrderService');
