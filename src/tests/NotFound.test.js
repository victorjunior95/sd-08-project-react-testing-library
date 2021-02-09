import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

test('página contém um heading h2 com o texto Page requested not found', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/outropath');
  const noMatch = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(noMatch).toBeInTheDocument();
});

test('Se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/outropath');
  const imagem = screen.getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(imagem.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
