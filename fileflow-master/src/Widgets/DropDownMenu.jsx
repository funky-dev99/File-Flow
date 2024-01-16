import React, { useState, forwardRef } from "react";
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
  line-height: 12px;
  letter-spacing: 0.3px;
`;

const Select = styled.select`
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  outline: none;
  padding: 8px 8px 8px 16px;
  border-radius: 6px;
  background-color: #e8e8e8;
`;

const FieldWrapper = styled.div`
  display: flex;
  width: 425px;
  height: 44px;
  justify-content: space-between;
  align-items: center;
`;

const DropdownMenu = forwardRef(({ options, label, hint }, ref) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Wrapper>
      <Label>{hint}</Label>
      <FieldWrapper>
        <Select ref={ref} value={selectedOption} onChange={handleSelectChange}>
          <option value="" disabled>
            {label}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FieldWrapper>
    </Wrapper>
  );
});

export default DropdownMenu;
