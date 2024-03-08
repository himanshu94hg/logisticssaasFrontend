import { coreBaseUrl, courierBaseUrl, dummyBaseUrl,orderBaseUrl,moreonBaseUrl } from "../config";


export const BASE_URL_CORE = coreBaseUrl;
export const BASE_URL_ORDER = orderBaseUrl;
export const BASE_URL_DUMMY = dummyBaseUrl;
export const BASE_URL_MOREON = moreonBaseUrl;
export const BASE_URL_COURIER= courierBaseUrl;

export const API_URL = {
    index: "/",
    GET_USERS:"/orders-api/orders/",
    GET_RATE_CARD:"/core-api/shipping/get-seller-rate/",
    GET_RATE_CALCULATOR:"/core-api/seller/tools/rate-calculator/",
    GET_REPORT_SCHEDULER:"/orders-api/report-scheduler/reports/",
    GET_BILLING_URL:"/orders-api/orders/shipment/",
    GET_RATE_THROUGH_ORDERID:"/orders-api/orders/order-detail/",
    GET_BILLING_URLW:"/core-api/features/billing/passbook/",
    GET_SERVICE_ABILITY_PINCODE:"/courier-api/courier/tools/check-pincode-serviceability/",
    GET_SERVICE_ABILITY_PINCODE_PAIR:"/courier-api/courier/tools/check-pair-serviceability/",
    GET_ZONE_MAPPING:"/core-api/seller/tools/zone-mapping/",
    GET_CUSTOMER_SUPPORT:"/core-api/features/update-ticket-status/",
    GET_MOREONORDER_URL:"/orders-api/orders/",
};
