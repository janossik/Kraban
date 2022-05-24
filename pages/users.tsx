import CustomHead from "@/components/CustomHead";
import Form from "@/components/Form";
import UserMesh from "@/components/UserMesh";
import useGet from "@/hooks/useGet";
import useUser from "@/hooks/useUser";
import UserService from "@/service/UserService";
import type { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Users: NextPage = () => {
  const [users, loading, refresh] = useGet(() => UserService.readLimit(10));
  const [state, setState] = useState<any>(null);
  const { user } = useUser();
  return (
    <>
      <CustomHead title="Users" />
      <Wrapper>
        <div>
          <h1>Users</h1>
          <UserMesh
            users={users?.filter(({ uid }) => user?.uid !== uid) || []}
            loading={loading}
          />
        </div>
        <Form
          initialState={{
            firstName: "",
            lastName: "",
            email: "",
            permission: 1,
          }}
          handler={(v) => {
            console.log(v);

            UserService.create(v).then((v) => {
              setState(v);
              setTimeout(() => {
                refresh();
              }, 1000);
            });
          }}
          required
          buttonText="Add user"
        />
      </Wrapper>
      {state && (
        <div>
          <h3>{JSON.stringify(state)}</h3>
        </div>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

export default Users;
