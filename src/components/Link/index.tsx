import { Link } from "react-router-dom";
import styled from "styled-components";

interface StyledProps {}

export const LinkStyle = styled(Link)<StyledProps>`
  display: inline-block;
  position: relative;

  text-decoration: none;
  /* border-bottom: 2px solid var(--primary-color); */
  color: var(--text-color);

  transition: 0.3s color ease-out;

  &:hover {
    color: var(--primary-color);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;

    display: block;

    width: 100%;

    height: 2px;

    background-color: var(--primary-color);
    transition: width 0.3s 0.1s ease-in-out;
  }
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;

    display: block;

    width: 0;

    height: 2px;

    background-color: var(--primary-color);
    transition: width 0.15s ease-in-out;
  }

  &:hover::after {
    width: 0%;
    transition: width 0.3s ease-in-out;
  }
  &:hover::before {
    width: 100%;
    transition: width 0.3s 0.4s ease-in-out;
  }
`;
