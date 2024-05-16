import { useContext, useState } from "react";

import {
  HOME_ROUTE,
  BOOKS_ROUTE,
  FAVORITE_BOOKS_ROUTE,
  LOGIN_ROUTE,
  FEEDBACK_ROUTE,
  USERS_ROUTE,
  PDF_ROUTE,
} from "../../app/routing/config";
import AuthContext from "../../context/authContext";

import Icon from "@ant-design/icons";

import styled from "styled-components";
import { ListStyle } from "../List";
import { LinkStyle } from "../Link";
import { ButtonStyle } from "../Button";
import { Link } from "react-router-dom";
import MoonIcon from "../SvgIcons/moonIcon";
import SunIcon from "../SvgIcons/sunIcon";
import HomeIcon from "../SvgIcons/homeIcon";

interface StyledProps {
  height?: string;
}

export const NavbarStyle = styled.nav<StyledProps>`
  height: ${({ height }) => (height ? height : "auto")};
  display: flex;
  align-items: center;
`;

const MenuLink = ({ to, content, noStyle }: { to: string; content: any; noStyle?: boolean }) => {
  if (noStyle)
    return (
      <Link className="header__menu-link" to={to}>
        {content}
      </Link>
    );

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
      let theme = localStorage.getItem("theme");
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

  let { user } = useContext(AuthContext);
  let { isAuth } = useContext(AuthContext);

  let menuItems = [
    {
      content: (
        <MenuLink
          to={HOME_ROUTE}
          noStyle
          content={<ButtonStyle shape="circle" className="button--theme_icon" icon={<Icon component={HomeIcon} />} />}
        />
      ),
    },
    {
      content: <MenuLink to={BOOKS_ROUTE} content="Книги" />,
    },
    {
      content: <MenuLink to={PDF_ROUTE} content="PDF" />,
    },
    {
      isRendered: isAuth && user.is_admin,
      content: <MenuLink to={USERS_ROUTE} content="Пользователи" />,
    },
    {
      isRendered: isAuth,
      content: <MenuLink to={FAVORITE_BOOKS_ROUTE} content="Избранные книги" />,
    },
    {
      content: (
        <ButtonStyle
          onClick={changeTheme}
          shape="circle"
          className="button--theme_icon"
          icon={currentTheme === "light" ? <Icon component={SunIcon} /> : <Icon component={MoonIcon} />}
        />
      ),
    },
    {
      content: (
        <>
          {!isAuth ? (
            <MenuLink to={LOGIN_ROUTE} noStyle content={<ButtonStyle type="primary">Войти</ButtonStyle>} />
          ) : (
            <MenuLink to={LOGIN_ROUTE} noStyle content={<ButtonStyle type="link">{user.username}</ButtonStyle>} />
          )}
        </>
      ),
    },
    {
      content: (
        <>
          {isAuth ? (
            <MenuLink to={FEEDBACK_ROUTE} noStyle content={<ButtonStyle type="primary">Оставить отзыв</ButtonStyle>} />
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
