import styled from "styled-components";
import { Table, TableProps } from "antd";

// Define the custom props you want to add to the TableStyle component
interface TableStyleProps extends TableProps<any> {}

export const TableStyle = styled(Table)<TableStyleProps>`
  &.ant-table-wrapper {
  }

  & .ant-table {
    color: var(--text-color);

    border: 1.5px solid var(--text-color);
    background-color: var(--bg-color);
  }
  /* Table head */
  & .ant-table-thead .ant-table-cell {
    color: var(--text-color);

    border-bottom: 1.5px solid var(--text-color);
    background-color: var(--bg-secondary-color);
  }

  &.ant-table-wrapper
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before,
  &.ant-table-wrapper
    .ant-table-thead
    > tr
    > td:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    background-color: var(--text-color);
  }

  /* Table row */
  &.ant-table-wrapper .ant-table-row {
    background-color: var(--bg-color);
  }
  &.ant-table-wrapper .ant-table-row:nth-child(2) {
    background-color: rgba(var(--primary-color_rgb), 0.1);
  }

  /* Table cell */
  &.ant-table-wrapper .ant-table-row .ant-table-cell {
    border-bottom: 1px solid var(--text-inactive-color);
  }
  &.ant-table-wrapper .ant-table-row .ant-table-cell-row-hover {
    background: none;
  }

  /* Table links */
  & a {
    color: var(--text-color);
    border-bottom: 1.5px solid var(--primary-color);
  }
  & a:hover {
    color: var(--primary-color);
  }

  /* Table no data */
  &.ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder {
    color: var(--text-color);
    background-color: var(--bg-color);
  }
  &.ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    color: var(--text-color);
    background-color: var(--bg-color);
  }

  & .ant-empty-description {
    color: var(--text-color);
  }
`;
