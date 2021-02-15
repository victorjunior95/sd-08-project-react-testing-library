import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('testa conjunto de links de navegação', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const FOUR = 4;
  const links = getAllByRole('link');
  expect(links.length).toBe(FOUR);
  expect(links[0]).toHaveTextContent(/home/i);
  expect(links[1]).toHaveTextContent(/about/i);
  expect(links[2]).toHaveTextContent(/favorite pokémons/i);
});

test('verifica se o link Home funciona', () => {
  const history = createMemoryHistory();
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const links = getAllByRole('link');
  userEvent.click(links[0]);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});
