import React from "react";
import classes from "./Button.module.scss";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, disabled, label }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes.button}>
      <span>{label}</span>
    </button>
  );
};

export default Button;
