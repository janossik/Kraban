import CustomHead from "@/components/CustomHead";
import type { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  h1 {
    color: #ff3b3b;
  }
`;

const Dashboard: NextPage = () => {
  return (
    <>
      <CustomHead title="Dashboard" />
      <Wrapper>
        <h1>Dashboard</h1>
        <Link href="/users">Users</Link>
      </Wrapper>
    </>
  );
};

export default Dashboard;
