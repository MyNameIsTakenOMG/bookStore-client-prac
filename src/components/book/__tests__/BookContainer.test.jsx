import React from 'react';
import { renderWithProviders } from '../../../util/testUtil';
import BookContainer from '../BookContainer';
import { screen } from '@testing-library/react';

describe('BookContainer', () => {
  it('should render without error', () => {
    const initialBooks = [
      { title: 'test title', description: 'test description' },
    ];
    renderWithProviders(<BookContainer />, {
      preloadedState: {
        entities: {
          book: {
            books: initialBooks,
            error: null,
          },
        },
      },
    });
    const element = screen.getByText(/here we will display all books./i);
    expect(element).toBeInTheDocument();
  });
});
