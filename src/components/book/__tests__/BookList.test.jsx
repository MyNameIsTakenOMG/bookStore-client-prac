import { render } from '@testing-library/react';
import BookList from '../BookList';
import BookListItem from '../BookListItem';

jest.mock('../BookListItem');

describe('BookList', () => {
  beforeAll(() => {
    BookListItem.mockImplementation(() => {
      <div>mock booklist item component</div>;
    });
  });

  const books = [
    {
      id: '1',
      title: 'test title',
      description: 'test description',
      releaseYear: 2014,
    },
    {
      id: '2',
      title: 'test title12',
      description: 'test description',
      releaseYear: 2010,
    },
  ];
  it('should render the book list without error', async () => {
    render(<BookList books={books} />);
    expect(BookListItem).toHaveBeenCalledTimes(2);
    expect(BookListItem).toHaveBeenCalledWith({ book: books[0] }, {});
    expect(BookListItem).toHaveBeenCalledWith({ book: books[1] }, {});
  });
});
