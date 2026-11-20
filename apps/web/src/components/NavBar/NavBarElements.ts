import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { Button } from "../Button/ButtonElements";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
  background-color: lightgrey;
  border: 2px solid black;
  @media (max-width: 768px) {
    justify-content: flex-end;
    flex-wrap: wrap;
    row-gap: 10px;
    margin-bottom: 5px;
    background-color: white;
    border: none;
  }
`;

export const NavMenu = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    ${({ $isOpen }) =>
      !$isOpen
        ? css`
            display: none;
          `
        : css`
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
          `}
  }
`;

export const NavLink = styled(Link)`
  display: block;
  padding: 6px;
  text-decoration: none;
  color: inherit;
  &:focus-visible {
    outline: 2px solid black;
  }
`;

export const NavToggle = styled(Button)`
  display: none;
  @media (max-width: 768px) {
    display: block;
    height: 30px;
    width: 30px;
    padding: 2px;
    background-color: white;
    border-color: white;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  @media (max-width: 768px) {
    display: block;
    height: 27px;
    width: 27px;
    color: black;
  }
`;

export const HamburgerMenu = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    ${({ $isOpen }) =>
      !$isOpen
        ? css`
            display: none;
          `
        : css`
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            background-color: lightgrey;
            color: inherit;
            padding: 10px;
            border-radius: 15px;
            border: 2px solid black;
          `}
  }
`;

export const NavButton = styled.div<{ $isOpen: boolean }>`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  background-color: #273239;
  color: white;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    ${({ $isOpen }) =>
      !$isOpen
        ? css`
            display: none;
          `
        : css`
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            background-color: #273239;
            padding: 5px;
            color: white;
          `}
  }
`;

export const NavButtonLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:focus-visible {
    outline: 2px solid black;
  }
`;
