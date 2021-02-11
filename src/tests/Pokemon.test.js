import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import RenderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

const pokemon = pokemons[4];

describe('Testando o componente <Pokemon.js />', () => {
  it('Testando se é renderizado um card com as infos de determinado pokémon', () => {
    RenderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    userEvent.click(screen.getByText(/psychic/i));
    const imgLink = 'https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png';
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    expect(screen.getByTestId('pokemonType').textContent).toBe('Psychic');
    expect(screen.getByTestId('pokemon-weight').textContent)
      .toBe('Average weight: 48.0 kg');
    expect(screen.getByAltText('Alakazam sprite').src).toBe(imgLink);
  });

  it('Testando se o card do Pokémon contém um link detalhes deste Pokémon', () => {
    RenderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    expect(screen.getByRole('link', { name: /more details/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /more details/i }).href).toBe('http://localhost/pokemons/65');
  });

  it('Testando se ao clicar no link é redirecionado para os detalhes de Pokémon', () => {
    RenderWithRouter(
      <App />,
    );

    userEvent.click(screen.getByRole('button', { name: /psychic/i }));
    userEvent.click(screen.getByText(/more details/i));
    expect(screen.getByRole('heading', { name: /alakazam details/i }))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /summary/i }))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /game locations of alakazam/i }))
      .toBeInTheDocument();
  });

  it('Testando também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = RenderWithRouter(
      <App />,
    );

    userEvent.click(screen.getByRole('button', { name: /psychic/i }));
    userEvent.click(screen.getByText(/more details/i));
    expect(history.location.pathname).toBe('/pokemons/65');
  });

  it('Testando se existe um ícone de estrela nos Pokémons favoritados', () => {
    RenderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite />,
    );

    expect(screen.getByRole('img', { name: /alakazam is marked as favorite/i }))
      .toBeInTheDocument();
    expect(screen.getByRole('img', { name: /alakazam is marked as favorite/i }).src)
      .toBe('http://localhost/star-icon.svg');
  });
});
