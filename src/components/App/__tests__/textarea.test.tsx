import { fireEvent, render, screen } from "@testing-library/react";
import App from "..";

jest.mock("../../utils/tokenContract/getFunctions", () => ({
  getTokenContract() {
    return "mock contract";
  },
  getTokenName() {
    return "mock name";
  },
  getTokenSymbol() {
    return "mock symbol";
  },
  getUserBalance() {
    return "mock balance";
  },
}));

test("textarea", () => {
  render(<App />);
  const textarea = screen.getByPlaceholderText("Insert address");
  fireEvent.change(textarea, {
    target: { value: "0x1DB4AFfFa9235478Ff5d5ec90F521E65ec2dF685" },
  });
  expect(
    screen.getByDisplayValue("0x1DB4AFfFa9235478Ff5d5ec90F521E65ec2dF685")
  ).toBeInTheDocument();
});
