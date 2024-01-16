import React, { useRef, useState } from "react";
import styled from "styled-components";
import login from "../assets/login.png";
import logo from "../assets/logo.png";
import TextFormField from "../Widgets/TextFormField";
import PasswordField from "../Widgets/PasswordField";
import FilledButton from "../Widgets/FilledButton";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth_service";
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
  gap: 32px;
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

const LoginScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState(null);

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setValidationError("Please enter both email and password.");
      return;
    }

    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (error) {
      setValidationError("Invalid email or password. Please try again.");
    }
  };
  return (
    <Container>
      <Section>
        <Image src={login} alt="Login" />
      </Section>
      <Section>
        <div style={{ flex: 1 }} />{" "}
        <FormContainer>
          <Logo>
            <img src={logo} style={{ width: "100%", height: "100%" }} />
          </Logo>
          <FormTitle>Nice to see you again</FormTitle>
          <TextFormField
            ref={emailRef}
            label={"Enter your email"}
            hint={"Email:"}
          />
          <PasswordField
            ref={passwordRef}
            label={"Enter your password"}
            hint={"Password:"}
          />
          <ForgetPasswordWrapper>
            <div style={{ flex: 1 }} />
            <ForgetPasswordText>Forgot Password</ForgetPasswordText>
          </ForgetPasswordWrapper>
          <FilledButton
            onClick={() => {
              handleLogin();
            }}
            text={"Login"}
            width={"421px"}
            height={"44px"}
          />{" "}
          {validationError && <p style={{ color: "red" }}>{validationError}</p>}
          <ForgetPasswordWrapper>
            <DontYouText>Don't have an account ? </DontYouText>
            <ForgetPasswordText
              onClick={() => {
                navigate("/register");
              }}
            >
              {" "}
              Register now
            </ForgetPasswordText>
          </ForgetPasswordWrapper>
        </FormContainer>
        <div style={{ flex: 1 }} />
      </Section>
    </Container>
  );
};

export default LoginScreen;
