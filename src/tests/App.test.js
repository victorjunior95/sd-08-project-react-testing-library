import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { history, createMemoryHistory } from 'history';
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

test('testa conjunto de links de navegação', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const links = getAllByRole('link');
  expect(links.length).toBe(4);
  expect(links[0]).toHaveTextContent(/home/i);
  expect(links[1]).toHaveTextContent(/about/i);
  expect(links[2]).toHaveTextContent(/favorite pokémons/i);
});
