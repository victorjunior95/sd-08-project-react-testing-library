import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const SEVEN = 7;
describe('Pagina inicial', () => {
  it('h2', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2Heading = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(h2Heading).toBeInTheDocument();
  });
  it('É exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const buttonNext = getByText(/Próximo pokémon/i);
      userEvent.click(buttonNext);
      const charmander = getByText(/charmander/i);
      expect(charmander).toBeInTheDocument();
      userEvent.click(buttonNext);
      // const caterpie = getByText(/Caterpie/i);
      // expect(caterpie).toBeInTheDocument();
      userEvent.click(buttonNext);
      userEvent.click(buttonNext);
      userEvent.click(buttonNext);
      userEvent.click(buttonNext);
      userEvent.click(buttonNext);
      userEvent.click(buttonNext);
      userEvent.click(buttonNext);
      const pikachu = getByText(/Pikachu/i);
      expect(pikachu).toBeInTheDocument();
    });
  it('É exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.',
    () => {
      const { getByText, getAllByText } = renderWithRouter(<App />);
      const buttonNext = getByText(/Psychic/i);
      userEvent.click(buttonNext);

      const psychicType = getAllByText(/Psychic/i);
      expect(psychicType[0]).toBeInTheDocument();
    });
  it('A Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonNext = getByText(/All/i);
    userEvent.click(buttonNext);

    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
  it('É criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonID = getAllByTestId(/pokemon-type-button/i);
    expect(buttonID.length).toBe(SEVEN);
  });
});
