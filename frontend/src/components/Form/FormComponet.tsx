import { useForm, type FieldValues } from "react-hook-form";
import { TextField, CircularProgress, Typography } from "@mui/material";
import { FormContainer, SubmitButton, LogoContainer, Logo } from "./FormStyles";
import submitIcon from "../../assets/icon.svg";
import logo from "../../assets/logo.svg";
import { FormInputs } from "./interface";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>();

  const onSubmit = async (data: FieldValues) => {
    // ToDo: submit to server
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <>
      <LogoContainer>
        <Logo src={logo} alt="University Logo" />
      </LogoContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="h5"
          color="textPrimary"
          fontWeight={600}
          gutterBottom
        >
          Bun venit!
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Pentru a continua, trebuie să fiți logat în contul dumneavoastră
        </Typography>

        <TextField
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          label="Email"
          type="email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email ? String(errors.email.message) : ""}
          fullWidth
          margin="normal"
          aria-label="Email Address"
        />

        <TextField
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 10,
              message: "Password must be at least 10 characters",
            },
          })}
          label="Parola"
          type="password"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password ? String(errors.password.message) : ""}
          fullWidth
          margin="normal"
          aria-label="Password"
        />

        <SubmitButton
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          fullWidth
          startIcon={
            isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <img
                src={submitIcon}
                alt="Submit Icon"
                style={{ width: 20, height: 20 }}
              />
            )
          }
        >
          {isSubmitting ? "Submitting..." : "Intra in cont"}
        </SubmitButton>
      </FormContainer>
    </>
  );
}
