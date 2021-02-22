import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { getAllByText, render } from '@testing-library/react';
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

it('check if a link Home exist in the document', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkHomeElement = getByText(/Home/i);
  expect(linkHomeElement).toBeInTheDocument();
});

it('check if a link about exist in the document', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkAboutElement = getByText(/About/i);
  expect(linkAboutElement).toBeInTheDocument();
});

it('ckeck if a link Favorite exist in the document', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkFavoriteElement = getAllByText(/Favorite Pokémons/i);
  expect(linkFavoriteElement).toBeInTheDocument();
});
