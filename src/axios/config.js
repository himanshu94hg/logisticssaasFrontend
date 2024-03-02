import { coreBaseUrl, courierBaseUrl, dummyBaseUrl,orderBaseUrl } from "../config"; 


export const BASE_URL_CORE = coreBaseUrl;
export const BASE_URL_ORDER = orderBaseUrl;
export const BASE_URL_DUMMY = dummyBaseUrl;
export const BASE_URL_COURIER= courierBaseUrl;

export const API_URL = {
    index: "/",
    GET_USERS:"/orders-api/orders/",
    GET_RATE_CARD:"/core-api/shipping/get-seller-rate/",
    GET_RATE_CALCULATOR:"/core-api/seller/tools/rate-calculator/",
    GET_REPORT_SCHEDULER:"/orders-api/report-scheduler/reports/",
    GET_BILLING_URL:"/users",
    GET_RATE_THROUGH_ORDERID:"/orders-api/orders/order-detail/",
    GET_BILLING_URLW:"/core-api/features/billing/passbook/",
    GET_BILLING_URL:"/users",
    GET_SERVICE_ABILITY:"/courier-api/courier/tools/check-pincode-serviceability/",
    GET_ZONE_MAPPING:"/core-api/seller/tools/zone-mapping/"
};
