import axios from 'axios';
import { store } from '../store';
import { fetchAllBooks, fetchBooksByTitle } from '../bookSlice';

jest.mock('axios');

describe('book slice', () => {
  it('should successfully fetch books', async () => {
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

  it('should fail to fetch books', async () => {
    axios.get.mockRejectedValue({
      message: 'error message',
      code: 'error code',
    });
    const result = await store.dispatch(fetchAllBooks());
    expect(result.type).toEqual('books/fetchAllBooks/rejected');
    const reduxState = store.getState();
    expect(reduxState.entities.book.error.message).toEqual('error message');
  });

  it('should successfully fetch books by title', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          title: 'test title',
          description: 'test description',
        },
      ],
    });
    const result = await store.dispatch(fetchBooksByTitle('TEST TiTlE'));
    expect(result.type).toEqual('books/fetchBooksByTitle/fulfilled');
    const reduxState = store.getState();
    expect(reduxState.entities.book.books.length).toEqual(1);
  });
  it('should fail to fetch books by title', async () => {
    axios.get.mockRejectedValue({
      message: 'error message',
      code: 'error code',
    });
    const result = await store.dispatch(fetchBooksByTitle('TEST TiTlE'));
    expect(result.type).toEqual('books/fetchBooksByTitle/rejected');
    const reduxState = store.getState();
    expect(reduxState.entities.book.error.message).toEqual('error message');
  });
});
