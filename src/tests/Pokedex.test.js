import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 5 - Pokedex.test', () => {
  test('Teste feliz', () => {
    const { history } = renderWithRouter(<App />);

    const headingTextLvlTwoHome = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(headingTextLvlTwoHome).toBeInTheDocument();

    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(buttonNext);

    const charmanderText = screen.getByText(/charmander/i);
    expect(charmanderText).toBeInTheDocument();

    userEvent.click(buttonNext);

    const caterpieText = screen.getByText(/caterpie/i);
    expect(caterpieText).toBeInTheDocument();

    userEvent.click(buttonNext);

    const ekansText = screen.getByText(/ekans/i);
    expect(ekansText).toBeInTheDocument();

    userEvent.click(buttonNext);

    const alakazamText = screen.getByText(/alakazam/i);
    expect(alakazamText).toBeInTheDocument();

    userEvent.click(buttonNext);

    const mewText = screen.getByText(/mew/i);
    expect(mewText).toBeInTheDocument();

    userEvent.click(buttonNext);

    const rapidashText = screen.getByText(/rapidash/i);
    expect(rapidashText).toBeInTheDocument();

    userEvent.click(buttonNext);

    const snorlaxText = screen.getByText(/snorlax/i);
    expect(snorlaxText).toBeInTheDocument();

    userEvent.click(buttonNext);

    const dragonairText = screen.getByText(/dragonair/i);
    expect(dragonairText).toBeInTheDocument();

    userEvent.click(buttonNext);

    const pikachuText = screen.getByText(/pikachu/i);
    expect(pikachuText).toBeInTheDocument();

    const quantityPokemons = document.querySelectorAll('.pokemon-overview').length;
    expect(quantityPokemons).toBe(1);

    const button = screen.getAllByTestId('pokemon-type-button')[0];
    expect(button).toBeInTheDocument();

    const buttonTypeFire = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(buttonTypeFire);
    expect(charmanderText).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(rapidashText).toBeInTheDocument();

    const buttonAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(pikachuText).toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(charmanderText).toBeInTheDocument();

    history.replace('/');
    expect(pikachuText).toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(charmanderText).toBeInTheDocument();

    const buttonTypePsychic = screen.getByRole('button', {
      name: /psychic/i,
    });

    const buttonTypeElectric = screen.getByRole('button', {
      name: /electric/i,
    });

    const buttonTypeNormal = screen.getByRole('button', {
      name: /normal/i,
    });

    const buttonTypeBug = screen.getByRole('button', {
      name: /bug/i,
    });

    const buttonTypePoison = screen.getByRole('button', {
      name: /poison/i,
    });

    const buttonTypeDragon = screen.getByRole('button', {
      name: /dragon/i,
    });

    userEvent.click(buttonTypeFire);
    expect(buttonTypeFire).toBeInTheDocument();
    expect(buttonTypePsychic).toBeInTheDocument();
    expect(buttonTypeElectric).toBeInTheDocument();
    expect(buttonTypeNormal).toBeInTheDocument();
    expect(buttonTypeBug).toBeInTheDocument();
    expect(buttonTypePoison).toBeInTheDocument();
    expect(buttonTypeDragon).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonTypeDragon);
    expect(buttonTypeFire).toBeInTheDocument();
    expect(buttonTypePsychic).toBeInTheDocument();
    expect(buttonTypeElectric).toBeInTheDocument();
    expect(buttonTypeNormal).toBeInTheDocument();
    expect(buttonTypeBug).toBeInTheDocument();
    expect(buttonTypePoison).toBeInTheDocument();
    expect(buttonTypeDragon).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
    expect(buttonNext).toBeDisabled();
  });
});
