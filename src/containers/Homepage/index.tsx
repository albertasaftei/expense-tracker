import { Box, Skeleton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Card, Column, ExpenseStrip, Layout, Row } from "src/components";
import { AppDispatch, RootState } from "src/store";
import colors from "src/utils/colors";
import { fetchCategories, fetchExpenses } from "./homepageSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "src/utils/routes";
import { getEarnings, getExpenses } from "src/utils/utils";

const Homepage: React.FC = () => {
  const { expenses, isLoading, error } = useSelector(
    (state: RootState) => state.homepage
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchExpenses());
  }, []);

  return (
    <Layout floatingButton>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
        }}
      >
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
      </Box>
      <Box
        sx={{
          margin: "16px 0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Row
          sx={{
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            Last 10 transactions:
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              textTransform: "uppercase",
              color: colors.red,
            }}
            onClick={() => {
              navigate(routes.transactions);
            }}
          >
            View all
          </Typography>
        </Row>

        <Column
          sx={{
            gap: "16px",
            marginBottom: "50px",
          }}
        >
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} height={100} />
            ))}
          {error && (
            <Typography color={colors.red}>Error fetching expenses</Typography>
          )}
          {expenses.map((expense) => (
            <ExpenseStrip key={expense.id} expense={expense} />
          ))}
        </Column>
      </Box>
    </Layout>
  );
};

export default Homepage;
