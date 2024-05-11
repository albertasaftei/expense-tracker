import { Box } from "@mui/material";

interface ColumnProps {
  children: React.ReactNode;
  sx?: object;
}

const Column = ({ children, sx }: ColumnProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Column;
