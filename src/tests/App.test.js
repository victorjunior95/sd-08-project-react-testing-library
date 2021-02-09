import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Homepage da Pokédex é renderizada no caminho de URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const title = getByText(/Pokédex/i);
    expect(title).toBeInTheDocument();
  });

  it('Topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeBtn = getByText('Home');
    const aboutBtn = getByText('About');
    const favPoke = getByText('Favorite Pokémons');

    userEvent.click(homeBtn);
    expect(getByText('Home')).toBeInTheDocument();
    userEvent.click(aboutBtn);
    expect(getByText('About')).toBeInTheDocument();
    userEvent.click(favPoke);
    expect(favPoke).toBeInTheDocument();
  });

  it('Aplicação é redirecionada para a página inicial ao clicar no Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homeBtn = getByText('Home');
    userEvent.click(homeBtn);
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('Aplicação é redirecionada para a página de About, na URL /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText('About'));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutAll = getByText('About Pokédex');
    expect(aboutAll).toBeInTheDocument();
  });

  it('Aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pokemon = getByText('Favorite Pokémons');
    userEvent.click(pokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoriteAll = getByText(/No favorite pokemon found/i);
    expect(favoriteAll).toBeInTheDocument();
  });

  it('No favorite pokemon found', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/digimon');
    const favPokeText = getByRole('heading', {
      level: 2,
    });
    expect(favPokeText).toBeInTheDocument();
  });
});
