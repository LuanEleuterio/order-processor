export interface IProductsHistoricRepository {
  create: (
    productHistoric: IProductsHistoricRepository.Create.Params,
  ) => Promise<IProductsHistoricRepository.Create.Result>;
}

export const IProductsHistoricRepository = Symbol(
  'IProductsHistoricRepository',
);

export namespace IProductsHistoricRepository {
  export namespace Create {
    export type Params = {
      product_id: number;
      value: number;
    };
    export type Result = void;
  }
}
