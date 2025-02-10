import { User } from '../types/user';
import { mockUser } from '../mocks/user';

export const fetchCurrentUser = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser);
    }, 500);
  });
};