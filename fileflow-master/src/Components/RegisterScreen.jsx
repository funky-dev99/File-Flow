import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import bro from "../assets/bro.png";
import logo from "../assets/logo.png";
import TextFormField from "../Widgets/TextFormField";
import PasswordField from "../Widgets/PasswordField";
import FilledButton from "../Widgets/FilledButton";
import { useNavigate, useHref } from "react-router-dom";
import DropdownMenu from "../Widgets/DropDownMenu";
import {
  signupUser,
  createUser as createUserService,
  signout,
} from "../services/auth_service";
import { auth } from "../firebaseConfig";
import { useSnapshot } from "valtio";
import state from "../store";
import { message } from "antd";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const Section = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 60%;
  height: auto;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
  align-self: stretch;
`;

const Logo = styled.div`
  width: 150px;
  height: 52px;
`;

const FormTitle = styled.h1`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 140% */
`;

const ForgetPasswordWrapper = styled.div`
  display: flex;
  width: 421px;
  align-items: center;
  height: auto;
  justify-content: center;
  gap: 8px;
`;

const ForgetPasswordText = styled.div`
  color: #007aff;
  text-align: right;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.3px;
  cursor: pointer;
`;

const DontYouText = styled.p`
  color: #1a1a1a;
  font-feature-settings: "clig" off, "liga" off;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.3px;
`;

const Asterisk = styled.span`
  color: red;
  margin-left: 4px;
`;

const RegisterScreen = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileNumberRef = useRef();
  const nameRef = useRef();
  const userRoleRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const href = useHref();
  const [error, setError] = useState("");
  const snap = useSnapshot(state);

  const handleRegister = async () => {
    try {
      if (auth.currentUser?.uid) {
        console.log("user found logging out " + auth.currentUser?.uid);
        await signout();
      }
      if (
        !nameRef.current.value ||
        !emailRef.current.value ||
        !mobileNumberRef.current.value ||
        !passwordRef.current.value ||
        !confirmPasswordRef.current.value
      ) {
        setError("All fields are required");
        return;
      }

      // Check if passwords match
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        setError("Passwords do not match");
        return;
      }

      // Register the user
      await signupUser(emailRef.current.value, passwordRef.current.value);

      // Create user data
      const userData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        mobileNumber: mobileNumberRef.current.value,
        userRole: "Normal user", // userRoleRef.current.value,
      };

      await createUserService(userData).then((res) => {
        state.currentUser = userData;
        message.success(
          "Registration success. Go back to login and login to your account"
        );
      });
      // navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Error during registration");
    }
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <Section>
        <Image src={bro} alt="Login" />
      </Section>
      <Section>
        <div style={{ flex: 1 }} />
        <FormContainer>
          <Logo>
            <img
              src={logo}
              style={{ width: "100%", height: "100%" }}
              alt="Logo"
            />
          </Logo>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <TextFormField
            ref={nameRef}
            label={"Enter your name"}
            hint={"Name:"}
            
          />
          <TextFormField
            ref={emailRef}
            label={"Enter your email"}
            hint={"Email:"}
          />
          <TextFormField
            ref={mobileNumberRef}
            label={"Enter your mobile number"}
            hint={"Mobile Number:"}
          />
          <PasswordField
            ref={passwordRef}
            label={"Enter your password"}
            hint={"Password:"}
            
          />
          <PasswordField
            ref={confirmPasswordRef}
            label={"Enter your password again"}
            hint={"Confirm Password:"}
          />
          <FilledButton
            onClick={handleRegister}
            text={"Register"}
            width={"421px"}
            height={"44px"}
          />
          <ForgetPasswordWrapper>
            <DontYouText>Already have an account ? </DontYouText>
            <ForgetPasswordText onClick={() => navigate("/login")}>
              {" "}
              Login now
            </ForgetPasswordText>
          </ForgetPasswordWrapper>
        </FormContainer>
        <div style={{ flex: 1 }} />
      </Section>
    </Container>
  );
};

export default RegisterScreen;
