import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('Tests "Favorite Pokémons" page', () => {
  it('renders a subheading with the text `Favorite pokémons`', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <App />
      </MemoryRouter>,
    );
    const subHeading = getByRole('heading', { level: 2 });
    expect(subHeading).toContainHTML('Favorite pokémons');
  });

  it('renders a message when no favorite is found', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <App />
      </MemoryRouter>,
    );
    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
});
