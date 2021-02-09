import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('shows the Not Found page with route /anything', () => {
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

test('page not found show image', () => {
  const { getByAltText } = render(
    <MemoryRouter initialEntries={ ['/anything'] }>
      <NotFound />
    </MemoryRouter>,
  );

  const image = getByAltText('Pikachu crying because the page requested was not found');

  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
