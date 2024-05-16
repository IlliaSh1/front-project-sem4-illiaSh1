import styled from "styled-components";

interface StyledProps {
  height?: string;
  flexDirection?: string;
  alignItems?: string;

  gap?: string;
}

export const ListStyle = styled.ul<StyledProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : "column")};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "")};
  gap: ${({ gap }) => (gap ? gap : "0px")};

  height: ${({ height }) => (height ? height : "auto")};

  padding: 0;
  margin: 0;

  list-style-type: none;
`;
