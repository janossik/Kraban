import Kraban from "@/assets/Kraban";
import { clientAuth } from "@/clientFirebase";
import UserService from "@/service/UserService";
import {
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import Form from "../Form";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const SignInView = () => {
  const [error, setError] = useState("");

  const SingInHandler = (value: { email: string; password: string }) => {
    const { email, password } = value;
    setPersistence(clientAuth, browserSessionPersistence)
      .then(async () => {
        const { user } = await signInWithEmailAndPassword(
          clientAuth,
          email,
          password
        );
        await UserService.update(user.uid, {
          status: true,
        });
      })
      .catch(() => {
        setError("Login failed");
        setTimeout(() => setError(""), 3000);
      });
  };

  return (
    <Wrapper>
      <h1>Kraban</h1>
      <Kraban />
      <Form
        required={true}
        buttonText="Sign In"
        initialState={{ email: "", password: "" }}
        handler={SingInHandler}
      />
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </Wrapper>
  );
};

export default SignInView;
