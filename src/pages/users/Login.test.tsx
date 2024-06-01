import { describe } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./Login1";
import { AuthProvider } from "../../context/authContext";
import { ApiProvider } from "../../context/apiContext";
import Navbar from "../../components/Navbar/Navbar";

const queryClient = new QueryClient();

async function delay(milliseconds: number) {
  return await new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

describe("Login", () => {
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
          <AuthProvider>
            <ApiProvider>
              <Navbar />
              <Login />
            </ApiProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>,
    );
  });

  test("отображает поля формы", async () => {
    const inputName = screen.getByTestId("login_username");
    const inputPassword = screen.getByTestId("login_password");
    expect(inputName).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });
  test("отображает кнопку войти", async () => {
    const loginButton = screen.getByTestId("login_button");
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.textContent).toBe("Войти");
  });
  test("заходит в аккаунт", async () => {
    const inputName: HTMLInputElement = screen.getByTestId("login_username");
    const inputPassword: HTMLInputElement = screen.getByTestId("login_password");

    // Заполняем поля формы
    fireEvent.change(inputName, { target: { value: "admin" } });
    fireEvent.change(inputPassword, { target: { value: "admin" } });

    expect(inputName.value).toBe("admin");
    expect(inputPassword.value).toBe("admin");

    // Нажимаем на кнопку войти
    const loginButton = screen.getByTestId("login_button");
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);

    // Ожидаем ответа
    await screen.findByTestId("feedback_link_button");
    // Перенаправляет на страницу
    expect(window.location.pathname).toBe("/success");

    const loginLinkButton = screen.getByTestId("login_link_button");
    expect(loginLinkButton).toBeInTheDocument();
    expect(loginLinkButton.textContent).toBe("admin");
  });
  //   test("отображает поля формы", async () => {
  //     const inputName = screen.getByTestId("login_username");
  //     const inputPassword = screen.getByTestId("login_password");
  //     expect(inputName).toBeInTheDocument();
  //     expect(inputPassword).toBeInTheDocument();
  //   });
});
