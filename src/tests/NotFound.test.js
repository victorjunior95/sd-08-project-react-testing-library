import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const ROUTE = { route: '/random-string' };

describe('Tests "Not Found" page', () => {
  it('renders a subheading with the text `Page requested not found 😭`', () => {
    const { getByRole } = renderWithRouter(<App />, ROUTE);
    const subHeading = getByRole('heading', { level: 2 });

    expect(subHeading).toHaveTextContent('Page requested not found 😭');
  });

  it('renders crying pikachu gif', () => {
    const { getByAltText } = renderWithRouter(<App />, ROUTE);
    const alt = 'Pikachu crying because the page requested was not found';
    const cryingPikachu = getByAltText(alt);

    expect(cryingPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
