import { CardTravel } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import colors from "src/utils/colors";

interface StripProps {
  left?: React.ReactNode;
}

const Strip = ({ left }: StripProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        padding: "16px",
        borderRadius: "12px",
        justifyContent: "space-between",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#E0E0E0",
          borderRadius: "8px",
          padding: "8px",
        }}
      >
        <CardTravel />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flex: 1,
          gap: "4px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "500",
          }}
        >
          Grocery
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: colors.lightGrey,
          }}
        >
          12th August
        </Typography>
      </Box>
      {left}
    </Box>
  );
};

export default Strip;
