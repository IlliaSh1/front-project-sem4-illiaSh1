import { Card } from "antd";
import styled from "styled-components";

const CardStyle = styled(Card)`
  &.ant-card .ant-card-head,
  &.ant-card .ant-card-body {
    color: var(--text-color);
    background-color: var(--bg-color);
  }

  &.ant-card-bordered {
    border-color: var(--border-inactive-color);
  }
`;
export default CardStyle;
