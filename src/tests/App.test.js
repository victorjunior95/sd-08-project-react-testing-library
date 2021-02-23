import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Req 01', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Primeira pagina tem o texto `Home`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Home/i)).toBeInTheDocument();
  });

  test('Segunda pagina tem o texto `About`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/About/i)).toBeInTheDocument();
  });

  test('Terceira pagina tem o texto `Favorite Pokémons`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  test('Redireciona para `/about`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });
});
