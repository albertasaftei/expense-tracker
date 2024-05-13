import { Box, Typography } from "@mui/material";
import colors from "src/utils/colors";

interface CardProps {
  mainText: string;
  upperDescription?: string;
  backgroundColor?: string;
}

const Card = ({ mainText, upperDescription, backgroundColor }: CardProps) => {
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor || colors.white,
        borderRadius: "12px",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          color: colors.darkGrey,
          fontSize: 12,
          fontWeight: "500",
          marginBottom: "8px",
        }}
      >
        {upperDescription}
      </Typography>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {mainText}
      </Typography>
    </Box>
  );
};

export default Card;
