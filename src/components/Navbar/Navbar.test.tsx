import { describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import { App } from "antd";
import { AuthProvider } from "../../context/authContext";
import { ApiProvider } from "../../context/apiContext";
import { BOOKS_ROUTE } from "../../app/routing/config";

describe("BookTable", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App>
          <AuthProvider>
            <ApiProvider>
              <Navbar />
            </ApiProvider>
          </AuthProvider>
        </App>
      </BrowserRouter>,
    );
  });
  test("отображает ссылку на главную страницу", () => {
    const homePageLink = screen.getByTestId("home_page_button");
    expect(homePageLink).toBeInTheDocument();
  });

  test("отображает ссылку на страницу с книгами", () => {
    const booksLink = screen.getByText("Книги");
    expect(booksLink).toBeInTheDocument();
  });

  test("перенаправляет на страницу с книгами", () => {
    const booksLink = screen.getByText("Книги");
    expect(booksLink).toBeInTheDocument();
    fireEvent.click(booksLink);
    expect(window.location.pathname).toBe(BOOKS_ROUTE);
  });

  test("изменяет тему", () => {
    const changeThemeButton = screen.getByTestId("change_theme");
    expect(changeThemeButton).toBeInTheDocument();
    fireEvent.click(changeThemeButton);
    document.documentElement.getAttribute("data-theme");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
