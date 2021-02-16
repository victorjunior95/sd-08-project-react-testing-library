import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste componente About', () => {
  test('Algumas infos sobre pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const someInfo = getByText(/This application simulates a Pokédex, a digital /i);
    expect(someInfo).toBeInTheDocument();
  });
  test('Confere se existe <h2>', () => {
    renderWithRouter(<About />);

    const h2About = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(h2About).toBeInTheDocument();
  });

  test('Confere se existe dois <p>', () => {
    const { container } = renderWithRouter(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph.length).toBe(2);
  });

  test('Confere se existe img', () => {
    renderWithRouter(<About />);
    const img = screen.getByTestId('img');
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
