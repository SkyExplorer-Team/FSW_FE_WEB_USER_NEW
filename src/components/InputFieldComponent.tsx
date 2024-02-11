import React from "react";
import { Input as AntInput } from "antd";
import { InputProps } from "antd/lib/input";

interface InputWrapperProps extends InputProps {
  label?: React.ReactNode;
  placeholder?: string;
  helperText?: React.ReactNode;
}

const InputFieldComponent: React.FC<InputWrapperProps> = ({
  label,
  placeholder,
  helperText,
  ...rest
}) => {
  return (
    <div className="input-wrapper">
      {label && <label>{label}</label>}
      <AntInput placeholder={placeholder} {...rest} />
      {helperText && <div className="helper-text">{helperText}</div>}
    </div>
  );
};

export default InputFieldComponent;
