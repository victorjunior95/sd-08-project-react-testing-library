import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  it(' Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = render(<NotFound />);
    expect(getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    })).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem', async () => {
    const { getByAltText } = await render(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
