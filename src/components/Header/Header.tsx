import styled from "styled-components";
import { WrapperStyle } from "../Wrapper/Wrapper";
import Navbar from "../Navbar";
import { HOME_ROUTE } from "../../app/routing/config";
import { LinkStyle } from "../Link";

// interface StyledProps {
//   // height?: string;
//   // flexDirection?: string;
//   // gap?: string;
// }

// const HeaderStyle = styled.header<StyledProps>`
const HeaderStyle = styled.header`
  z-index: 10;

  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px 0;

  background-color: var(--bg-color);

  border-bottom: 2px solid var(--primary-color);
`;

function Header() {
  return (
    <HeaderStyle className="header">
      <WrapperStyle
        className="wrapper header__content"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <div className="">
          <LinkStyle to={HOME_ROUTE}>
            Книги по <br /> специальностям
          </LinkStyle>
        </div>
        <Navbar />
      </WrapperStyle>
    </HeaderStyle>
  );
}

export default Header;
