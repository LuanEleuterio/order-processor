import { Types } from 'mongoose';

export interface IUserRepository {
  create: (
    user: IUserRepository.Create.Params,
  ) => Promise<IUserRepository.Create.Result>;
  findByUserId: (
    user_id: IUserRepository.FindByUserId.Params,
  ) => Promise<IUserRepository.Create.Result>;
}

export const IUserRepository = Symbol('IUserRepository');

export namespace IUserRepository {
  export namespace Create {
    export type Params = {
      user_id: number;
      name: string;
    };
    export type Result = {
      _id: Types.ObjectId;
      user_id: number;
      name: string;
    };
  }

  export namespace FindByUserId {
    export type Params = number;
    export type Result = {
      _id: Types.ObjectId;
      user_id: number;
      name: string;
    };
  }
}
