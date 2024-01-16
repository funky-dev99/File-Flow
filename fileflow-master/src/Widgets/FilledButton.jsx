import React from "react";
import styled from "styled-components";

const FilledWrapper = styled.div`
  background-color: #4a9230; /* Filled color */
  border: 1px solid #4a9230; /* Border color */
  border-radius: 6px;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "30px"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-top: 8px;
`;

const FilledText = styled.h5`
  color: #ffffff; /* Text color */
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 111.111% */
  letter-spacing: 0.3px;
`;

const FilledButton = ({ onClick, width, text, height }) => {
  return (
    <FilledWrapper onClick={onClick} width={width} height={height}>
      <FilledText>{text}</FilledText>
    </FilledWrapper>
  );
};

export default FilledButton;
