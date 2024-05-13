import { Box } from "@mui/material";

interface StripProps {
  right?: React.ReactNode;
  left: React.ReactNode;
  center?: React.ReactNode;
}

const Strip = ({ right, left, center }: StripProps) => {
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
      {left}
      {center}
      {right}
    </Box>
  );
};

export default Strip;
