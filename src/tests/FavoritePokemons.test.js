import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

const idPokemonsToFavorite = [
  { id: 25, name: 'Pikachu' },
  { id: 4, name: 'Charmander' },
  { id: 10 },
  { id: 23 },
  { id: 65 },
];

const idPokemonsNotToFavorite = [
  {
    id: 25,
    name: 'Pikachu',
  },
];

const favPokemonsText = 'Favorite Pokémons';

describe('quesito 3', () => {
  test('Se aparece mensagem de erro na tela, quando não tiver pokémons favoritos', () => {
    renderWithRouter(<App />);
    const navLinkFavorite = screen.getByText(favPokemonsText);
    fireEvent.click(navLinkFavorite);

    const msgError = screen.getByText('No favorite pokemon found');
    expect(msgError).toBeInTheDocument();
  });

  test('Se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    idPokemonsToFavorite.map((num) => {
      history.push(`/pokemons/${num.id}`);

      const favoritarCheck = screen.getByText('Pokémon favoritado?');
      fireEvent.click(favoritarCheck);
      return true;
    });

    history.push('/');
    const navLinkFavorite = screen.getByText(favPokemonsText);
    fireEvent.click(navLinkFavorite);
    const pokemon = screen.getByText(idPokemonsToFavorite[0].name);
    expect(pokemon).toBeInTheDocument();

    const textoDetails = screen.getAllByText('More details');
    expect(textoDetails.length).toBe(idPokemonsToFavorite.length);
  });

  test('Se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { history } = renderWithRouter(<App />);

    const navLinkFavorite = screen.getByText(favPokemonsText);
    fireEvent.click(navLinkFavorite);
    const pokemon = screen.getByText(idPokemonsToFavorite[0].name);
    expect(pokemon).toBeInTheDocument();

    idPokemonsNotToFavorite.map((num) => {
      history.push(`/pokemons/${num.id}`);

      const favoritarCheck = screen.getByText('Pokémon favoritado?');
      if (favoritarCheck.checked === true) {
        fireEvent.click(favoritarCheck);
      }
      return true;
    });

    history.push('/');
    const navLinkFavorite2 = screen.getByText('Favorite Pokémons');
    fireEvent.click(navLinkFavorite2);

    expect(pokemon).not.toBeInTheDocument();
  });
});
