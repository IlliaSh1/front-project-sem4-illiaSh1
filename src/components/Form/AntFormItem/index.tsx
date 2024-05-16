import { Form } from "antd";
import styled from "styled-components";

const FormItemStyle = styled(Form.Item)`
  &.ant-form-item {
    color: var(--text-color);
  }
  &.ant-form-item .ant-form-item-label > label {
    color: var(--text-color);
  }
  & .ant-input {
    color: var(--text-color);
    background-color: var(--bg-color);
  }

  & .ant-input-affix-wrapper {
    background-color: var(--bg-color);
  }
  & .ant-input-affix-wrapper .anticon.ant-input-password-icon {
    color: var(--text-color);
  }
`;

export default FormItemStyle;
