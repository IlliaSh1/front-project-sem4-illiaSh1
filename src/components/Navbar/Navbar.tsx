import { useContext, useState } from "react";

import {
  HOME_ROUTE,
  BOOKS_ROUTE,
  FAVORITE_BOOKS_ROUTE,
  LOGIN_ROUTE,
  FEEDBACK_ROUTE,
  USERS_ROUTE,
  PDF_ROUTE,
  UNIVERSITIES_DYNAMIC_PAGINATION,
} from "../../app/routing/config";
import AuthContext from "../../context/authContext";

import Icon from "@ant-design/icons";

import styled from "styled-components";
import { LinkStyle } from "../Link";
import { ButtonStyle } from "../Button/Button.styles";
import { Link } from "react-router-dom";
import MoonIcon from "../SvgIcons/moonIcon";
import SunIcon from "../SvgIcons/sunIcon";
import HomeIcon from "../SvgIcons/homeIcon";
import ListStyle from "../List/List.styles";

interface StyledProps {
  height?: string;
}

export const NavbarStyle = styled.nav<StyledProps>`
  height: ${({ height }) => (height ? height : "auto")};
  display: flex;
  align-items: center;
`;

const MenuLink = ({ to, content, noStyle }: { to: string; content: any; noStyle?: boolean }) => {
  if (noStyle) {
    return (
      <Link className="header__menu-link" to={to}>
        {content}
      </Link>
    );
  }

  return (
    <LinkStyle className="header__menu-link" to={to}>
      {content}
    </LinkStyle>
  );
};

const MenuItem = ({ isRendered = true, content }: { isRendered?: boolean; content: any }) => {
  return <>{isRendered ? <li className="header__menu-item">{content}</li> : <></>}</>;
};

type ITheme = "dark" | "light";
function instanceofITheme(str: string): str is ITheme {
  return str === "dark" || str === "light";
}

function Navbar() {
  const [currentTheme, setCurrentTheme] = useState<ITheme>(
    (function initTheme(): ITheme {
      const theme = localStorage.getItem("theme");
      if (theme === null || !instanceofITheme(theme)) return "light";

      document.documentElement.setAttribute("data-theme", theme);
      return theme;
    })(),
  );

  const changeTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setCurrentTheme(newTheme);
  };

  const { user } = useContext(AuthContext);
  const { isAuth } = useContext(AuthContext);

  const menuItems = [
    {
      content: (
        <MenuLink
          to={HOME_ROUTE}
          noStyle
          content={
            <ButtonStyle
              shape="circle"
              className="button--theme_icon"
              icon={<Icon component={HomeIcon} alt="На главную" />}
              data-testid="home_page_button"
            />
          }
        />
      ),
    },
    {
      content: <MenuLink to={BOOKS_ROUTE} content="Книги" />,
    },
    {
      isRendered: isAuth,
      content: <MenuLink to={FAVORITE_BOOKS_ROUTE} content="Избранные книги" />,
    },
    {
      isRendered: isAuth && user.is_admin,
      content: <MenuLink to={USERS_ROUTE} content="Пользователи" />,
    },
    {
      content: <MenuLink to={PDF_ROUTE} content="PDF" />,
    },
    {
      content: <MenuLink to={UNIVERSITIES_DYNAMIC_PAGINATION} content="Динамическая пагинация" />,
    },
    {
      content: (
        <ButtonStyle
          onClick={changeTheme}
          shape="circle"
          className="button--theme_icon"
          icon={
            currentTheme === "light" ? (
              <Icon component={SunIcon} alt="Сменить тему" data-testid="change_theme" />
            ) : (
              <Icon component={MoonIcon} />
            )
          }
        />
      ),
    },
    {
      content: (
        <>
          {!isAuth ? (
            <MenuLink
              to={LOGIN_ROUTE}
              noStyle
              content={
                <ButtonStyle type="primary" data-testid="login_link_button">
                  Войти
                </ButtonStyle>
              }
            />
          ) : (
            <MenuLink
              to={LOGIN_ROUTE}
              noStyle
              content={
                <ButtonStyle type="link" data-testid="login_link_button">
                  {user.username}
                </ButtonStyle>
              }
            />
          )}
        </>
      ),
    },
    {
      content: (
        <>
          {isAuth ? (
            <MenuLink
              to={FEEDBACK_ROUTE}
              noStyle
              content={
                <ButtonStyle type="primary" data-testid="feedback_link_button">
                  Оставить отзыв
                </ButtonStyle>
              }
            />
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  return (
    <NavbarStyle className="header__menu">
      <ListStyle className="header__menu-list" flexDirection="row" gap="20px" alignItems="baseline">
        {menuItems.map((menuItem, index) => {
          return <MenuItem isRendered={menuItem.isRendered} content={menuItem.content} key={index} />;
        })}
      </ListStyle>
    </NavbarStyle>
  );
}

export default Navbar;
