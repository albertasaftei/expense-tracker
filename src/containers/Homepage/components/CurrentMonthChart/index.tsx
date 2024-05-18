import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { RootState } from "src/store";
import colors from "src/utils/colors";

const COLORS = [colors.lightRed, colors.lightGreen, "#A3D9FF", "#FFB627"];

const CurrentMonthChart: React.FC = () => {
  const { expensesCurrentMonth, categories } = useSelector(
    (state: RootState) => state.homepage
  );

  return (
    <Box>
      <ResponsiveContainer
        height={300}
        width={"100%"}
        style={{
          marginTop: 8,
        }}
      >
        <PieChart>
          <Pie
            data={expensesCurrentMonth}
            dataKey="amount"
            cx="50%"
            cy="50%"
            fill={colors.lightRed}
            label={({ categoryId }) => {
              return `${categories[categoryId]?.name}`;
            }}
          >
            {expensesCurrentMonth.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CurrentMonthChart;
