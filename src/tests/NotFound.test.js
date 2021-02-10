import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente `<NotFound.js />', () => {
  test('Se página contém um heading `h2` com o texto `Page requested not found', () => {
    const { getByRole } = render(<NotFound />);
    const selectHeading = getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(selectHeading).toBeInTheDocument();
  });
  test('se página mostra a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    const { getByAltText } = render(<NotFound />);
    const selectAlt = getByAltText(
      'Pikachu crying because the page requested was not found'
    );
    const selectUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'
    expect(selectAlt.src).toBe(selectUrl);
  });
});
