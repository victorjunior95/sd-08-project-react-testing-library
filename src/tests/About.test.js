import React from 'react';
import { render, screen } from '@testing-library/react'

import About from '../components/About';


test('renders a page with a pokemon details', () => {
    render(<About />);

    const pageTitle = screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/i,
    });
    const paragraphs = screen.getAllByRole('article');
    expect(pageTitle).toBeInTheDocument();
    ;
    expect(paragraphs.length).toBe(2);
});
