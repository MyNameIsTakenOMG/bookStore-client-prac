import React from 'react';
import { renderWithProviders } from '../../../util/testUtil';
import BookContainer from '../BookContainer';
import { act, screen } from '@testing-library/react';
import BookList from '../BookList';
import axios from 'axios';

jest.mock('../BookList');
jest.mock('axios');

describe('BookContainer', () => {
  beforeEach(() => {
    BookList.mockImplementation(() => <div>mock booklist component</div>);
  });

  it('should render without error', async () => {
    const initialBooks = [
      { title: 'test title', description: 'test description' },
    ];

    axios.get.mockResolvedValue({
      data: initialBooks,
    });

    await act(() => {
      renderWithProviders(<BookContainer />, {});
    });
    // const element = screen.getByText(/here we will display all books./i);
    // expect(element).toBeInTheDocument();
    expect(BookList).toHaveBeenCalledTimes(1);
    expect(BookList).toHaveBeenCalledWith({ books: initialBooks }, {});
  });

  it('should show error when failed to fetch books', async () => {
    axios.get.mockRejectedValue({
      message: 'failed to fetch books',
      code: 'network error',
    });

    await act(() => {
      renderWithProviders(<BookContainer />, {});
    });
    expect(BookList).toHaveBeenCalledTimes(0);
    expect(screen.getByText(/failed to fetch books/i)).toBeInTheDocument();
  });
});
