import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { User } from './../../src/users/entities/user.entity';
import { IUserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class FakeUserRepository implements IUserRepository {
  users: User[] = [];

  public async create(
    user: IUserRepository.Create.Params,
  ): Promise<IUserRepository.Create.Result> {
    const _id = new Types.ObjectId();

    const newUser = {
      ...user,
      _id,
    };

    return newUser as IUserRepository.Create.Result;
  }

  public async findByUserId(
    user_id: IUserRepository.FindByUserId.Params,
  ): Promise<IUserRepository.FindByUserId.Result> {
    return this.users.find((user) => user.user_id === user_id);
  }
}
