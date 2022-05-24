import { IProjectProps } from "@/types";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import Button from "../Button";

const StyledButton = styled(Button)`
  filter: invert(2);
  letter-spacing: 1px;
  font-weight: 500;
  &:hover {
    font-weight: ${({ theme }) => theme.font.weight.light};
  }
`;

const Wrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.primary};
  overflow: hidden;
`;

const Body = styled.div`
  position: relative;
  display: flex;
  height: 120px;
  padding: 10px;
  margin: 0;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.primary};
  z-index: 2;
`;
const Teams = styled.ul<{ active?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  padding-right: 40px;
  font-size: ${({ theme }) => theme.font.size.small};
  background-color: ${({ theme }) => theme.color.primary};
  transform: translateX(${({ active }) => (active ? "0%" : "-100%")});
  transition: transform 300ms;
  z-index: 3;
`;
const TeamsButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  min-height: 100%;
  width: 30px;
  z-index: 1;
  background-color: transparent;
  color: ${({ theme }) => theme.color.secondaryText};
  border: none;
  border-left: solid 1px ${({ theme }) => theme.color.secondaryText};
  cursor: pointer;
  overflow: hidden;
  z-index: 3;
  &:after {
    content: "";
    position: absolute;
    top: 0%;
    left: 0%;
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.secondaryText};
    border-bottom: solid 1px ${({ theme }) => theme.color.primary};
    border-top: solid 1px ${({ theme }) => theme.color.primary};
    border-right: solid 1px ${({ theme }) => theme.color.primary};
    transition: transform 300ms;
  }
  span {
    position: absolute;
    word-wrap: break-word;
    transform: translateX(-50%) translateY(-50%);
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.font.size.small};
    z-index: 2;
    transition: 300ms;
  }
  &:hover {
    &:after {
      transform: translateX(0%);
    }
    span {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;

const ProjectCard = (props: IProjectProps) => {
  const [activeTeams, setActiveTeams] = useState<boolean>(false);

  return (
    <Wrapper key={props.id}>
      <Teams active={activeTeams} onClick={() => setActiveTeams(false)}>
        {props.teams.map((team) => (
          <li key={team}>{team}</li>
        ))}
      </Teams>
      <Body>
        <div>
          <h3>{props.title}</h3>
          <Link href={`/project/${props.id}`}>
            <StyledButton as="a" version="tertiary">
              Details
            </StyledButton>
          </Link>
        </div>
      </Body>
      <TeamsButton onClick={() => setActiveTeams((v) => !v)}>
        <span>T e a m s</span>
      </TeamsButton>
    </Wrapper>
  );
};

export default ProjectCard;
