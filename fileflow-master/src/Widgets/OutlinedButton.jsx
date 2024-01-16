import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid #4a9230;
  width: ${(props) => props.width || "auto"};
  border-radius: 6px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  vertical-align: center;
  padding-top: 8px;
`;

const Text = styled.h5`
  color: #4a9230;
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 111.111% */
  letter-spacing: 0.3px;
`;

const OutlinedButton = ({ onClick, width, text }) => {
  return (
    <Wrapper onClick={onClick} width={width}>
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default OutlinedButton;
