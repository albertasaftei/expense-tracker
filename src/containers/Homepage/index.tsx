import { Box, Skeleton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Card, Column, ExpenseStrip, Layout, Row } from "src/components";
import { AppDispatch, RootState } from "src/store";
import colors from "src/utils/colors";
import { fetchCategories, fetchExpenses } from "./homepageSlice";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "src/utils/routes";
import { getEarnings, getExpenses } from "src/utils/utils";
import { AddRecordDialog } from "./components";

const Homepage: React.FC = () => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const { expenses, isLoading, error } = useSelector(
    (state: RootState) => state.homepage
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const firstTenRecords = useMemo(
    () => (expenses?.length && expenses.slice(0, 10)) || [],
    [expenses]
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchExpenses());
  }, []);

  return (
    <Layout
      floatingButton
      floatingButtonOnClick={() => setIsAddExpenseModalOpen(true)}
    >
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
          {firstTenRecords.map((expense) => {
            return <ExpenseStrip key={expense.id} expense={expense} />;
          })}
        </Column>
      </Box>
      <AddRecordDialog
        isAddExpenseModalOpen={isAddExpenseModalOpen}
        setIsAddExpenseModalOpen={setIsAddExpenseModalOpen}
      />
    </Layout>
  );
};

export default Homepage;
