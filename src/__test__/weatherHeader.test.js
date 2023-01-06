import { render, screen, fireEvent } from "@testing-library/react";

import WeatherHeader from "../components/weatherHeader";

it("Buscar button", () => {
  render(<WeatherHeader />);

  const cityInput = screen.getByRole("textbox");
  const buscar = screen.getByRole("button", { name: /Buscar/i });
  const borrar = screen.getByRole("button", { name: /Borrar/i });

  fireEvent.click(buscar);
  expect(cityInput).toHaveTextContent();

  fireEvent.click(borrar);
});
