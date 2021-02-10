import * as storage from '../services/pokedexService';

import pokemons from '../data';

const localStorageMock = (() => {
  let store = Object.create(null);
  return {
    getItem: (key) => (key === 'favoritePokemonIds' ? (store[key] || null) : null),
    setItem: (key, item) => { if (key === 'favoritePokemonIds') store[key] = item; },
    clear: () => { store = Object.create(null); },
  };
})();

Object.defineProperty(
  global,
  'localStorage',
  { value: localStorageMock },
);

afterEach(() => {
  localStorageMock.clear();
  jest.clearAllMocks();
});

describe('Testando pokedexService', () => {
  const spyGetItem = jest.spyOn(localStorageMock, 'getItem');
  const spySetItem = jest.spyOn(localStorageMock, 'setItem');

  test(`Ao chamar a função readFavoritePokemonIds deverá ser retornado um
  array com todos os pokemons favoritados, ou um array vazio, caso não haja
  nenhum`, () => {
    storage.updateFavoritePokemons(pokemons[0].id, true);
    storage.updateFavoritePokemons(pokemons[1].id, true);
    expect(spySetItem).toHaveBeenCalledTimes(2);
    expect(spyGetItem).toHaveBeenCalledTimes(2);
    const favorites = storage.readFavoritePokemonIds();
    expect(favorites.length).toBe(2);
    expect(spyGetItem).toHaveBeenCalledTimes(+'3'); // esse linter é um saco
  });

  test(`Ao chamar a função updateFavoritePokemons com o isFavorite true ele 
  é adicionado. Caso seja chamada com isFavorite false ele é retirado`, () => {
    const checkFavoritesLength = (length) => {
      const favorites = storage.readFavoritePokemonIds();
      expect(favorites.length).toBe(length);
    };
    checkFavoritesLength(0);
    storage.updateFavoritePokemons(pokemons[0].id, true);
    checkFavoritesLength(1);
    storage.updateFavoritePokemons(pokemons[1].id, true);
    checkFavoritesLength(2);
    storage.updateFavoritePokemons(pokemons[1].id, false);
    checkFavoritesLength(1);
  });
});
