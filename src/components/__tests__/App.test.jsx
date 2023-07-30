import { render, screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../../util/testUtil';

test('renders learn react link', () => {
  // render(<App />);
  renderWithProviders(<App />, {});
  const element = screen.getByText('Book Store');
  expect(element).toBeInTheDocument();
});
