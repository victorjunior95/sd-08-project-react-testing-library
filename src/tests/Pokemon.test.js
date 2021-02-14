import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes Requisito 6', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getByAltText, getByTestId } = renderWithRouter(<App />);

    expect(getByText('Pikachu')).toBeInTheDocument();

    const type = getByTestId('pokemonType');
    expect(type).toHaveTextContent('Electric');

    expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    const alt = getByAltText('Pikachu sprite');
    expect(alt.src).toContain('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText('More details'));
    expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
    history.push('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);

    userEvent.click(getByText('More details'));
    userEvent.click(getByText('Pokémon favoritado?'));

    const alt = getByAltText('Pikachu is marked as favorite');
    expect(alt.src).toContain('/star-icon.svg');
  });
});
