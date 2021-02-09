import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { About, FavoritePokemons } from '../components';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeLink = getByText(/home/i);
  const aboutLink = getByText(/about/i);
  const favoriteLink = getByText(/favorite pokémons/i);
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('shows the About when the route is `/about`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <About />
    </MemoryRouter>,
  );

  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('shows the favorites when the route is `/favorites`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/favorites'] }>
      <FavoritePokemons />
    </MemoryRouter>,
  );

  expect(getByText('Favorite pokémons')).toBeInTheDocument();
});

test('Página Not Found ao entrar em uma URL desconhecida', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/pagina/que-nao-existe'] }>
      <App />
    </MemoryRouter>,
  );
  const noMatch = getByText(/Page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});
