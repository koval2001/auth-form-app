import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../atoms/input/Input.tsx";
import Button from "../../atoms/button/Button.tsx";
import classes from "./AuthForm.module.scss";
import { passwordValidationConditions } from "./AuthForm.constants.tsx";

interface IFormInput {
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<IFormInput>({
    mode: "onBlur",
  });

  const password = watch("password", ""); // Watch the password input for changes

  const [validationStates, setValidationStates] = useState<boolean[]>(
    passwordValidationConditions.map(() => false)
  );

  useEffect(() => {
    setValidationStates(
      passwordValidationConditions.map((condition) => condition.test(password))
    );
  }, [password]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign up</h2>

      <div className={classes.form__fields}>
        <Input
          placeholder="Email"
          type="email"
          error={errors.email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
        />

        <Input
          placeholder="Password"
          type="password"
          error={errors.password}
          validationConditions={passwordValidationConditions.map((condition, index) => ({
            ...condition,
            isValid: validationStates[index],
          }))}
          showErrorOnInvalid={!!errors.password}
          {...register("password", {
            required: "Password is required",
            validate: () => {
              const isValid = validationStates.every((state) => state);
              return isValid || "Password does not meet all requirements";
            },
          })}
        />
      </div>

      <Button type="submit" label="Sign up" />
    </form>
  );
};

export default AuthForm;
