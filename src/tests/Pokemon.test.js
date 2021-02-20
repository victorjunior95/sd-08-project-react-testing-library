import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

export default
describe('Teste o componente `<Pokemon.js />', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const xablau = getByTestId('pokemon-name');

    expect(xablau).toHaveTextContent('Pikachu');
  });
  it('O nome do tipo do Pokémon deve ser mostrado na tela;', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const xablau2 = getByTestId('pokemonType');

    expect(xablau2).toHaveTextContent('Electric');
  });
  it('O peso médio do pokémon deve ser exibido', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const xablau3 = getByTestId('pokemon-weight');

    expect(xablau3).toHaveTextContent('Average weight: 6.0 kg');
  });
  it('A imagem do Pokémon deve ser exibida.', () => {
    const URL = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    const { getByAltText } = renderWithRouter(<App />);
    const picutePoke = getByAltText('Pikachu sprite');
    expect(picutePoke).toBeInTheDocument();
    expect(picutePoke.src).toContain(URL);
  });
  it('Testa Link de Detalhes', () => {
    const { getByText } = renderWithRouter(<App />);

    const details = getByText(/More details/i);

    expect(details).toBeInTheDocument();
  });
  it('Testa URL More Details', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const details = getByText(/More details/i);

    fireEvent.click(details);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    })).toBeInTheDocument();
  });
  it('Teste se há estrela de favoritado.', () => {
    const { getByText, getByLabelText, getByAltText, history } = renderWithRouter(
      <App />,
    );
    const buttonDetails = getByText(/More details/i);
    const buttonHome = getByText(/Home/);

    fireEvent.click(buttonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const markFavorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(markFavorite);
    fireEvent.click(buttonHome);
    expect(getByAltText('Pikachu is marked as favorite')).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
  });
});
