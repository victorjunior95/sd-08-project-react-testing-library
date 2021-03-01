import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

test('Teste de caminho inexistente e renderização do Not Found', () => {
  const { getByRole, getByAltText, history } = renderWithRouter(<App />);
  history.push('/pagina/nao-existe');

  const noMatchText = getByRole('heading', {
    level: 2,
  });
  expect(noMatchText).toHaveTextContent('Page requested not found 😭');

  const noMatchImg = getByAltText(
    /Pikachu crying because the page requested was not found/i,
  );
  expect(noMatchImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
