import { UserRepository } from './repositories/user.implementation';
import { IUserRepository } from './repositories/user.repository';
import { IUserService } from './services/user.interface';
import { UserService } from './services/user.service';

export const UsersProvider = [
  { provide: IUserRepository, useClass: UserRepository },
  { provide: IUserService, useClass: UserService },
];
