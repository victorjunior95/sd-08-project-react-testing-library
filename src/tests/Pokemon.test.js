import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Poke info', () => {
  it('É renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
  it(`O card do Pokémon indicado na Pokédex contém um link 
        de navegação para exibir detalhes deste Pokémon.`,
  () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const pikachu = getByText(/Pikachu/i);
    const eletric = getByTestId(/PokemonType/i);
    const weight = getByText(/Average weight:/i);
    expect(pikachu).toBeInTheDocument();
    expect(eletric.textContent).toBe('Electric');
    expect(weight).toBeInTheDocument();
  });
  it('Existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByRole, history, getByAltText, getByText } = renderWithRouter(<App />);
    const link = getByRole('link', {
      name: /More Details/i,
    });
    expect(link).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(link);
    const moreDetailURL = history.location.pathname;
    expect(moreDetailURL).toBe('/pokemons/25');
    const favorite = getByText(/Pokémon favoritado/i);
    // const Home = getByText(/Home/i);
    userEvent.click(favorite);
    // userEvent.click(Home);
    const favorited = getByAltText(/Pikachu is marked as favorite/i);
    const image = getByAltText(/Pikachu sprite/i);
    expect(favorited).toHaveAttribute('src', '/star-icon.svg');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
