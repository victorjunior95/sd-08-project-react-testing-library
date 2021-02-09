import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('tests for NotFound.js', () => {
  it('shows the title `Page requested not found`', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const title = getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title.textContent.trim()).toBe('Page requested not found 😭');
  });

  it('shows the NotFound image correctly', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toBe(src);
  });
});
