import { Button, Dialog, Input, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Column } from "src/components";
import {
  fetchExpenses,
  fetchFilteredExpenses,
} from "src/containers/Homepage/homepageSlice";
import { AppDispatch } from "src/store";
import { FilterByDateModalParams, FilterByDateModalProps } from "../types";
import React from "react";

const FilterByDateModal: React.FC<FilterByDateModalProps> = ({
  isFilterByDateModalOpen,
  setIsFilterByDateModalOpen,
  setFilterFields,
}) => {
  const { handleSubmit, register, reset } = useForm<FilterByDateModalParams>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FilterByDateModalParams> = async (
    data: FilterByDateModalParams
  ) => {
    await dispatch(fetchFilteredExpenses(data));
    setFilterFields(data);
    setIsFilterByDateModalOpen(false);
  };

  return (
    <Dialog
      open={isFilterByDateModalOpen}
      onClose={() => setIsFilterByDateModalOpen(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
              reset();
              await dispatch(fetchExpenses());
            }}
          >
            Clear filters
          </Button>
        </Column>
      </form>
    </Dialog>
  );
};

export default FilterByDateModal;
