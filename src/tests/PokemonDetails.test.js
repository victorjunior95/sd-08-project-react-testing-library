import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente <PokemonDetails.js />', () => {
  it('Testando se as infos detalhadas são mostradas na tela', () => {
    RenderWithRouter(
      <App />,
    );

    userEvent.click(screen.getByRole('button', { name: /dragon/i }));
    userEvent.click(screen.getByText(/more details/i));
    expect(screen.getByRole('heading', {
      level: 2,
      name: /dragonair details/i,
    })).toBeInTheDocument();
    expect(screen.queryByText('More details')).toBeNull();
    expect(screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    })).toBeInTheDocument();
    const text1 = 'They say that if it emits an aura from its whole body, ';
    const text2 = 'the weather will begin to change instantly.';
    expect(screen.getByText(text1 + text2)).toBeInTheDocument();
  });

  it('Testando se existem mapas com as localizações do pokémon', () => {
    RenderWithRouter(
      <App />,
    );

    userEvent.click(screen.getByRole('button', { name: /dragon/i }));
    userEvent.click(screen.getByText(/more details/i));
    expect(screen.getByRole('heading', {
      level: 2,
      name: /game locations of dragonair/i,
    })).toBeInTheDocument();
    expect(screen.getAllByAltText(/dragonair location/i)[0].src)
      .toBe('https://cdn.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png');
    expect(screen.getAllByAltText(/dragonair location/i)[1].src)
      .toBe('https://cdn.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png');
  });

  it('Testando se o usuário pode favoritar através da página de detalhes', () => {
    RenderWithRouter(
      <App />,
    );

    userEvent.click(screen.getByRole('button', { name: /dragon/i }));
    userEvent.click(screen.getByText(/more details/i));
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByLabelText(/pokémon favoritado?/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox').checked).toBeFalsy();
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox').checked).toBeTruthy();
  });
});
