import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

test('Teste se a página contém um heading h2 com o texto `Encountered pokémons`', () => {
  const { container } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  container.querySelector('h2');
  expect(container.querySelector('h2')).toHaveTextContent('Encountered pokémons');
});

describe('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.',
  () => {
    it('O botão deve conter o texto Próximo pokémon;', () => {
      const { getByText, queryAllByTestId } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
      );
      const magic = 7;
      expect(getByText(/Próximo pokémon/i)).toBeInTheDocument();
      expect(getByText(/Próximo pokémon/i).tagName).toBe('BUTTON');
      expect(queryAllByTestId('pokemon-type-button').length).toBe(magic);
    });
    it('Ao clicar no botão deve ir para o próximo poke e no final, voltar ao 1º;', () => {
      const { getByText } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
      );
      pokemons.forEach((pokemon, index) => {
        // Pokémon atual:
        const namePokemon = getByText(pokemon.name);
        expect(namePokemon).toBeInTheDocument();

        // Simula o evento de click no botão:
        const btnNext = getByText(/Próximo pokémon/i);
        fireEvent.click(btnNext);

        // Calcula o índice do próximo Pokémon a ser exibido em tela:
        const sizePokemons = pokemons.length;
        const indexNextPokemon = (index === sizePokemons - 1)
          ? ((index + 1) - sizePokemons) // volta ao primeiro da lista
          : (index + 1); // segue para o próximo da lista

        // Próximo Pokémon:
        const nameNextPokemon = getByText(pokemons[indexNextPokemon].name);
        expect(nameNextPokemon).toBeInTheDocument();
      });
      // esse teste foi extraído da página de Ana karine:
      // https://github.com/tryber/sd-07-project-react-testing-library/pull/91/files
    });
  });

describe('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { getAllByText } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );

  expect(getAllByText('More details').length).toBe(1);
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  it('Ao clicar num botao de tipo, mostra só esse tipo'
  + 'O botão deve conter o nome do tipo', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    getByText('Fire');
    fireEvent.click(getByText('Fire'));
    expect(getByText('Charmander')).toBeInTheDocument();
    getByText('Dragon');
    fireEvent.click(getByText('Dragon'));
    expect(getByText('Dragonair')).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser "All"', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const all = getByRole('button', { name: 'All' });
    expect(all).toBeInTheDocument();
  });
  it('Deverá mostrar os Pokémons sem filtros quando o botão All for clicado;', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const all = getByRole('button', { name: 'All' });
    fireEvent.click(all);
    const pikaImg = getByRole('img', 'Pikachu sprite');
    expect(pikaImg).toBeInTheDocument();
  });
});

describe('Testando os botões', () => {
  it('Teste se criado dinamicamente botão de filtro para cada tipo pokémon', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const all = getByRole('button', { name: 'All' });
    expect(all).toBeInTheDocument();

    const fireButton = getByRole('button', { name: 'Fire' });
    expect(fireButton).toBeInTheDocument();
    fireEvent.click(fireButton);
    const charImg = getByRole('img', 'Charmander sprite');
    expect(charImg).toBeInTheDocument();

    const electricButton = getByRole('button', { name: 'Electric' });
    expect(electricButton).toBeInTheDocument();
    fireEvent.click(electricButton);
    const pikaImg = getByRole('img', 'Pikachu sprite');
    expect(pikaImg).toBeInTheDocument();

    const bugButton = getByRole('button', { name: 'Bug' });
    expect(bugButton).toBeInTheDocument();
    fireEvent.click(bugButton);
    const catImg = getByRole('img', 'Caterpie sprite');
    expect(catImg).toBeInTheDocument();

    const poisonButton = getByRole('button', { name: 'Poison' });
    expect(poisonButton).toBeInTheDocument();
    fireEvent.click(poisonButton);
    const ekImg = getByRole('img', 'Ekans sprite');
    expect(ekImg).toBeInTheDocument();

    const psychicButton = getByRole('button', { name: 'Psychic' });
    expect(psychicButton).toBeInTheDocument();
    fireEvent.click(psychicButton);
    const alakImg = getByRole('img', 'Alakazam sprite');
    expect(alakImg).toBeInTheDocument();

    const normalButton = getByRole('button', { name: 'Normal' });
    expect(normalButton).toBeInTheDocument();
    fireEvent.click(normalButton);
    const normalImg = getByRole('img', 'Snorlax sprite');
    expect(normalImg).toBeInTheDocument();

    const dragonButton = getByRole('button', { name: 'Dragon' });
    expect(dragonButton).toBeInTheDocument();
    fireEvent.click(dragonButton);
    const dragImg = getByRole('img', 'Dragonair sprite');
    expect(dragImg).toBeInTheDocument();
  });

  it('Botão `Próximo pokémon` desabilita quando houver apenas um Pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const dragonButton = getByRole('button', { name: 'Dragon' });
    fireEvent.click(dragonButton);
    expect(getByText(/Próximo pokémon/i)).toBeDisabled();
  });
});
