import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testa o componente "App"', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('a página principal da Pokédex é renderizada ao carregar o caminho "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const inicialText = getByText(/Encountered pokémons/i);
    expect(inicialText).toBeInTheDocument();
  });

  test('a página contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkHome = getByText('Home');
    expect(linkHome).toBeInTheDocument();
    const linkAbout = getByText('About');
    expect(linkAbout).toBeInTheDocument();
    const linkFavoritePokemons = getByText('Favorite Pokémons');
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  test('a aplicação é redirecionada para o início ao clicar em "Home"', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnHome = getByText('Home');
    fireEvent.click(btnHome);
    const inicialText = getByText(/Encountered pokémons/i);
    expect(inicialText).toBeInTheDocument();
  });

  test('a aplicação é redirecionada para o about ao clicar em "About"', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnAbout = getByText('About');
    fireEvent.click(btnAbout);
    const aboutText = getByText(/About Pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });

  test('a aplicação é redirecionada para o favoritos ao clicar em "Favorite"', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnFavorite = getByText('Favorite Pokémons');
    fireEvent.click(btnFavorite);
    const favoriteText = getByText('Favorite pokémons');
    expect(favoriteText).toBeInTheDocument();
  });

  test('a aplicação é redirecionada para "Not Found" co colocar URL desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-nao-encontrada');
    const inicialText = getByText(/Page requested not found/i);
    expect(inicialText).toBeInTheDocument();
  });
});
