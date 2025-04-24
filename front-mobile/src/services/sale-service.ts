import { requestBackend } from "../utils/requests";

export function fetchSales() {
    return requestBackend({ url: '/sales' });
}