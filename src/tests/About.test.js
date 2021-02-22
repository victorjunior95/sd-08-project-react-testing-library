import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

it('Check if pockedex infor exist in the document', () => {
  const { getByRole } = renderWithRouter(<About />);
	const aboutAll = getByRole('heading', { level: 2 });
	expect(aboutAll).toBeInTheDocument();
	expect(aboutAll).toHaveTextContent('About Pokédex');
});

it('Check if image of pokemon to be in the screnn', () => {
	const pockedexImg = "https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png";
	const { getByRole } = renderWithRouter(<About />);
	const img = getByRole('img', { name: /pokédex/i });
	expect(img).toBeInTheDocument();
	expect(img.src).toBe(pockedexImg);
});
