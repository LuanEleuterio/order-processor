import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { IUserService } from './user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  public async create(
    user: IUserService.Create.Params,
  ): Promise<IUserService.Create.Result> {
    const userAlreadyExists = await this.userRepository.findByUserId({
      user_id: user.user_id,
    });

    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    const createdUser = await this.userRepository.create(user);
    return createdUser;
  }
}
