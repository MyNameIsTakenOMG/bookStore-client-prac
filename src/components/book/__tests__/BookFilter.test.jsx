import React from 'react';
import { renderWithProviders } from '../../../util/testUtil';
import { act, fireEvent, screen } from '@testing-library/react';
import BookFilter from '../BookFilter';
// import { fetchBooksByTitle } from '../../../redux-store/bookSlice';
import * as bookslice from '../../../redux-store/bookSlice';

jest.mock('axios');

describe('BookFilter', () => {
  it('should render without error', async () => {
    await act(() => {
      renderWithProviders(<BookFilter />, {});
    });

    const fetchBooksByTitleMock = jest.spyOn(bookslice, 'fetchBooksByTitle');

    const text = screen.getByLabelText(/enter-book-title/);
    expect(text).toBeInTheDocument();
    const search = screen.getByText(/Search/);
    expect(search).toBeInTheDocument();
    fireEvent.change(text, { target: { value: 'test title' } });
    expect(screen.queryByDisplayValue(/test title/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Search/));
    expect(fetchBooksByTitleMock).toHaveBeenCalledTimes(1);
    expect(fetchBooksByTitleMock).toHaveBeenCalledWith('test title');
  });
});
