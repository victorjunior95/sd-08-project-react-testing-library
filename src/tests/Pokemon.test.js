import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('REQUISITO 6', () => {
  it('Renderiza um card com as informações de determinado pokémon', () => {
    const pokemon = pokemons[0];
    const { getByText } = renderWithRouter(<Pokemon pokemon={ pokemon } />);
    const testName = getByText(/Pikachu/i);
    expect(testName).toBeInTheDocument();
  });

  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    const pokemon = pokemons[0];
    const { getByText } = renderWithRouter(<Pokemon pokemon={ pokemon } />);
    const testType = getByText(/Electric/i);
    expect(testType).toBeInTheDocument();
  });

  it('O peso médio do pokémon deve ser exibido ', () => {
    const pokemon = pokemons[0];
    const { getByText } = renderWithRouter(<Pokemon pokemon={ pokemon } />);
    expect(getByText(/average weight: 6.0 kg/i)).toBeInTheDocument();
  });

  it('A imagem do Pokémon deve ser exibida.', () => {
    const pokemon = pokemons[0];
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={ pokemon } />);
    const image = getByAltText('Pikachu sprite');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const linkBtn = getByText('More details');
    expect(linkBtn.href).toBe('http://localhost/pokemons/25');
    userEvent.click(linkBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });

  // it('Redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
  //   const { history, getByText } = renderWithRouter(<App />);
  //   const redirect = getByText('More details');
  //   userEvent.click(redirect);
  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/pokemons/25');
  //   expect(getByText('Pikachu Details')).toBeInTheDocument();
  // });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const pokemon = pokemons[0];
    const { getByAltText } = renderWithRouter(<Pokemon isFavorite pokemon={ pokemon } />);
    const favImg = getByAltText('Pikachu is marked as favorite');
    expect(favImg.src).toBe('http://localhost/star-icon.svg');
  });
});
