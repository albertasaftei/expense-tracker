import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

interface CategorySelectProps {
  categorySelected: string;
  handleChange: (event: SelectChangeEvent) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categorySelected,
  handleChange,
}) => {
  const { categories } = useSelector((state: RootState) => state.homepage);

  return (
    <Box sx={{ width: 130 }}>
      <FormControl fullWidth>
        <InputLabel sx={{ fontSize: 14 }} id="category-select-label">
          Category
        </InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={categorySelected}
          label="Category"
          onChange={handleChange}
          sx={{
            height: "40px",
            fontSize: "14px",
          }}
        >
          <MenuItem value={"0"}>All</MenuItem>
          {categories.map((category) => {
            return (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategorySelect;
