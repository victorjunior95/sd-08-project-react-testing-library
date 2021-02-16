import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

it('Deve renderizar o componente App', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Encountered pokémons/i);
  expect(home).toBeInTheDocument();
});

describe('teste da app toda', () => {
  it('testando se há links', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const fav = getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(fav).toBeInTheDocument();
  });
  it('testando rota /favorites', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const fav = getByText(/Favorite Pokémons/i);

    fireEvent.click(fav);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    expect(getByRole('heading', {
      level: 2,
      name: /Favorite Pokémons/i,
    })).toBeInTheDocument();
  });
  it('testando rota /about', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const about = getByText(/About/i);

    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    expect(getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    })).toBeInTheDocument();
  });
  it('testando rota /home', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const home = getByText(/Home/i);

    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })).toBeInTheDocument();
  });
  it('testando caminho inexistente e Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/);

    expect(noMatch).toBeInTheDocument();
  });
});
