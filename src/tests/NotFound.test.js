import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('tests the NotFound component', () => {
  it('contains <h2>Page requested not found 😭</h2>', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading', { level: 2 }))
      .toHaveTextContent(/Page requested not found 😭/i);
  });

  it('contains a specific image', () => {
    const { getByAltText } = render(<NotFound />);
    const altImage = getByAltText(
      'Pikachu crying because the page requested was not found'
    );
    expect(altImage).toBeInTheDocument();

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(altImage.src).toBe(url);
  });
});
