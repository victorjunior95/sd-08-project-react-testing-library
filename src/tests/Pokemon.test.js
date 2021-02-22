import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requirement 05', () => {
  it('Renderizando um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    expect(screen.getByTestId('pokemonType')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');
    expect(screen.getByRole('img').src)
      .toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(screen.getByRole('img').alt).toBe('Pikachu sprite');
  });

  it('Card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    expect(screen.getByRole('link', { name: /More details/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /More details/i }).href)
      .toContain('/pokemons/25');
  });

  it('Teste 03 - Ao clicar no link feito o redirecionamento da aplicação', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    expect(screen.getByRole('heading', { name: /Pikachu Details/i })).toBeInTheDocument();
  });

  it('Teste 04 - A URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App pokemons={ pokemons } />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste 05 - Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    expect(screen.getByAltText('Pikachu is marked as favorite').src)
      .toContain('/star-icon.svg');
  });
});
