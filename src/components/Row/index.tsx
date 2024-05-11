import { Box } from "@mui/material";
import React from "react";

interface RowProps {
  children: React.ReactNode;
  sx?: object;
}

const Row = ({ children, sx }: RowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Row;
