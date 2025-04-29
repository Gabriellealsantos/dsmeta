import { requestBackend } from "../utils/requests";

export interface FetchSalesParams {
    page: number;
    size?: number;
    minDate?: string;
    maxDate?: string;
    name?: string;
}

export function fetchSales({
    page,
    size = 0,
    minDate = '',
    maxDate = '',
    name = ''
}: FetchSalesParams) {
    return requestBackend({
        url: `/sales`,
        method: 'GET',
        params: {
            page,
            size,
            sort: 'amount,desc',
            minDate,
            maxDate,
            name
        }
    });
}