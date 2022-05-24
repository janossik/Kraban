import styled from "styled-components";

export const Wrapper = styled.div<{ index?: number }>`
  @keyframes identifier {
    0% {
      transform: translateY(200px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
  animation: ${({ index }) => index && `identifier ${index * 1}s`};
`;

export const Status = styled.span<{ status?: boolean }>`
  display: block;
  height: 20px;
  width: 20px;
  background: ${({ status }) => (status ? "green" : "red")};
  border-radius: 100%;
`;
