export interface ICreateOrderService {
  execute: (
    order: ICreateOrderService.Execute.Params,
  ) => Promise<ICreateOrderService.Execute.Result>;
}

export namespace ICreateOrderService {
  export namespace Execute {
    export type Params = {
      order_id: number;
      date: string;
      user_id: string;
      total: string;
      products: string[];
    };
    export type Result = void;
  }
}

export const ICreateOrderService = Symbol('ICreateOrderService');
