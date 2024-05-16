import styled from "styled-components";

interface StyledProps {}

const InputErrorStyle = styled.div<StyledProps>`
  min-height: 1em;
  line-height: 1;
  color: var(--text-danger-color);
`;

export default InputErrorStyle;
