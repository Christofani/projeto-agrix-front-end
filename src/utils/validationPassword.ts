const passwordRules = {
  hasUpperCase: "Pelo menos 1 letra maiúscula",
  hasLowerCase: "Pelo menos 1 letra minúscula",
  hasNumber: "Pelo menos 1 número",
  hasSpecialChar: "Pelo menos 1 caractere especial",
  hasMinLength: "Pelo menos 8 caracteres",
};

const validatePassword = (password: string) => ({
  hasUpperCase: /[A-Z]/.test(password),
  hasLowerCase: /[a-z]/.test(password),
  hasNumber: /[0-9]/.test(password),
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  hasMinLength: password.length >= 8,
});

export { passwordRules, validatePassword };