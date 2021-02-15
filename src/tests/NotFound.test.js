import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('teste do componente NotFound', () => {
  test('verifica se o cabeçalho renderiza com o titulo correto', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFoundHeader = getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundHeader).toBeInTheDocument();
  });
  test('verifica se o emoji chorando renderiza na pagina', () => {
    const { getByLabelText } = renderWithRouter(<NotFound />);
    const cryingEmoji = getByLabelText(/crying emoji/i);
    expect(cryingEmoji).toBeInTheDocument();
  });
  test('verifica se a imagem do pikach chorando aparece na tela', () => {
    renderWithRouter(<NotFound />);
    const cryingPikachu = document
      .querySelector('img[src="https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"]');
    expect(cryingPikachu).toBeInTheDocument();
  });
});
