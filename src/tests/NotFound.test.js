import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Favorite Pokemons page', () => {
  it('should have a h2 with the text `Page requested not found 😭`', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const pageNotFound = getByRole('heading', { level: 2 });
    expect(pageNotFound).toBeInTheDocument();
    expect(pageNotFound.textContent).toBe('Page requested not found 😭 ');
  });
  it('should display a image', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const img = getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
