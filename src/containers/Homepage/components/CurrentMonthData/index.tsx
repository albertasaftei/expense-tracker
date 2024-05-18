import { Box, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { Card } from "src/components";
import { RootState } from "src/store";
import colors from "src/utils/colors";
import { getEarnings, getExpenses } from "src/utils/utils";

const CurrentMonthData: React.FC = () => {
  const { expenses } = useSelector((state: RootState) => state.homepage);
  return (
    <Box
      sx={{
        display: "flex",
        gap: "16px",
        justifyContent: "center",
      }}
    >
      {expenses.length ? (
        <>
          <Card
            mainText={getExpenses(expenses).toString()}
            upperDescription="Spent this month >"
            backgroundColor={colors.lightRed}
          />
          <Card
            mainText={getEarnings(expenses).toString()}
            upperDescription="Earned this month >"
            backgroundColor={colors.lightGreen}
          />
        </>
      ) : (
        <>
          <Skeleton height={150} width="100%" />
          <Skeleton height={150} width="100%" />
        </>
      )}
    </Box>
  );
};

export default CurrentMonthData;
