import { Types } from 'mongoose';
import { makeUser } from '../../../test/factories/make-user';
import { FakeUserRepository } from '../../../test/fakes/fake-user.repository';
import { UserService } from './user.service';

describe('user-service', () => {
  let fakeUserRepository: FakeUserRepository;
  let userService: UserService;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    userService = new UserService(fakeUserRepository);
  });

  it('Should create an user', async () => {
    const user = makeUser();

    const createdUser = await userService.create(user);

    expect(createdUser._id).toBeInstanceOf(new Types.ObjectId().constructor);
    expect(createdUser.name).toEqual(user.name);
  });

  it('Should return an already created user', async () => {
    const user = makeUser({
      _id: new Types.ObjectId(),
    });

    fakeUserRepository.users.push(user);

    const createdUser = await userService.create(user);

    expect(createdUser._id).toEqual(user._id);
    expect(createdUser.name).toEqual(user.name);
  });
});
