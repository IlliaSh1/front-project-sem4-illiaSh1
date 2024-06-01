import styled from "styled-components";

interface ListStyledProps {
  height?: string;
  flexDirection?: string;
  alignItems?: string;
  gap?: string;
}

const ListStyle = styled.ul<ListStyledProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : "column")};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "")};
  gap: ${({ gap }) => (gap ? gap : "0px")};

  height: ${({ height }) => (height ? height : "auto")};

  padding: 0;
  margin: 0;

  list-style-type: none;
`;

export default ListStyle;
