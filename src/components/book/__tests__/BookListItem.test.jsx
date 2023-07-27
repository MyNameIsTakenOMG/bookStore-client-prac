import { render, screen } from '@testing-library/react';
import BookListItem from '../BookListItem';

describe('BookListItem', () => {
  it('should render booklist item without error', () => {
    const book = {
      id: '1',
      title: 'test title',
      description: 'test description',
      releaseYear: 2014,
    };

    render(<BookListItem book={book} />);
    expect(screen.getAllByText(/test title/i)[0]).toBeInTheDocument();
  });
});
