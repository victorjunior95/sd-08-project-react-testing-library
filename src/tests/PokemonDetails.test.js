import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('pokemonDetails.js test', () => {
  it('Teste se as informações do Pokémon selecionado são mostradas na tela.', () => {
    const { getByText, getByRole, container } = renderWithRouter(
      <App />,
    );
    const detailsLink = getByRole('link', { name: /details/i });
    userEvent.click(detailsLink);

    const nameDetails = getByText(/pikachu details/i);
    expect(nameDetails).toBeInTheDocument();

    expect(detailsLink).not.toBeInTheDocument();

    const summary = getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();

    const paragraph = container.getElementsByTagName('p');
    expect(paragraph[3].textContent).toBe(
      'This intelligent Pokémon roasts hard berries with '
      + 'electricity to make them tender enough to eat.',
    );
  });
});
