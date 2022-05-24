import styled from "styled-components";
import Button from "@components/Button";

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const StyledButton = styled(Button)`
  margin-right: auto;
`;
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  gap: 4px;
`;
export const Input = styled.input`
  height: 30px;
  padding: 5px 10px;
  border-radius: 4px;
  border: solid 1px #2d2d2d;
  background-color: transparent;
`;
