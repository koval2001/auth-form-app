import React from "react";
import { FieldError } from "react-hook-form";
import classes from "./Input.module.scss";

interface InputProps {
  placeholder: string;
  type: string;
  hint?: string;
  error?: FieldError;
}

const Input: React.FC<InputProps> = ({ placeholder, type, hint, error }, ...props) => {
  return (
    <div>
      <input type={type} className={classes.input} placeholder={placeholder} {...props} />
      {error && <p>{error.message}</p>}
      {hint && <small>{hint}</small>}
    </div>
  );
};

export default Input;