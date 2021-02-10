import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { NotFound } from '../components';

describe('Testing component NotFound.js', () => {
  test('The page must contain the h2 heading `Page requested not found` ', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });

  test('The page must contain the specified image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const pikachuCryingImage = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    const pikachuCryinkImageLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(pikachuCryingImage.src).toBe(pikachuCryinkImageLink);
  });
});
