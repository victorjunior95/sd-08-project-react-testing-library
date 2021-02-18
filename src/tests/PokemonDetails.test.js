import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando PokemonDetails', () => {
  test('Se informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { queryByText } = renderWithRouter(<App />);
    const bttDetails = queryByText(/More details/i);
    fireEvent.click(bttDetails);
    expect(queryByText('Pikachu Details')).toBeInTheDocument();
    expect(bttDetails).not.toBeInTheDocument();
    const textH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(textH2).toBeInTheDocument();
    const textPokemonDt = queryByText(/this intelligent pokémon/i);
    expect(textPokemonDt).toBeInTheDocument();
  });

  test('Se existe seção com os mapas contendo as localizações do pokémon', () => {
    const { queryByText, queryAllByAltText } = renderWithRouter(<App />);
    const bttDetails = queryByText('More details');
    fireEvent.click(bttDetails);
    const textLocal = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(textLocal).toBeInTheDocument();
    const locationsPikachu = queryAllByAltText(/pikachu location/i);
    expect(locationsPikachu.length).toEqual(2);
    expect(locationsPikachu[0]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
  });
  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { queryByText, queryByRole } = renderWithRouter(<App />);
    const bttDetails = queryByText('More details');
    fireEvent.click(bttDetails);
    const bttFavorite = queryByRole('checkbox');
    expect(bttFavorite).toBeInTheDocument();
    fireEvent.click(bttFavorite);
    expect(queryByText(/pokémon favoritado/i)).toBeInTheDocument();
  });
});
