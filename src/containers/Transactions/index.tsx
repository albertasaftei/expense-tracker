import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Column, ExpenseStrip, Layout } from "src/components";
import { RootState } from "src/store";

const Transactions: React.FC = () => {
  const { expenses } = useSelector((state: RootState) => state.homepage);

  return (
    <Layout>
      <Typography
        sx={{
          fontSize: "14px",
          marginBottom: "16px",
        }}
      >
        All expenses:
      </Typography>
      <Column
        sx={{
          gap: "16px",
        }}
      >
        {expenses.map((expense) => {
          return <ExpenseStrip expense={expense} />;
        })}
      </Column>
    </Layout>
  );
};

export default Transactions;
