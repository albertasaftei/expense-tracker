import { Box, Skeleton } from "@mui/material";
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
      {expensesCurrentMonth.length ? (
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
              labelLine={false}
              label={(props) => {
                const { x, y, categoryId, amount } = props;

                return (
                  <text
                    x={x}
                    y={y}
                    fill={colors.black}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={12}
                  >
                    {
                      categories.find((category) => category.id === categoryId)
                        ?.emoji
                    }
                    {amount}
                  </text>
                );
              }}
            >
              {expensesCurrentMonth.map((_, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton variant="circular" height={200} width={200} />
        </Box>
      )}
    </Box>
  );
};

export default CurrentMonthChart;
