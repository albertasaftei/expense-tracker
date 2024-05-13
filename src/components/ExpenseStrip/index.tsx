import { Box, Typography } from "@mui/material";
import colors from "src/utils/colors";
import Strip from "../Strip";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { Expense } from "src/containers/Homepage/types";
import { formatDate } from "date-fns";

interface ExpenseStripProps {
  expense: Expense;
}

const ExpenseStrip = ({ expense }: ExpenseStripProps) => {
  const { categories } = useSelector((state: RootState) => state.homepage);

  return (
    <Strip
      left={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.lightestGrey,
            borderRadius: "8px",
            padding: "8px",
          }}
        >
          <img
            loading="lazy"
            style={{
              height: "24px",
              width: "24px",
            }}
            src={
              categories.find((category) => category.id === expense.categoryId)
                ?.iconUrl
            }
          />
        </Box>
      }
      center={
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
            {expense.description.toUpperCase()}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: colors.lightGrey,
            }}
          >
            {formatDate(new Date(expense.createdAt), "dd/MM/yyyy")}
          </Typography>
        </Box>
      }
      right={
        <Typography
          fontWeight={500}
          color={expense.isEarning ? colors.green : colors.red}
        >
          {expense.isEarning ? "+" : "-"}
          {expense.amount}
        </Typography>
      }
    />
  );
};

export default ExpenseStrip;
