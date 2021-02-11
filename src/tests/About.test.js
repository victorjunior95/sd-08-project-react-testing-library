import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Req 2 - About Test', () => {
  test('1 - Shows Pokédex info', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const btn = getByText('About');

    fireEvent.click(btn);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('2 - Shows h2 with About Pokédex', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const btn = getByText('About');

    fireEvent.click(btn);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2.textContent).toBe('About Pokédex');
  });

  test('3 - Shows 2 paragraphs about pokédex', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const btn = getByText('About');

    fireEvent.click(btn);
    const p1 = getByText(/This/i);
    const p2 = getByText(/One/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('4 - Shows Pokédex image', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const btn = getByText('About');

    fireEvent.click(btn);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src','https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
