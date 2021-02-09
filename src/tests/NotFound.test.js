import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('tests if Not Found page has the text and the image', () => {
  const { getByRole, getAllByRole } = render(
    <MemoryRouter initialEntries={ ['/digimons'] }>
      <App />
    </MemoryRouter>,
  );
  const notFoundText = getByRole('heading', { level: 2 });
  expect(notFoundText).toHaveTextContent('Page requested not found 😭');
  const notFoundImage = getAllByRole('img');
  expect(notFoundImage[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
