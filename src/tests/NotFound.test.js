import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test the <NotFound.js /> component', () => {
  it('should have a h2 heading with the text Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const headingName = 'Page requested not found Crying emoji';
    expect(getByRole('heading', { name: headingName })).toBeInTheDocument();
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('should have a specific image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const altText = 'Pikachu crying because the page requested was not found';
    const pikachuCrying = getByAltText(altText);
    expect(pikachuCrying).toBeInTheDocument();
    expect(pikachuCrying).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
