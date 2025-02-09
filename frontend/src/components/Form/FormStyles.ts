// FormStyles.ts
import { styled } from "@mui/system";
import { Box, Button } from "@mui/material";

export const FormContainer = styled(Box)({
  width: "100%",
  maxWidth: 400,
  margin: "0 auto",
  marginTop: "10vh",
  padding: "2rem",
  borderRadius: "8px",
  backgroundColor: "#f4f6f8",
  // backgroundColor: "grey",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
});

export const SubmitButton = styled(Button)({
  backgroundColor: "#4B3F92",
  "&:hover": {
    backgroundColor: "#3A3274",
  },
  padding: "0.8rem",
  color: "#fff",
});

export const LogoContainer = styled(Box)`
  text-align: center;
  margin-top: 50px;
`;

export const Logo = styled("img")`
  max-width: 250px;
`;
