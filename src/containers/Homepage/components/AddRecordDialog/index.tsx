import {
  Checkbox,
  Dialog,
  Input,
  MenuItem,
  Select,
  Slide,
  Typography,
} from "@mui/material";
import { FormWrapper, Label } from "./styles";
import { Column, Row } from "src/components";
import { Close } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddExpenseInputs } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { fetchExpenses, postNewExpense } from "../../homepageSlice";

interface AddRecordDialogProps {
  isAddExpenseModalOpen: boolean;
  setIsAddExpenseModalOpen: (isOpen: boolean) => void;
}

function Transition(props: { children: React.ReactElement }) {
  return (
    <Slide direction="up" {...props}>
      {props.children}
    </Slide>
  );
}

const AddRecordDialog = ({
  isAddExpenseModalOpen,
  setIsAddExpenseModalOpen,
}: AddRecordDialogProps) => {
  const { categories } = useSelector((state: RootState) => state.homepage);
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, reset } = useForm<AddExpenseInputs>();
  const onSubmit: SubmitHandler<AddExpenseInputs> = async (
    data: AddExpenseInputs
  ) => {
    await dispatch(postNewExpense(data));
    await dispatch(fetchExpenses());
    setIsAddExpenseModalOpen(false);
    reset();
  };

  return (
    <Dialog
      fullScreen
      open={isAddExpenseModalOpen}
      onClose={() => setIsAddExpenseModalOpen(false)}
      TransitionComponent={Transition}
    >
      <FormWrapper
        sx={{
          padding: "16px",
        }}
      >
        <Row
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Add record
          </Typography>
          <Close
            sx={{ cursor: "pointer" }}
            onClick={() => setIsAddExpenseModalOpen(false)}
          />
        </Row>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Column
            sx={{
              gap: "16px",
            }}
          >
            <Column>
              <Label>Description</Label>
              <Input required type="text" {...register("description")} />
            </Column>
            <Column>
              <Label>Category</Label>
              <Select required {...register("category")}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </Column>
            <Column>
              <Label>Amount</Label>
              <Input required type="" {...register("amount")} />
            </Column>
            <Row
              sx={{
                alignItems: "center",
              }}
            >
              <Label
                sx={{
                  marginBottom: "0px",
                }}
              >
                Earning
              </Label>
              <Checkbox {...register("isEarning")} />
            </Row>
            <input type="submit" className="submit-button" />
          </Column>
        </form>
      </FormWrapper>
    </Dialog>
  );
};

export default AddRecordDialog;
