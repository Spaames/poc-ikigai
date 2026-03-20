import { UsersInterceptor } from '../common/interceptors/users.interceptor';

describe('UsersInterceptor', () => {
  it('should be defined', () => {
    expect(new UsersInterceptor()).toBeDefined();
  });
});
