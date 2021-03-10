import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verifica se aparece texto "Page requested not found 😭"', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  history.push('/page-not-found');

  const title = getByRole('heading', {
    level: 2,
    name: 'Page requested not found Crying emoji',
  });

  expect(title).toBeInTheDocument();
});

test('Verifica se aparece a imagem', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  history.push('/page-not-found');

  const image = getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });

  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
