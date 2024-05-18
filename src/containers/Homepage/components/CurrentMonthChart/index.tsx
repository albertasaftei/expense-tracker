import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { RootState } from "src/store";
import colors from "src/utils/colors";

const RADIAN = Math.PI / 180;
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
            labelLine={false}
            label={({
              categoryId,
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
            }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={x > cx ? "start" : "middle"}
                  dominantBaseline="central"
                  xlinkHref={categories[categoryId]?.iconUrl}
                >
                  <img
                    src={categories[categoryId]?.iconUrl}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  {`${categories[categoryId]?.name}`}
                </text>
              );
            }}
          >
            {expensesCurrentMonth.map((entry, index) => (
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
