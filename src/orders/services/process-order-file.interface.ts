export interface IProcessOrderFileService {
  execute: (
    file: IProcessOrderFileService.Execute.Params,
  ) => Promise<IProcessOrderFileService.Execute.Result>;
}

export const IProcessOrderFileService = Symbol('IProcessOrderFileService');

export namespace IProcessOrderFileService {
  export namespace Execute {
    export type Params = {
      file: Express.Multer.File;
    };
    export type Result = {
      message: string;
    };
  }
}
