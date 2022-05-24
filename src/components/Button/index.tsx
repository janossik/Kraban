import styled, { css } from "styled-components";

const Button = styled.button<{ version?: "secondary" | "tertiary" }>`
  position: relative;
  display: flex;
  height: 40px;
  min-width: 150px;
  background-color: #2d2d2d;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.regular};
  font-weight: ${({ theme: { font } }) => font.weight.medium};
  color: ${({ theme: { color } }) => color.secondaryText};
  border: none;
  border-radius: 5px;
  transition: 300ms;
  cursor: pointer;
  &:hover {
    background-color: #5d5d5d;
  }
  ${({ version }) =>
    version === "secondary"
      ? css`
          background-color: transparent;
          border: solid 1px #2d2d2d;
          color: #2d2d2d;
          &:hover {
            color: #fff;
            background-color: #2d2d2d;
          }
        `
      : version === "tertiary"
      ? css`
          height: 30px;
          background-color: transparent;
          color: #2d2d2d;
          font-size: ${({ theme }) => theme.font.size.small};
          border: none;
          border-radius: 0;
          border-bottom: solid 1px #2d2d2d;
          overflow: hidden;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #2d2d2d;
            transform: translateY(100%);
            transition: 300ms;
            z-index: -1;
          }
          &:hover {
            background-color: transparent;
            color: #fff;
            &::after {
              transform: translateY(0%);
            }
          }
        `
      : ""}
`;

export default Button;
