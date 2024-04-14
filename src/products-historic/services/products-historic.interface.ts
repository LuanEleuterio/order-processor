export interface IProductsHistoricService {
  create: (
    productHistoric: IProductsHistoricService.Create.Params,
  ) => Promise<IProductsHistoricService.Create.Result>;
}

export const IProductsHistoricService = Symbol('IProductsHistoricService');

export namespace IProductsHistoricService {
  export namespace Create {
    export type Params = {
      product_id: number;
      value: number;
    };
    export type Result = void;
  }
}
