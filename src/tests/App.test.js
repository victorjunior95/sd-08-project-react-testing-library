import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

const navLinks = [
  'Home',
  'About',
  'Favorite Pokémons',
]

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText } = renderWithRouter(<App />);
  navLinks.map((link) => {
    expect(getByText(link)).toBeInTheDocument();
  })
})

test('a aplicação é redirecionada para a página inicial ao clicar no link Home, da barra de navegação.', () => {
  const { history, getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
})

test('a aplicação é redirecionada para a página de About ao clicar no link About, da barra de navegação.', () => {
  const { history, getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  expect(getByText('About Pokédex')).toBeInTheDocument();
})

test('a aplicação é redirecionada para a página de Pokémons Favoritados ao clicar no link Favorite Pokémons, da barra de navegação.', () => {
  const { history, getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite Pokémons'));
  const { pathname } = history.location;
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
})

test('a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/rota-desconhecida');
  expect(getByText('Page requested not found')).toBeInTheDocument();
})



