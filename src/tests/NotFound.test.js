import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('Tests "Not Found" page', () => {
  it('renders a subheading with the text `Page requested not found 😭`', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/favoritez'] }>
        <App />
      </MemoryRouter>,
    );
    const subHeading = getByRole('heading', { level: 2 });
    expect(subHeading).toHaveTextContent('Page requested not found 😭');
  });

  it('renders crying pikachu gif', () => {
    const { getByAltText } = render(
      <MemoryRouter initialEntries={ ['/favoritez'] }>
        <App />
      </MemoryRouter>,
    );
    const alt = 'Pikachu crying because the page requested was not found';
    const cryingPikachu = getByAltText(alt);
    expect(cryingPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
