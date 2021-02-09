import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('test if the page contains information about Pokedex', () => {
  const { getByText, getByRole, getAllByTestId } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  const infoPokedex = getByText(/this application simulates/i);
  expect(infoPokedex).toBeInTheDocument();
  const aboutText = getByRole('heading', { level: 2 });
  expect(aboutText).toHaveTextContent('About Pokédex');
  const paragraphs = getAllByTestId('about-paragraph');
  expect(paragraphs.length).toBe(2);
  const pokedexImage = getByRole('img');
  expect(pokedexImage.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
