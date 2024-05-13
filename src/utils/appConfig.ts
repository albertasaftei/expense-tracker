export interface BackendUrl {
    development: string;
    production: string;

}
export const backendUrl: BackendUrl = {
    development: 'http://localhost:3000',
    production: 'https://expense-tracker-backend-oiju.onrender.com'
}