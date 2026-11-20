import styled from "styled-components";

export const Button = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  background-color: #273239;
  color: white;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: rgb(76, 81, 85);
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 2px solid black;
  }
`;
