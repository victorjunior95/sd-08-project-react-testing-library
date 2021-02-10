import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('tests the component App.js', () => {
  it('contains info about Pokédex in the page', () => {
    // const { getAllByRole } = renderWithRouter(<About />);
    // const paragraphs = getAllByRole('paragraph', {

    // });
  });

  it('contains a Heading with title About Pokédex in the page', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutPokedex = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutPokedex).toBeInTheDocument();
  });
});
