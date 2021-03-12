import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokemon.js - the page:', () => {
  // Teste se é renderizado um card com as informações de determinado pokémon.
  test('Renders a card with the information of a certain Pokémon', () => {
    const { getByRole, getByTestId, getByText } = renderWithRouter(<App />);
    pokemons.forEach(({ name, type, averageWeight, image }) => {
      // O nome correto do Pokémon deve ser mostrado na tela
      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(name);

      // O tipo correto do pokémon deve ser mostrado na tela
      const pokemonType = getByTestId('pokemonType');
      expect(pokemonType).toHaveTextContent(type);

      // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida
      const pokemonWeight = getByTestId('pokemon-weight');
      expect(pokemonWeight).toHaveTextContent(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );

      // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon
      const pokemonImg = getByRole('img', { name: `${name} sprite` });
      expect(pokemonImg).toHaveAttribute('src', image);

      const buttonNextPokemon = getByText(/Próximo pokémon/i);
      userEvent.click(buttonNextPokemon);
    });
  });

  // Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;
  test(`The Pokémon card page indicated on the Pokédex
  contains a navigation link to view details of this Pokémon.
  The link must have the URL / pokemons / <id>,
  where <id> is the id of the Pokémon displayed`, () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      // Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;
      const details = getByRole('link', { name: /More details/i });
      expect(details).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      const buttonNextPokemon = getByText(/Próximo pokémon/i);
      userEvent.click(buttonNextPokemon);
    });
  });

  // Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon
  test(`Clicking on the Pokémon navigation link
  redirects the applicationto the Pokémon details page`, () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const zero = 0;
    let timesToClick = zero;
    pokemons.forEach((pokemon) => {
      const details = getByRole('link', { name: /More details/i });
      expect(details).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      userEvent.click(details);
      const {
        location: { pathname },
      } = history;
      expect(pathname).toBe(`/pokemons/${pokemon.id}`);

      const homeLink = getByRole('link', {
        name: /Home/i,
      });
      userEvent.click(homeLink);

      for (let index = 0; index <= timesToClick; index += 1) {
        const buttonNextPokemon = getByText(/Próximo pokémon/i);
        userEvent.click(buttonNextPokemon);
      }
      timesToClick += 1;
    });
  });

  // Teste se existe um ícone de estrela nos Pokémons favoritados
  test('Contains a star icon on favorite Pokémon', () => {
    const { getByText, getByRole, history, getByLabelText } = renderWithRouter(<App />);
    const zero = 0;
    let timesToClick = zero;
    pokemons.forEach((pokemon) => {
      const details = getByRole('link', { name: /More details/i });
      expect(details).toHaveAttribute('href', `/pokemons/${pokemon.id}`);

      userEvent.click(details);
      const {
        location: { pathname },
      } = history;
      expect(pathname).toBe(`/pokemons/${pokemon.id}`);

      const favorited = getByLabelText(/Pokémon favoritado/i);
      userEvent.click(favorited);

      // A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido
      if (favorited.checked) {
        const favorite = getByRole('img', {
          name: `${pokemon.name} is marked as favorite`,
        });
        // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg
        expect(favorite).toHaveAttribute('src', '/star-icon.svg');
      }

      const homeLink = getByRole('link', {
        name: /Home/i,
      });
      userEvent.click(homeLink);

      for (let index = 0; index <= timesToClick; index += 1) {
        const buttonNextPokemon = getByText(/Próximo pokémon/i);
        userEvent.click(buttonNextPokemon);
      }
      timesToClick += 1;
    });
  });
});
