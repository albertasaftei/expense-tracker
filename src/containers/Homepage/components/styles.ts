import { Box, Typography, styled } from "@mui/material";
import colors from "src/utils/colors";

export const Label = styled(Typography)`
  margin-bottom: 8px;
  text-transform: uppercase;
  font-weight: 500;
`;
export const FormWrapper = styled(Box)`
  .submit-button {
    border: none;
    background-color: ${colors.red};
    color: white;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
  }
`;