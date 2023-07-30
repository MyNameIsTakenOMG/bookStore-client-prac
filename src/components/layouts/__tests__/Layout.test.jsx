import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../Layout';

describe('Layout', () => {
  it('should render layout component', () => {
    render(<Layout />);

    expect(screen.getByText('Book Store')).toBeDefined();
  });
});
