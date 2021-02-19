import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
// import Pokemon from '../components/Pokemon';
// import renderWithRouter from './renderWithRouter';

test('testa se é renderizado um card com o nome do pokémon', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByTestId(/pokemon-name/i);
  expect(heading).toBeInTheDocument();
  expect(heading.textContent).toBe('Pikachu');
});

test('testa se é renderizado um card com o tipo do pokémon', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByTestId(/pokemonType/i);
  expect(heading).toBeInTheDocument();
  expect(heading.textContent).toBe('Electric');
});

test('testa se é renderizado um card com o peso do pokémon', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByTestId(/pokemon-weight/i);
  expect(heading).toBeInTheDocument();
  expect(heading.textContent).toBe('Average weight: 6.0 kg');
});

test('testa se é exibida a imagem do pokémon', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const image = getByAltText('Pikachu sprite');
  expect(image.src).toContain('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('testa se existe o link More details', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/More details/i);
  expect(heading).toBeInTheDocument();
});

test('Verifica se existe o id do Pokémon ao clicar em More details', () => {
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
  const image = getByAltText('Pikachu is marked as favorite');
  expect(image.src).toContain('/star-icon.svg');
});
