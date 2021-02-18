import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando Pokemon', () => {
  test('Verificando se é renderizado card com as infq de determinado pokémon', () => {
    const { getByAltText, queryByText, getByTestId } = renderWithRouter(<App />);
    const buttonProxPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    fireEvent.click(buttonProxPokemon);
    expect(queryByText('Charmander')).toBeInTheDocument();
    expect(queryByText('Average weight: 8.5 kg')).toBeInTheDocument();
    expect(getByTestId('pokemonType').innerHTML).toBe('Fire');
    const img = getByAltText('Charmander sprite');

    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
  test('Pokédex contém um link de navegação para exibir detalhes ', () => {
    const { queryByText } = renderWithRouter(<App />);
    const buttonProxPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    fireEvent.click(buttonProxPokemon);
    const bttDetails = queryByText('More details');
    expect(bttDetails).toHaveAttribute('href', '/pokemons/4');
  });

  test('Teste se ao clicar no link detalhes', () => {
    const { queryByText, history } = renderWithRouter(<App />);
    const buttonProxPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    fireEvent.click(buttonProxPokemon);

    const bttDetails = queryByText(/More details/i);
    fireEvent.click(bttDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/4');
  });
  test('Teste se a checkbox e icone de estrela ao favoritar', () => {
    const { queryByText, queryByRole, getByAltText } = renderWithRouter(<App />);
    const bttDetails = queryByText('More details');
    fireEvent.click(bttDetails);
    const bttFavorite = queryByRole('checkbox');
    expect(bttFavorite).toBeInTheDocument();
    fireEvent.click(bttFavorite);
    const imgStar = getByAltText('Pikachu is marked as favorite');
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
    expect(imgStar).toBeInTheDocument();
  });
});
