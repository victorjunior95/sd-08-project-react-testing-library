import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Testando se as informações sobra a pokedex estão presentes', () => {
  const { getByText } = renderWithRouter(<About />);
  const par1 = getByText('This application simulates a Pokédex, a '
  + 'digital encyclopedia containing all Pokémons');
  const par2 = getByText(
    'One can filter Pokémons by type, and see more details for each one of them',
  );

  expect(par1).toBeInTheDocument();
  expect(par2).toBeInTheDocument();
});

test('Testando se o cabeçalho da pagina está presente', () => {
  const { getByRole } = renderWithRouter(<About />);

  expect(getByRole('heading').innerHTML).toBe('About Pokédex');
});

test('Testando se a imagem está presente', () => {
  const { getByRole } = renderWithRouter(<About />);

  expect(getByRole('img').src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
