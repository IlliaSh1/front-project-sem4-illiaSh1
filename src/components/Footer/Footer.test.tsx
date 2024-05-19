import { describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });
  test("Содержит заголовок", () => {
    const footerCredits = screen.getByTestId("footer_credits");
    expect(footerCredits).toBeInTheDocument();
    expect(footerCredits).not.toBe("");
  });
});
