import styled from "styled-components";

import { Button } from "antd";

export const ButtonStyle = styled(Button)`
  & svg {
    width: 1em;
    height: 1em;
  }

  /* Default btn */
  &.ant-btn-default {
    color: var(--text-color);
    background-color: var(--bg-color);
    border-color: var(--text-color);
  }
  &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }

  &.ant-btn-default:disabled {
    color: var(--text-inactive-color);
    background-color: var(--bg-inactive-color);
    border-color: var(--border-inactive-color);
  }

  &.ant-btn-default.ant-btn-dangerous {
    color: var(--text-danger-color);
    border-color: var(--text-danger-color);
  }
  &.ant-btn-default.ant-btn-dangerous:not(:disabled):not(.ant-btn-disabled):hover {
    color: var(--text-danger-color);
    border-color: var(--text-danger-color);
  }

  /* Btn type='primary' */
  &.ant-btn-primary {
    color: var(--bg-color);

    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }

  &.ant-btn-primary:not(:disabled):not(.ant-btn-disabled):hover {
    color: var(--bg-color);
    background-color: var(--primary-active-color);
    border-color: var(--primary-active-color);
  }

  /* Btn-icon */
  &.ant-btn-icon-only {
    padding: 0;

    background-color: transparent;

    border: none;
    box-shadow: none;
  }
  &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
    color: var(--primary-color);
    background-color: transparent;
  }

  /* Btn-link */
  &.ant-btn-link {
    color: var(--primary-color);
  }

  &.ant-btn-link:not(:disabled):not(.ant-btn-disabled):hover {
    color: var(--primary-active-color);
  }
`;

export const ButtonIconStyle = styled(ButtonStyle)`
  &.ant-btn-default {
    padding: 0;

    background-color: transparent;

    border: none;
    box-shadow: none;
  }
  &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
    color: var(--primary-color);
    background-color: transparent;
  }
`;
