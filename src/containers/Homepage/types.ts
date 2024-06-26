export interface Expense {
    id: number;
    amount: number;
    description: string;
    createdAt: string;
    categoryId: number;
    isEarning: boolean;
}

export interface Category {
    id: number;
    name: string;
    iconUrl: string;
    emoji: string;
    createdAt: string;

}

export interface AddExpenseInputs {
    description: string;
    category: number;
    amount: number;
    isEarning: boolean;
}

export interface FilterExpenses {
    dateFrom: Date;
    dateTo: Date;
}

