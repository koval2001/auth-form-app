import React, { ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
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
  return (
    <div>
      <input type={type} className={cn(classes.input, {[classes.isError]: !!error})} placeholder={placeholder} ref={ref} {...props} />
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