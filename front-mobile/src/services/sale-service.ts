import { requestBackend } from "../utils/requests";

export function fetchSales(page: number, size: number = 10) {
    return requestBackend({
        url: `/sales`,
        method: 'GET',
        params: { page, size, sort: 'amount,desc' }
    });
}