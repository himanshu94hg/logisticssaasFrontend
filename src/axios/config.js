import { coreBaseUrl, dummyBaseUrl,orderBaseUrl } from "../config"; 


export const BASE_URL_CORE = coreBaseUrl;
export const BASE_URL_ORDER = orderBaseUrl;
export const BASE_URL_DUMMY = dummyBaseUrl;

export const API_URL = {
    index: "/",
    GET_USERS:"/orders-api/orders/",
    GET_RATE_CARD:"/core-api/shipping/get-seller-rate/",
    GET_RATE_CALCULATOR:"/core-api/seller/tools/rate-calculator/",
    GET_BILLING_URLW:"/core-api/features/billing/passbook/",
    GET_BILLING_URL:"/users"
};
