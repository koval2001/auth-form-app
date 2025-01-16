import React, { ForwardRefRenderFunction, useState } from "react";
import { FieldError } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import classes from "./Input.module.scss";
import cn from "classnames";

interface ValidationHint {
  text: string;
  isValid: boolean;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: string;
  hint?: string;
  error?: FieldError;
  validationConditions?: ValidationHint[];
  showErrorOnInvalid?: boolean;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ placeholder, type, validationConditions, error, showErrorOnInvalid, ...props }, ref) => {
  const [isShownPassword, setShownPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShownPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <div className={classes.input__container}>
        <input type={isShownPassword ? "text" : type} className={cn(classes.input, {[classes.isError]: !!error})} placeholder={placeholder} ref={ref} {...props} />
        {type === "password" && (
          <FontAwesomeIcon
            size="sm"
            icon={isShownPassword ? faEye : faEyeSlash}
            className={cn(classes.input__toggleIcon, {[classes.isError]: !!error})}
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {error && !validationConditions && <p className={classes.input__error}>{error.message}</p>}

      {validationConditions && (
        <div className={classes.input__validationConditions}>
          {validationConditions.map((condition, index) => (
            <p
              key={index}
              className={cn(classes.input__validationConditionsItem, {
                [classes.valid]: condition.isValid,
                [classes.invalid]: !condition.isValid && showErrorOnInvalid,
              })}
            >
              {condition.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(Input);