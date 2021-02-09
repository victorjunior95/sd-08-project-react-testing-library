import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testes da página principal', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Testa se a página principal da Pokédex renderiza com o caminho "/"', () => {
    const { getByText } = renderWithRouter(<App />);
    const encountered = getByText(/Encountered pokémons/i);

    expect(encountered).toBeInTheDocument();
  });

  test('Testa conjunto de links no topo da aplicação', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favPokes = getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokes).toBeInTheDocument();
  });

  test('Testa se ao clicar no link "Home" é redirecionado para "/"', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    fireEvent.click(home);
    const heading = getByText('Pokédex');

    expect(heading).toBeInTheDocument();
  });

  test('Testa se ao clicar no link "About" é redirecionado para "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });

  test('Testa redicionamento para "/favorite"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const heading = getByText('Favorite pokémons');
    expect(heading).toBeInTheDocument();
  });

  test('Testa redicionamento de um domínio que não está presente no sistema', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xablau');
    const heading = getByText(/Page requested not found/i);
    expect(heading).toBeInTheDocument();
  });
});
