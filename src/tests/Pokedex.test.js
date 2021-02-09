import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Pokedex.js', () => {
  test('if contain a h2 heading', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('if clicks on Proximo Pokemon change the card', () => {
    renderWithRouter(<App />);

    const Pikachu = screen.getByText(/pikachu/i);
    expect(Pikachu).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextBtn);

    const Charmander = screen.getByText(/Charmander/i);
    expect(Charmander).toBeInTheDocument();

    userEvent.click(nextBtn);
    userEvent.click(nextBtn);

    const Ekans = screen.getByText(/Ekans/i);
    expect(Ekans).toBeInTheDocument();

    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);

    const Dragonair = screen.getByText(/Dragonair/i);
    expect(Dragonair).toBeInTheDocument();

    userEvent.click(nextBtn);
    expect(Pikachu).toBeInTheDocument();
  });

  test('if only one card is displayed', () => {
    renderWithRouter(<App />);

    const imgCard = screen.getByRole('img');
    expect(imgCard.src).toContain('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgCard.alt).not.toContain('Charmander');
  });
});
