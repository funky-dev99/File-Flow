import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import splash from "../assets/splash.png";
import OutlinedButton from "../Widgets/OutlinedButton";
import FilledButton from "../Widgets/FilledButton";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Navbar = styled.div`
  width: 100vw;
  height: 78px;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 170px;
  height: 65px;
`;

const Body = styled.div`
  width: 100vw;
  height: calc(100vh - 78px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentSection = styled.div`
  flex: 2;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 50px;
  font-weight: normal;
`;

const ImageSection = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const SplashImage = styled.img`
  width: 100%; /* Make sure the image takes the full width of the container */
  max-height: 100%; /* Preserve the aspect ratio */
`;

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar>
        <div style={{ width: 32 }} />
        <Logo>
          <img src={logo} width={170} height={72} alt="Logo" />
        </Logo>
        <div style={{ flex: 1 }} />
        <OutlinedButton
          text={"Login"}
          width={"141px"}
          onClick={() => {
            navigate("/login");
          }}
        />
        <div style={{ width: 14 }} />
        <FilledButton
          text={"Register"}
          width={"141px"}
          onClick={() => {
            navigate("/register");
          }}
        />
        <div style={{ width: 32 }} />
      </Navbar>
      <Body>
        <ContentSection>
          <Heading>
            Securely collaborate on content anywhere, anytime with FileFlow!!
          </Heading>
        </ContentSection>
        <ImageSection>
          <SplashImage src={splash} alt="Splash" />
        </ImageSection>
      </Body>
    </Container>
  );
};

export default SplashScreen;
