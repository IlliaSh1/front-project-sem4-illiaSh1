import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { App } from "antd";
import Books from "../../../pages/books/Books";
import { AuthProvider } from "../../../context/authContext";
import { ApiProvider } from "../../../context/apiContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

describe("Navbar", () => {
  beforeAll(() => {
    // correct behavior of matchMedia
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App>
            <AuthProvider>
              <ApiProvider>
                <Books />
              </ApiProvider>
            </AuthProvider>
          </App>
        </BrowserRouter>
      </QueryClientProvider>,
    );
  });

  test("отображает книги", async () => {
    const booksEls = await screen.findAllByTestId("book-name");
    expect(booksEls[0]).toBeInTheDocument();
  });
  test("книга содержит не пустую ссылку", async () => {
    const booksEls: HTMLLinkElement[] = await screen.findAllByTestId("book-name");
    const bookEl: HTMLLinkElement = booksEls[0];
    expect(bookEl).toHaveAttribute("href");
    expect(bookEl.href).not.toBe("");
  });
  test("книга содержит не пустую ссылку", async () => {
    const booksEls: HTMLLinkElement[] = await screen.findAllByTestId("book-name");
    const bookEl: HTMLLinkElement = booksEls[0];
    expect(bookEl).toHaveAttribute("href");
    expect(bookEl.href).not.toBe("");
  });
});
