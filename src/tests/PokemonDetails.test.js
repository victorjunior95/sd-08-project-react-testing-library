import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const moreDetail = 'More details';

describe('PokemonDetails.js', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const getLinkDetails = getByRole('link', { name: moreDetail });
    userEvent.click(getLinkDetails);
    const getPokemontDetails = getByRole('heading',
      { level: 2, name: /pikachu details/i });

    expect(getPokemontDetails).toBeInTheDocument();

    const dataSummary = getByText(pokemons[0].summary);
    const summaryText = getByRole('heading', { level: 2, name: /summary/i });

    expect(getLinkDetails).not.toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
    expect(dataSummary).toBeInTheDocument();
  });
  it('Teste se existe na página seção mapas contendo as localizações do pokémon', () => {
    const { getByRole, queryAllByAltText } = renderWithRouter(<App />);
    const getLinkDetails = getByRole('link', { name: 'More details' });
    userEvent.click(getLinkDetails);
    const getLocationText = getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(getLocationText).toBeInTheDocument();

    const locationsText = document.querySelectorAll('em');// https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/em
    const Images = queryAllByAltText(/pikachu location/i);

    expect(locationsText.length).toBe(2);
    expect(Images[0]).toBeInTheDocument();
    expect(Images[1]).toBeInTheDocument();
    expect(Images[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(Images[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('Teste se o usuário pode favoritar pokémon através da página de detalhes', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: moreDetail });
    userEvent.click(detailsLink);
    const checkbox = getByRole('checkbox');
    const labelText = getByLabelText(/pokémon favoritado?/i);
    expect(labelText).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
