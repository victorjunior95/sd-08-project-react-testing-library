import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('test the notFound Page', () => {
  test('test whether a level 2 header tag exists', () => {
    const { getByRole } = render(<NotFound />);
    const header = getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji' });
    expect(header).toBeInTheDocument();
  });
  it('tests if contains a pikachu crying image', () => {
    const { getByAltText } = render(<NotFound />);
    const altImage = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(altImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
