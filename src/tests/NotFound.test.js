import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requirement 4, testing NotFound component', () => {
  test('if there is a level 2 heading "Page requested..."', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('if there is a determined image and link', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const img = getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    const webLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toBe(webLink);
  });
});
