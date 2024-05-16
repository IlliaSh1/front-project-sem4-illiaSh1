import styled from "styled-components";

interface StyledProps {
  display?: string;
  justifyContent?: string;

  height?: string;

  flexDirection?: string;

  gap?: string;
}

export const WrapperStyle = styled.div<StyledProps>`
  display: ${({ display }) => (display ? display : "block")};
  flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : "column")};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : "flex-start")};
  /* align-items: flex-start; */

  width: 100%;
  max-width: 1440px;

  margin: 0 90px;
`;
