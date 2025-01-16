import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../atoms/input/Input.tsx";
import Button from "../../atoms/button/Button.tsx";
import classes from "./AuthForm.module.scss";

interface IFormInput {
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }} = useForm<IFormInput>({
    mode: "onBlur", // Validation is triggered after blur event
  });

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
          hint="8 characters or more (no spaces)"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            maxLength: {
              value: 64,
              message: "Password must not exceed 64 characters",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)(?!.*\s).+$/,
              message: "Password must contain at least 1 uppercase letter, 1 number, and no spaces",
            },
          })}
        />
      </div>

      <Button type="submit" label="Sign up"/>
    </form>
  );
};

export default AuthForm;
