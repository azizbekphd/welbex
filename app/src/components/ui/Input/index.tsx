import React from "react";

import "./style.css";

type InputProps = {
  type?: "text" | "number";
  value?: string;
  onChange?: (value: string) => void;
} & React.HTMLProps<HTMLInputElement>;

const Input = ({ type, value, onChange, ...props }: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      {...props}
    />
  );
};

export default Input;
