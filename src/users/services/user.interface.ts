import { Types } from 'mongoose';

export interface IUserService {
  create: (
    user: IUserService.Create.Params,
  ) => Promise<IUserService.Create.Result>;
}

export const IUserService = Symbol('IUserService');

export namespace IUserService {
  export namespace Create {
    export type Params = {
      user_id: number;
      name: string;
    };
    export type Result = {
      _id: string | Types.ObjectId;
      user_id: number;
      name: string;
    };
  }
}
