import React, { useState, forwardRef } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0.3px;
`;

const Field = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  outline: none;
`;

const EyeButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
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

const PasswordField = forwardRef(({ label, hint }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Wrapper>
      <Label>
        {hint} <span style={{ color: "red" }}>*</span>{" "}
      </Label>
      <FieldWrapper>
        <Field
          ref={ref}
          type={showPassword ? "text" : "password"}
          placeholder={label}
        />
        <EyeButton onClick={togglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </EyeButton>
      </FieldWrapper>
    </Wrapper>
  );
});

export default PasswordField;
