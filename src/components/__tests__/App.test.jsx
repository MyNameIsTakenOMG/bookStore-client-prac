import { render, screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../../util/testUtil';

test('renders learn react link', () => {
  // render(<App />);
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/book filter/i);
  expect(linkElement).toBeInTheDocument();
});
