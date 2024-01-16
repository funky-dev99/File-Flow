import React from "react";
import styled from "styled-components";
import { useSnapshot } from "valtio";
import state from "../store";

const Container = styled.div`
  display: flex;
  margin: 8px;
  gap: 16px;
  align-items: center;
  width: 85%;
  height: 40px;
  padding: 8px;
  cursor: pointer;
`;
const Title = styled.div`
  color: #3d7c2d;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

const DashboardMenuItem = ({ icon, title, index }) => {
  const snap = useSnapshot(state);
  return (
    <Container
      style={{
        backgroundColor: `${
          index === state.dashboardActiveIndex ? "#EFF6FF" : "transparent"
        }`,
      }}
      onClick={() => {
        state.dashboardActiveIndex = index;
      }}
    >
      <img src={icon} width={24} height={24} />
      <Title>{title}</Title>
    </Container>
  );
};

export default DashboardMenuItem;
