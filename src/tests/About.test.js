import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Testando se a página About é renderizada no caminho `/about`', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <About />
    </MemoryRouter>,
  );

  const heading = getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });

  expect(heading).toBeInTheDocument();
});

test('Testando se a descrição da página About é renderizada', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <About />
    </MemoryRouter>,
  );

  const aboutText = getByText(/This application simulates a Pokédex/i);

  expect(aboutText).toBeInTheDocument();
});

test('Testando se a imagem é renderizada na página About', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <About />
    </MemoryRouter>,
  );

  const image = getByRole('img');

  expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
