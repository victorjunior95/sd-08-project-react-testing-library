import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('1- Deve aparecer um card com as informações de determinado pokémon', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const image = getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
    expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    expect(getByTestId('pokemonType').innerHTML).toBe('Electric');
    expect(getByTestId('pokemon-weight').innerHTML).toBe(
      'Average weight: 6.0 kg',
    );
  });
});
describe('2- O link detalhes do pokemon:', () => {
  it('Se o link detalhes existir', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsLink = getByText(/more details/i);
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
  });
  it('O link detalhes deve redirecionar para a pagina de detalhes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const details = getByText(/more details/i);
    userEvent.click(details);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});
describe('3- Deve existir um ícone de estrela nos pokemons favoritos', () => {
  it('A estrela deve aparecer nos pokemons favoritos', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const details = getByText(/more details/i);
    userEvent.click(details);
    const favoriteButton = getByText(/pokémon favoritado/i);
    userEvent.click(favoriteButton);
    const starIcon = getByAltText(/pikachu is marked as favorite/i);
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
