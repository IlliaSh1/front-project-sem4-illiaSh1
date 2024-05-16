import styled from "styled-components";

interface StyledProps {}

const FormStyle = styled.form<StyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  width: 100%;
  max-width: 600px;

  background-color: rgba(var(--primary-color_rgb), 0.15);
  padding: 15px 0;

  border: 1px solid var(--text-color);
  border-radius: 10px;
`;

export default FormStyle;
