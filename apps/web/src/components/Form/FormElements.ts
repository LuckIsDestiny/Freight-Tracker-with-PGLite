import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const Form = styled.form`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  gap: 7px;
  width: 25%;
  border: 2px solid black;
  padding: 20px;
  border-radius: 15px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 70%;
  }
`;

export const FormError = styled.p`
  color: red;
  margin: 0 auto;
`;

export const AlternateButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5%;
  width: 25%;
  box-sizing: border-box;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 70%;
  }
`;

export const FormLabel = styled.label`
  display: block;
`;

export const FormHeader = styled.div`
  margin: 0 auto;
`;

export const FormInput = styled.input`
  border-radius: 5px;
  width: 100%;
  height: 30px;
  padding: 5px;
  box-sizing: border-box;
  &:focus-visible {
    outline: 2px solid black;
  }
`;

export const FormButtonContainer = styled.div`
  display: flex;
  gap: 10%;
`;

export const FormButton = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  background-color: #273239;
  color: white;
  font-weight: bold;
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

export const CancelButton = styled(FormButton)`
  background-color: white;
  color: #273239;
  font-weight: bold;
`;

export const AlternateButton = styled(FormButton)`
  background-color: white;
  color: #273239;
  font-weight: bold;
`;
