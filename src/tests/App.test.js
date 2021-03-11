import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Test component App', () => {
  it('should render Pokedex with the path "/"', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pok[ée]dex/gi);
    expect(heading).toBeInTheDocument();
  });

  it('should have a link to Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText(/home/gi);
    fireEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('should have a link to About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText(/about/gi);
    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('should have a link to Favorite Pokemons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemonsLink = getByText(/favorite pok[ée]mons/gi);
    fireEvent.click(favoritePokemonsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
