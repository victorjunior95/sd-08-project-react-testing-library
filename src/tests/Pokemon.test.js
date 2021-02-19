import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    expect(pokemonType).toHaveTextContent(/Electric/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(pokemonImage).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt',
      'Pikachu sprite');
  });

  it('Testa se o card possui link de navegação dos detalhes', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();
  });

  it('Testa se o link de detalhes redireciona corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(detailsLink);
    const checkbox = getByRole('checkbox');
    userEvent.click(checkbox);
    const starIcon = document.querySelector('.favorite-icon');
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toHaveAttribute('alt',
      'Pikachu is marked as favorite');
  });
});
