import { faker } from '@faker-js/faker';
import { User } from '../../src/users/entities/user.entity';

export function makeUser(override?: any): User {
  return User.create({
    user_id: faker.number.int(),
    name: faker.person.fullName(),
    ...override,
  });
}
