import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import About from '../components/About';

test('sobre about', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <About />
    </Router>,
  );
  const infoText = screen.getByText(/This application simulates a Pokédex/i);
  expect(infoText).toBeInTheDocument();
  const aboutPokeText = screen.getByRole('heading', {
    level: 2,
    name: /About Po/i,
  });
  expect(aboutPokeText).toBeInTheDocument();
  const paragraphs = screen.getAllByTestId('paragr');
  expect(paragraphs.length).toBe(2);
  const imagem = screen.getByRole('img');
  expect(imagem.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
