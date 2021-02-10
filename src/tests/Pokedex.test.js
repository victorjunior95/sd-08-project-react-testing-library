import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import App from '../App';

it('test if the page has no Favorite Pokemon', () => {
  const { getByRole, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const headingPokedex = getByRole('heading', {
    level: 2,
    name: /encountered pokémons/i,
  });
  expect(headingPokedex).toBeInTheDocument();

  const foundPikachu = getByText('Pikachu');
  expect(foundPikachu).toBeInTheDocument();
  // expect(foundPokemonName.value).toBe('Pikachu');

  const buttonAll = getByRole('button', {
    name: /all/i,
  });
  const buttonPokemon = getByRole('button', {
    name: /Próximo pokémon/i,
  });

  expect(buttonAll).toBeInTheDocument();
  expect(buttonPokemon).toBeInTheDocument();
  // expect(buttonPokemon).toHaveValue(`Próximo pokémon`);
  // Não sei por que não funciona
  userEvent.click(buttonAll);
  userEvent.click(buttonPokemon);
  const foundCharmander = getByText('Charmander');
  expect(foundCharmander).toBeInTheDocument();

  userEvent.click(buttonPokemon);
  const foundCartepie = getByText('Caterpie');
  expect(foundCartepie).toBeInTheDocument();

  userEvent.click(buttonPokemon);
  const foundEkans = getByText('Ekans');
  expect(foundEkans).toBeInTheDocument();

  userEvent.click(buttonPokemon);
  const foundAlakazam = getByText('Alakazam');
  expect(foundAlakazam).toBeInTheDocument();

  userEvent.click(buttonPokemon);
  const foundMew = getByText('Mew');
  expect(foundMew).toBeInTheDocument();

  userEvent.click(buttonPokemon);
  const foundRap = getByText('Rapidash');
  expect(foundRap).toBeInTheDocument();

  userEvent.click(buttonPokemon);
  const foundSnolax = getByText('Snorlax');
  expect(foundSnolax).toBeInTheDocument();

  userEvent.click(buttonPokemon);
  const foundDrag = getByText('Dragonair');
  expect(foundDrag).toBeInTheDocument();

  userEvent.click(buttonPokemon);
  const firstPoke = getByText('Pikachu');
  expect(firstPoke).toBeInTheDocument();
});

it('test all buttons', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const buttonAll = getByRole('button', {
    name: /all/i,
  });
  expect(buttonAll).toBeInTheDocument();

  const buttonEle = getByRole('button', {
    name: /electric/i,
  });
  expect(buttonEle).toBeInTheDocument();

  const buttonFire = getByRole('button', {
    name: /fire/i,
  });
  expect(buttonFire).toBeInTheDocument();

  const buttonBug = getByRole('button', {
    name: /bug/i,
  });
  expect(buttonBug).toBeInTheDocument();

  const buttonPoison = getByRole('button', {
    name: /poison/i,
  });
  expect(buttonPoison).toBeInTheDocument();

  const buttonPsy = getByRole('button', {
    name: /psychic/i,
  });
  expect(buttonPsy).toBeInTheDocument();

  const buttonNormal = getByRole('button', {
    name: /normal/i,
  });
  expect(buttonNormal).toBeInTheDocument();

  const buttonDragon = getByRole('button', {
    name: /dragon/i,
  });
  expect(buttonDragon).toBeInTheDocument();
});

it('testing click and next pokemon', () => {
  const { getByRole, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const buttonNext = getByRole('button', {
    name: /Próximo pokémon/i,
  });

  const buttonEle = getByRole('button', {
    name: /electric/i,
  });
  userEvent.click(buttonEle);
  const foundPikachu = getByText('Pikachu');
  expect(foundPikachu).toBeInTheDocument();
  userEvent.click(buttonNext);
  expect(foundPikachu).toBeInTheDocument();

  const buttonFire = getByRole('button', {
    name: /fire/i,
  });
  userEvent.click(buttonFire);
  const foundCharmander = getByText('Charmander');
  expect(foundCharmander).toBeInTheDocument();
  userEvent.click(buttonNext);
  const foundRap = getByText('Rapidash');
  expect(foundRap).toBeInTheDocument();

  const buttonBug = getByRole('button', {
    name: /bug/i,
  });
  userEvent.click(buttonBug);
  const foundCartepie = getByText('Caterpie');
  expect(foundCartepie).toBeInTheDocument();

  const buttonPoison = getByRole('button', {
    name: /poison/i,
  });
  userEvent.click(buttonPoison);
  const foundEkans = getByText('Ekans');
  expect(foundEkans).toBeInTheDocument();

  const buttonPsy = getByRole('button', {
    name: /psychic/i,
  });
  userEvent.click(buttonPsy);
  const foundAlakazam = getByText('Alakazam');
  expect(foundAlakazam).toBeInTheDocument();
  userEvent.click(buttonNext);
  const foundMew = getByText('Mew');
  expect(foundMew).toBeInTheDocument();

  const buttonNormal = getByRole('button', {
    name: /normal/i,
  });
  userEvent.click(buttonNormal);
  const foundSnolax = getByText('Snorlax');
  expect(foundSnolax).toBeInTheDocument();

  const buttonDragon = getByRole('button', {
    name: /dragon/i,
  });
  userEvent.click(buttonDragon);
  const foundDrag = getByText('Dragonair');
  expect(foundDrag).toBeInTheDocument();
});

it('test if filter exists', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const elements = getAllByTestId('pokemon-type-button');
  const numberOfPokemonsType = 7;
  expect(elements.length).toBe(numberOfPokemonsType);
});
