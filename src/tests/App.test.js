import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Teste se na aplicação tem um conjunto fixo de links de navegação:', () => {
  it('O primeiro link deve possuir o texto "Home"', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLinkButton = getByText('Home');

    expect(homeLinkButton).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto "About"', () => {
    const { getByText } = renderWithRouter(<App />);
    const aboutLinkButton = getByText('About');

    expect(aboutLinkButton).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto "Favorite Pokémons"', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritePokemonsLinkButton = getByText('Favorite Pokémons');

    expect(favoritePokemonsLinkButton).toBeInTheDocument();
  });
});

describe('Teste de rotas:', () => {
  it('Ao clicar no link "Home", redireciona para "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLinkButton = getByText('Home');

    userEvent.click(homeLinkButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeText = getByText('Encountered pokémons');
    expect(homeText).toBeInTheDocument();
  });

  it('Ao clicar no link "About", redireciona para "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLinkButton = getByText('About');

    userEvent.click(aboutLinkButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutText = getByText('About Pokédex');
    expect(aboutText).toBeInTheDocument();
  });

  it('Ao clicar no link "Favorite Pokémons", redireciona para "/favorites"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemonsLinkButton = getByText('Favorite Pokémons');

    userEvent.click(favoritePokemonsLinkButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favoritePokemonsText = getByText('Favorite pokémons');
    expect(favoritePokemonsText).toBeInTheDocument();
  });

  it('Ao acessar um link "Desconhecido", redireciona para "Not Found"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');

    const noMatch = getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
