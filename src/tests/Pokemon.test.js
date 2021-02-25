import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const nomeCorreto = getByTestId(/pokemon-name/i);
    expect(nomeCorreto).toBeInTheDocument();
    expect(nomeCorreto.textContent).toBe('Pikachu');
  });
  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const tipoCorreto = getByTestId(/pokemonType/i);
    expect(tipoCorreto).toBeInTheDocument();
    expect(tipoCorreto.textContent).toBe('Electric');
  });
  it('Teste se é renderizado um card com o peso correto do Pokemon', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pesoCorreto = getByTestId(/pokemon-weight/i);
    expect(pesoCorreto).toBeInTheDocument();
    expect(pesoCorreto.textContent).toBe('Average weight: 6.0 kg');
  });
  it('Teste se é exibido a imagem do pokemon', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const img = getByAltText('Pikachu sprite');
    expect(img.src).toContain('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Teste se é exibido o link More details', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const link = getByText(/More details/i);
    expect(link).toBeInTheDocument();
  });
  it('Verifica se existe o id do Pokemon ao clicar em More details', () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText, getByAltText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    fireEvent.click(getByLabelText(/Pokémon favoritado/i));
    const img = getByAltText('Pikachu is marked as favorite');
    expect(img.src).toContain('/star-icon.svg');
  });
});
