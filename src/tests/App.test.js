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

test('renders a link with the text Home', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkHomeElement = getByText(/Home/i);
  expect(linkHomeElement).toBeInTheDocument();
});

test('renders a link with the text About', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkAboutElement = getByText(/About/i);
  expect(linkAboutElement).toBeInTheDocument();
});

test('renders a link with the text Favorite Pokémons', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkFavoriteElement = getByText(/Favorite Pokémons/i);
  expect(linkFavoriteElement).toBeInTheDocument();
});
