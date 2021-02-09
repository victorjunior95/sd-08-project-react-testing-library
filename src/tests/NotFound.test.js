import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste Requisito 4', () => {
    test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
       const { getByRole } = render(<NotFound />);
       
       expect(getByRole('heading', {
           name: /Page requested not found/i,
           level: 2,
       }));
    });

    test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
        const { getByRole } = renderWithRouter(<NotFound />);
        const img = 'Pikachu crying because the page requested was not found';

        expect(getByRole('img', { name: img })).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
