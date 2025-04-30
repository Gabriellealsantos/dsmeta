import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { SaleDTO } from "../types/SaleDTO";

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

export function insertRequest(obj: SaleDTO) {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: "/sales",
        data: obj
    }

    return requestBackend(config);
}

export function updateRequest(obj: SaleDTO) {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/sales/${obj.id}`,
        data: obj
    }

    return requestBackend(config);
}

export function deleteById(id: number) {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/sales/${id}`,
    }

    return requestBackend(config);
}

export function sendNotificationRequest(id: number) {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/sales/${id}/notification`
    };

    return requestBackend(config);
}
