export interface IExtractLinesFromOrderFileService {
  execute: (
    file: IExtractLinesFromOrderFileService.Execute.Params,
  ) => Promise<IExtractLinesFromOrderFileService.Execute.Result[]>;
}

export const IExtractLinesFromOrderFileService = Symbol(
  'IExtractLinesFromOrderFileService',
);

export namespace IExtractLinesFromOrderFileService {
  export namespace Execute {
    export type Params = {
      file: Express.Multer.File;
    };
    export type Result = {
      userId: number;
      name: string;
      orderId: number;
      productId: number;
      productPrice: string;
      date: string;
    };
  }
}
