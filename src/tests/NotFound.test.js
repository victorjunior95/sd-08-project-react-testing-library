import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Requisito 4, NotFound.js', () => {
  test('There should be a heading h2', () => {
    const { getByRole } = render(<NotFound />);
    const textNotFound = getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(textNotFound).toBeInTheDocument();
  });
  test('The image src should be "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { getByAltText } = render(<NotFound />);
    const alt = 'Pikachu crying because the page requested was not found';
    const image = getByAltText(alt);
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
