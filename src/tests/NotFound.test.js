import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import NotFound from '../components/NotFound';
// import renderWhitRouter from './renderWithRouter';

describe('NotFound.js ', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem:', () => {
    render(<NotFound />);
    const notFoundImg = screen.getAllByRole('img');
    // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    expect(notFoundImg[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(notFoundImg[1]).toHaveAttribute('alt',
      'Pikachu crying because the page requested was not found');
    expect(notFoundImg[1]).toBeInTheDocument();
  });
});
