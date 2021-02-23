import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa a tela App e seu funcionamento', () => {
  it('Testa rota da tela inicial', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const app = getByText('Pokédex');
    const home = getByText('Home');
    const about = getByText('About');
    const favorite = getByText('Favorite Pokémons');
    const { pathname } = history.location;

    expect(app).toBeInTheDocument();
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(pathname).toBe('/');

    fireEvent.click(home);

    expect(pathname).toBe('/');

    fireEvent.click(about);

    expect(history.location.pathname).toBe('/about');

    fireEvent.click(favorite);

    expect(history.location.pathname).toBe('/favorites');

    fireEvent.click(home);
    history.push('/naoexisto');
    const notFound = getByText('Page requested not found');

    expect(notFound).toBeInTheDocument();
  });
});
