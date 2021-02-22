import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Testando se o comp NotFound é renderizado ao ir a uma rota n especificada', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={ ['/anything'] }>
      <NotFound />
    </MemoryRouter>,
  );

  const heading = getByRole('heading', {
    level: 2,
    name: 'Page requested not found Crying emoji',
  });

  expect(heading).toBeInTheDocument();
});

test('Testando se a imagem da página NotFound é renderizada', () => {
  const { getByAltText } = render(
    <MemoryRouter initialEntries={ ['/anything'] }>
      <NotFound />
    </MemoryRouter>,
  );

  const image = getByAltText('Pikachu crying because the page requested was not found');

  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
