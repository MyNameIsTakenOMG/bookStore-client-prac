import axios from 'axios';
import { store } from '../store';
import { login, register } from '../userSlice';

jest.mock('axios');

describe('userSlice', () => {
  it('should return a jwt token', async () => {
    axios.post.mockResolvedValue({
      data: {
        token: 'jwt-token',
      },
    });
    const result = await store.dispatch(
      login({ email: 'peter@peter.com', password: 'password' })
    );
    expect(result.type).toEqual('user/login/fulfilled');
    const reduxState = store.getState();
    expect(reduxState.entities.user.token).toEqual('jwt-token');
  });

  it('should return a user id', async () => {
    axios.post.mockResolvedValue({
      data: 'user-id',
    });
    const result = await store.dispatch(
      register({
        name: 'peter',
        email: 'peter@peter.com',
        password: 'password',
      })
    );
    expect(result.type).toEqual('user/register/fulfilled');
    const reduxState = store.getState();
    expect(reduxState.entities.user.userId).toEqual('user-id');
  });
});
