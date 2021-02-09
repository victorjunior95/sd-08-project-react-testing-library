import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../components/About';
// import renderWhitRouter from './renderWithRouter';

describe('About.js ', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutText).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const firtParagraphText = screen.getByText(
      /This application simulates a Pokédex, a digital encliclopedia containing all*/i,
    );
    expect(firtParagraphText).toBeInTheDocument();
    const secundParagraphText = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );
    expect(secundParagraphText).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);
    const aboutImg = screen.getByRole('img');
    // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    expect(aboutImg).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(aboutImg).toHaveAttribute('alt', 'Pokédex');
    expect(aboutImg).toBeInTheDocument();
  });
});
