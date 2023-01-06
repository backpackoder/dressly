import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App, { currentLink } from "../App";

const test1 = rest.get(currentLink, (req, res, ctx) => {
  // if (req.name !== "guadalajara") {
  //   return res(ctx.status(400), ctx.json({ errorMessage: "error 400" }));
  // }
  return res(ctx.json({ name: "guadalajara" }));
});

const server = new setupServer(test1);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("a ver", async () => {
  render(<App />);

  const cityTest = await screen.findByText("guadalajara");
  expect(cityTest).toBeInTheDocument();
});
