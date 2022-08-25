import { useState } from 'react';
import styled from 'styled-components';

export default function Input({
  type,
  name,
  id,
  placeholder,
  onChange,
  value,
  disabled,
  message,
  minLength,
  pattern,
  min,
  step,
  width,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <BoxInput width={width}>
      <input
        type={type}
        name={name}
        id={id}
        required
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        pattern={pattern}
        minLength={minLength}
        min={min}
        step={step}
        onBlur={() => setFocused(true)}
        focused={focused.toString()}
      />
      <span>{message}</span>
    </BoxInput>
  );
}

const BoxInput = styled.div`
  input {
    height: 45px;
    max-width: 320px;
    width: ${(props) => (props.width ? `${props.width}px` : '')};
    background: white;
    border-radius: 6px;
    font-size: 20px;
    color: black;
    padding-left: 7px;
    border: 1px solid #a4a4a4;
    ::placeholder {
      color: #a4a4a4;
    }
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  /* span {
    color: red;
    font-weight: 400;
    font-size: 13px;
    padding: 5px;
    width: 30vw;
    display: none;
  }
  input:invalid[focused='true'] {
    border: 1px solid red;
  }
  input:invalid[focused='true'] ~ span {
    display: block;
  } */
  /* @media (max-width: 600px) {
    input {
      width: 88vw;
      height: 55px;
      font-size: 22px;
      margin-top: 12px;
    }
    span {
      font-size: 12px;
      width: 88vw;
    }
  } */
`;
