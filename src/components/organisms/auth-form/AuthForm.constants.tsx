export const passwordValidationConditions = [
  {
    text: "8 characters or more (no spaces)",
    test: (value: string) => value.length >= 8 && !value.includes(" "),
  },
  {
    text: "Uppercase and lowercase letters",
    test: (value: string) => /[A-Z]/.test(value) && /[a-z]/.test(value),
  },
  {
    text: "At least one digit",
    test: (value: string) => /\d/.test(value),
  },
];