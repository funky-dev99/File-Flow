import React, { forwardRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 109.091% */
  letter-spacing: 0.3px;
`;

const Field = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  outline: none;
`;

const FieldWrapper = styled.div`
  display: flex;
  width: 425px;
  height: 40px;
  padding: 8px 8px 8px 16px;
  justify-content: space-between;
  align-items: center;
  background-color: #e8e8e8;
  border-radius: 6px;
`;

const TextFormField = forwardRef(({ label, hint, mandotary }, ref) => {
  return (
    <Wrapper>
      <Label>
        {hint} {mandotary ?? <span style={{ color: "red" }}>{"*"}</span>}{" "}
      </Label>
      <FieldWrapper>
        <Field ref={ref} placeholder={label} />
      </FieldWrapper>
    </Wrapper>
  );
});

export default TextFormField;
