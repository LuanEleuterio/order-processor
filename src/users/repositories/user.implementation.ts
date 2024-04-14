import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from './user.repository';
import { User as UserEntity, UserDocument } from '../entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async create(
    user: IUserRepository.Create.Params,
  ): Promise<IUserRepository.Create.Result> {
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }

  public async findByUserId(
    user_id: IUserRepository.FindByUserId.Params,
  ): Promise<IUserRepository.FindByUserId.Result> {
    return await this.userModel.findOne({ user_id });
  }
}
