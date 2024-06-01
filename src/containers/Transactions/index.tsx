import { CalendarMonthOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  Input,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column, ExpenseStrip, Layout, Row } from "src/components";
import { AppDispatch, RootState } from "src/store";
import CategorySelect from "./components/CategorySelect";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import {
  fetchExpenses,
  fetchFilteredExpenses,
} from "../Homepage/homepageSlice";

interface FilterByDateModalProps {
  dateFrom: Date;
  dateTo: Date;
}

const Transactions: React.FC = () => {
  const [categorySelected, setCategorySelected] = useState("0");
  const [isFilterByDateModalOpen, setIsFilterByDateModalOpen] = useState(false);
  const { expenses } = useSelector((state: RootState) => state.homepage);
  const [filterFields, setFilterFields] = useState<object>({});

  const { control, handleSubmit, register } = useForm();

  const dispatch = useDispatch<AppDispatch>();

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

  const onSubmit: SubmitHandler<FilterByDateModalProps> = async (data) => {
    await dispatch(fetchFilteredExpenses(data));
    setFilterFields(data);
    setIsFilterByDateModalOpen(false);
  };

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
          <CalendarMonthOutlined
            sx={{
              color: !!Object.keys(filterFields).length && "primary.main",
            }}
            onClick={() => setIsFilterByDateModalOpen(true)}
          />
        </Row>
      </Row>
      <Column
        sx={{
          gap: "16px",
        }}
      >
        {getExpenses()}
      </Column>
      <Dialog
        open={isFilterByDateModalOpen}
        onClose={() => setIsFilterByDateModalOpen(false)}
      >
        <Form control={control} onSubmit={handleSubmit(onSubmit)}>
          <Column
            sx={{
              padding: "32px",
              gap: "16px",
            }}
          >
            <Typography sx={{ fontWeight: "600" }}>Date range: </Typography>

            <Typography sx={{ fontWeight: "500" }}>From: </Typography>
            <Input type="date" {...register("dateFrom")} />
            <Typography sx={{ fontWeight: "500" }}>To: </Typography>
            <Input type="date" {...register("dateTo")} />
            <Button type="submit" variant="contained">
              Filter
            </Button>
            <Button
              onClick={async () => {
                setFilterFields({});
                setIsFilterByDateModalOpen(false);
                await dispatch(fetchExpenses());
              }}
            >
              Clear filters
            </Button>
          </Column>
        </Form>
      </Dialog>
    </Layout>
  );
};

export default Transactions;
