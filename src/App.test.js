import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Beanworth website link", () => {
  render(<App />);
  const linkElement = screen.getByText(/continue to our website/i);
  expect(linkElement).toBeInTheDocument();
});
