import React from "react";
import styled from "styled-components";

const Title = styled.p`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const BodyTitle = ({ title }) => {
  return <Title>{title}</Title>;
};

export default BodyTitle;
