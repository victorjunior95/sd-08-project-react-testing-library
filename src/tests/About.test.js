import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('tests if the page About contains', () => {
  it('Pokédex information', () => {
    const { getByText } = render(<About />);
    const aboutAll = getByText(/This application simulates a Pokédex/i);

    expect(aboutAll).toBeInTheDocument();
  });

  it('heading h2 with text "About Pokédex"', () => {
    render(<About />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/About Pokédex/i);
  });

  // TODO: I don't know how to test this
  // it('two paragraphs with text about Pokédex', () => {
  //   render(<About />);

  //   expect(screen.getAllByLabelText())
  // });

  it('an specific image of a Pokédex', () => {
    render(<About />);

    expect(screen.querySelector('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.image.src')).toBeTruthy();

    // expect(images.getElement(0).props.src).toEqual('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.image.src');
  });
});
