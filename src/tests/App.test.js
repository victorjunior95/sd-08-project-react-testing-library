import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('render a link with the text Home', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeLinkElement = getByText(/Home/i);
  expect(homeLinkElement).toBeInTheDocument();
});

test('render a link with the text About', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const aboutLinkElement = getByText(/About/i);
  expect(aboutLinkElement).toBeInTheDocument();
});

test('render a link with the text Favorite Pokemons', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favoriteLinkElement = getByText(/Favorite Pokémons/i);
  expect(favoriteLinkElement).toBeInTheDocument();
});
