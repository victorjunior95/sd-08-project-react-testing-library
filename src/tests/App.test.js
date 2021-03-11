import React from 'react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Pagina inicial', () => {
  it('URL', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const home = history.location.pathname;
    const heading = getByText(/Pokédex/i);
    expect(home).toBe('/');
    expect(heading).toBeInTheDocument();
  });
  it('Home', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', {
      name: 'Home',
    });
    const about = getByRole('link', {
      name: 'About',
    });
    const favorite = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });
});
