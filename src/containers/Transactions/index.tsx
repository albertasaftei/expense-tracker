import { CalendarMonthOutlined } from "@mui/icons-material";
import { SelectChangeEvent, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Column, ExpenseStrip, Layout, Row } from "src/components";
import { RootState } from "src/store";
import CategorySelect from "./components/CategorySelect";
import FilterByDateModal from "./components/FilterByDateModal";

const Transactions: React.FC = () => {
  const [categorySelected, setCategorySelected] = useState("0");
  const [isFilterByDateModalOpen, setIsFilterByDateModalOpen] = useState(false);
  const { expenses } = useSelector((state: RootState) => state.homepage);
  const [filterFields, setFilterFields] = useState<object>({});

  const handleChange = (event: SelectChangeEvent) => {
    setCategorySelected(event.target.value as string);
  };

  const getExpenses = useCallback(() => {
    let expensesToDisplay = expenses;

    if (categorySelected !== "0") {
      expensesToDisplay = expenses.filter(
        (expense) => expense.categoryId === Number(categorySelected)
      );
    }

    return expensesToDisplay.map((expense) => {
      return (
        <ExpenseStrip key={`expense_id_${expense.id}`} expense={expense} />
      );
    });
  }, [expenses, categorySelected]);

  return (
    <Layout>
      <Row
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
          }}
        >
          All expenses:
        </Typography>
        <Row
          sx={{
            alignItems: "center",
            gap: "16px",
          }}
        >
          <CategorySelect
            handleChange={handleChange}
            categorySelected={categorySelected}
          />
          {Object.keys(filterFields).length ? (
            <CalendarMonthOutlined
              sx={{
                color: "primary.main",
              }}
              onClick={() => setIsFilterByDateModalOpen(true)}
            />
          ) : (
            <CalendarMonthOutlined
              onClick={() => setIsFilterByDateModalOpen(true)}
            />
          )}
        </Row>
      </Row>
      <Column
        sx={{
          gap: "16px",
        }}
      >
        {getExpenses()}
      </Column>
      <FilterByDateModal
        isFilterByDateModalOpen={isFilterByDateModalOpen}
        setFilterFields={setFilterFields}
        setIsFilterByDateModalOpen={setIsFilterByDateModalOpen}
      />
    </Layout>
  );
};

export default Transactions;
