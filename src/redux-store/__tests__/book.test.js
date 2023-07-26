import axios from 'axios';
import { store } from '../store';
import { fetchAllBooks } from '../bookSlice';

jest.mock('axios');

describe('book slice', () => {
  it('should dispatch a successful action', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          title: 'test title',
          description: 'test description',
        },
      ],
    });
    const result = await store.dispatch(fetchAllBooks());
    expect(result.type).toEqual('books/fetchAllBooks/fulfilled');
    const reduxState = store.getState();
    expect(reduxState.entities.book.books.length).toEqual(1);
  });
  it('should dispatch a failed action', async () => {
    axios.get.mockRejectedValue({
      message: 'error message',
      code: 'error code',
    });
    const result = await store.dispatch(fetchAllBooks());
    expect(result.type).toEqual('books/fetchAllBooks/rejected');
    const reduxState = store.getState();
    expect(reduxState.entities.book.error.message).toEqual('error message');
  });
});
