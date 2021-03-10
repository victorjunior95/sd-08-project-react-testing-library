import React from "react";
import NotFound from "../components/NotFound";
import { render, screen } from "@testing-library/react";

test('the page contains a heading with the text Page requested not found 😭', () => {
render(<NotFound />)
const notFoundHeading = screen.getByRole('heading', {
	level: 2,
	name: /Page requested not found Crying emoji/i,
});
expect(notFoundHeading).toBeInTheDocument();
});

test('the page show the not found image', () => {
	render(<NotFound />);
	const notFoundImage = screen.getByAltText('Pikachu crying because the page requested was not found').src;
	expect(notFoundImage).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif')

});