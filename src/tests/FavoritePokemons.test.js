import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('test the Favorite Pokemons component', () => {
  it('tests if the message is displayed', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
      <App />
    </MemoryRouter>,
    );
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
});

// - Teste se é exibido na tela a mensagem `No favorite pokemon found`, se a pessoa não tiver pokémons favoritos.

// - Teste se é exibido todos os cards de pokémons favoritados.

// - Teste se **nenhum** card de pokémon é exibido, se ele não estiver favoritado.

// **O que será verificado:**

// - Será avaliado se o arquivo teste `FavoritePokemons.test.js` contemplam 100% dos casos de uso criados pelo Stryker.
