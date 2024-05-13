import { Expense } from "src/containers/Homepage/types";

export const getEarnings = (expenses: Expense[]): number => {
    const earnings = expenses.filter((expense) => expense.isEarning);

    return earnings.reduce((acc, curr) => acc + curr.amount, 0);
};

export const getExpenses = (expenses: Expense[]): number => {
    const expensesList = expenses.filter((expense) => !expense.isEarning);

    return expensesList.reduce((acc, curr) => acc + curr.amount, 0);
};