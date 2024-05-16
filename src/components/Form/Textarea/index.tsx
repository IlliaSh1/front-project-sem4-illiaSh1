import styled from "styled-components";

interface StyledProps {}

const TextareaStyle = styled.textarea<StyledProps>`
  padding: 5px;

  width: 100%;

  color: var(--text-color);

  background-color: var(--bg-color);

  border: 2px solid var(--text-inactive-color);
  border-radius: 10px;

  margin: 5px 0;

  resize: none;

  &:focus-visible {
    outline: 4px solid var(--primary-color);

    outline-offset: 1px;
    transition:
      outline-offset 0s,
      outline 0s;
  }
`;

export default TextareaStyle;
