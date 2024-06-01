import { describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { App } from "antd";
import Home from "./Home";

describe("Home", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App>
          <Home />
        </App>
      </BrowserRouter>,
    );
  });
  test("Содержит заголовок", () => {
    const homePageTitle = screen.getByTestId("home_page_title");
    expect(homePageTitle).toBeInTheDocument();
    expect(homePageTitle).not.toBe("");
  });
});
