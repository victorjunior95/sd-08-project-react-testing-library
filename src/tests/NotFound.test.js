import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 4 <NotFound />', () => {
  test('Teste se página contém um heading h2 com o texto Page requested not found',
    () => {
      const { getByRole, history } = renderWithRouter(<NotFound />);
      history.push('djaskda');
      const heading = getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      });
      expect(heading).toBeInTheDocument();
    });
  test('Teste se página mostra a imagem ', () => {
    const { container, history } = renderWithRouter(<NotFound />);
    history.push('ijdasidjasijd');
    const image = container.querySelector('.not-found-image');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toHaveProperty('src', url);
  });
});
