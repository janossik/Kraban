import styled from "styled-components";

export const UserCardSkeleton = styled.div`
  position: relative;
  min-height: 100px;
  min-width: 280px;
  background: rgba(0, 0, 0, 0.1);
  &::after {
    content: "";
    position: absolute;
    top: 40px;
    left: 10px;
    width: 90%;
    height: 30px;
    background: rgba(0, 0, 0, 0.1);
  }
  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
    height: 20px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 100%;
  }
`;
