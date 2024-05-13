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
    createdAt: string;

}