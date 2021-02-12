import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getAllByRole } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemonType');
    const peso = getByTestId('pokemon-weight');
    const img = getAllByRole('img');
    const src = img[0].getAttribute('src');
    const alt = img[0].getAttribute('alt');
    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(peso).toHaveTextContent('Average weight: 6.0 kg');
    expect(src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(alt).toBe('Pikachu sprite');
  });

  it('Card indicado na Pokédex contém um link de navegação para exibir detalhes', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: /more details/i });
    const linkHref = moreDetails.getAttribute('href');
    expect(linkHref).toBe('/pokemons/25');
    userEvent.click(moreDetails);
    const pathnameD = history.location.pathname;
    expect(pathnameD).toBe('/pokemons/25');
    const marcarF = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(marcarF);
    const favorito = getByRole('img', { name: /pikachu is marked as favorite/i });
    const fSrc = favorito.getAttribute('src');
    const fAlt = favorito.getAttribute('alt');
    expect(favorito).toBeInTheDocument();
    expect(fSrc).toBe('/star-icon.svg');
    expect(fAlt).toBe('Pikachu is marked as favorite');
  });
});
