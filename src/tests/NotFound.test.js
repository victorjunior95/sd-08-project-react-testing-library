import { render } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';

describe('NotFound component testing', () => {
  test('Checks whether to render an heading with Page requested not found', () => {
    const { getByRole } = render(<NotFound />);
    const pageText = getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(pageText).toBeInTheDocument();
  });
  test('Check wether to render an specifc image', () => {
    const { getByAltText } = render(<NotFound />);
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImage = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFoundImage.src).toBe(imgURL);
  });
});
