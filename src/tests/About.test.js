import React from 'react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('testing the <About.js /> component', () => {
  test('If the page contains information about Pokédex.', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
  });
  // expect(screen.toHaveTextContent('This application simulates a Pokédex')).toBeInTheDocument();
  // });

  test('If the page contains an h2 heading with the text About Pokédex.', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('heading')).toHaveTextContent(/about pokédex/i);
  });

  test(`If the page contains two paragraphs with text about Pokédex.
  `, () => {
    const { container } = renderWithRouter(<About />);
    expect(container.querySelectorAll('p').length.toString()).toMatch('2');
  });

  test(`If the page contains the following image of a Pokédex: 
      https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.`, () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('img').src).toMatch('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
