import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

const URL = '/pokemons/4';

describe('Requisito 7 - Teste o componente \\"PokemonDetails"\\', () => {
  it(`Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.
  A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
  Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
  A seção de detalhes deve conter um heading h2 com o texto Summary.
  A seção de detalhes deve conter um parágrafo com o resumo do
  Pokémon específico sendo visualizado.`,
  () => {
    const history = createMemoryHistory();
    history.push(URL);
    const { getByText, getByRole, queryByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const noMoreDetails = queryByText(/more details/i);
    const namePokemon = getByRole('heading', { name: `${pokemons[1].name} Details` });
    const summary = getByRole('heading', { level: 2, name: /summary/i });
    const resume = getByText(pokemons[1].summary);
    expect(namePokemon).toBeDefined();
    expect(summary).toBeDefined();
    expect(noMoreDetails).toBeNull();
    expect(resume.textContent).toBe(pokemons[1].summary);
  });

  it(`Teste se existe na página uma seção com os mapas contendo
    as localizações do pokémon`, () => {
    const history = createMemoryHistory();
    history.push(URL);
    const { getByText, getByRole, getAllByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const charmander = pokemons[1];
    const textLocation = getByRole('heading', {
      name: `Game Locations of ${charmander.name}`,
    });
    expect(textLocation.textContent).toBe(`Game Locations of ${charmander.name}`);

    const mapLocation = getAllByRole('img', { name: `${charmander.name} location` });
    expect(mapLocation).toHaveLength(charmander.foundAt.length);

    charmander.foundAt.forEach((el, index) => {
      expect(mapLocation[index].src).toBe(el.map);
      expect(mapLocation[index].alt).toBe(`${charmander.name} location`);
      expect(getByText(el.location)).toBeDefined();
    });
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const history = createMemoryHistory();
      history.push(URL);
      const { getByText, getByRole } = render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      const checkbox = getByRole('checkbox', {
        name: /pokémon favoritado\?/i,
      });
      const labelText = getByText(/pokémon favoritado\?/i);
      expect(labelText).toBeDefined();
      expect(checkbox).toBeDefined();
      userEvent.click(checkbox, true);
      userEvent.click(checkbox, false);
    });
});
