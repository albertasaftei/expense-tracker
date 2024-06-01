export interface FilterByDateModalParams {
    dateFrom: Date;
    dateTo: Date;
}

export interface FilterByDateModalProps {
    isFilterByDateModalOpen: boolean;
    setIsFilterByDateModalOpen: (isOpen: boolean) => void;
    setFilterFields: (fields: object) => void;

}