import { coreBaseUrl, courierBaseUrl, dummyBaseUrl, orderBaseUrl, moreonBaseUrl } from "../config";


export const BASE_URL_CORE = coreBaseUrl;
export const BASE_URL_ORDER = orderBaseUrl;
export const BASE_URL_DUMMY = dummyBaseUrl;
export const BASE_URL_MOREON = moreonBaseUrl;
export const BASE_URL_COURIER = courierBaseUrl;

export const API_URL = {
  index: "/",
  GET_USERS: "/orders-api/orders/",
  GET_RATE_CARD: "/core-api/shipping/get-seller-rate/",
  GET_RATE_CALCULATOR: "/core-api/seller/tools/rate-calculator/",
  GET_REPORT_SCHEDULER: "/orders-api/report-scheduler/reports/",
  GET_BILLING_URL: "/orders-api/orders/shipment/",
  GET_RATE_THROUGH_ORDERID: "/orders-api/orders/order-detail/",
  GET_BILLING_URLW: "/core-api/features/billing/passbook/",
  CHECK_SERVICE_ABILITY_PINCODE: "/courier-api/courier/tools/check-pincode-serviceability/",
  CHECK_SERVICE_ABILITY_PINCODE_PAIR: "/courier-api/courier/tools/check-pair-serviceability/",
  GET_ZONE_MAPPING: "/core-api/seller/tools/zone-mapping/",
  GET_CUSTOMER_SUPPORT: "/core-api/features/update-ticket-status/",
  GET_MOREONORDER_URL: "/orders-api/orders/",
  GET_SHIPEASE_SERVICEABILITY_PINCODE: "/courier-api/courier/tools/shipease-serviceability-pincodes/",
  GET_COURIER_PARTNER_NAME: "/core-api/shipease-admin/partners/",
  GET_COURIER_SERVICE_PINCODE: "/courier-api/courier/tools/download-service-pincode/",
  GET_COURIER_ALLOCATION: "/courier-api/courier/tools/download-service-pincode/",
  POST_SELLER_SIGNUP: "/core-api/seller/sign-up/",


  //DASHBOARD OVERVIEW API'S 
  GET_DASHBOARD_OVERVIEW_SHIPMENT_CARD: "/orders-api/dashboard/overview/shipment-card/",
  GET_DASHBOARD_OVERVIEW_NDR_DETAILS: "/orders-api/dashboard/ndr/counter-cards/",
  GET_DASHBOARD_OVERVIEW_COD_DETAILS: "/orders-api/dashboard/overview/cod-details/",
  GET_DASHBOARD_OVERVIEW_RTO_DETAILS: "/orders-api/dashboard/overview/rto-status/",
  GET_DASHBOARD_OVERVIEW_LAST_ORDERS: "/orders-api/dashboard/overview/get-last-orders/",
  GET_DASHBOARD_OVERVIEW_REVENUE_CARD: "/orders-api/dashboard/overview/revenue-analytics-card/",
  GET_DASHBOARD_OVERVIEW_COUNTER_CARD: "/orders-api/dashboard/overview/counter-card/",
  GET_DASHBOARD_OVERVIEW_TOPSELL_CARD: "/orders-api/dashboard/overview/top-selling-products/",
  GET_DASHBOARD_OVERVIEW_STATEWISE_SPLIT: "/orders-api/dashboard/overview/state-wise-split/",
  GET_DASHBOARD_OVERVIEW_DELIVERY_PERFORMANCE: "/orders-api/dashboard/overview/delivery-performance/",
  GET_DASHBOARD_OVERVIEW_COURIERISE_ALLOCATION: "/orders-api/dashboard/overview/courier-wise-allocation/",
  GET_DASHBOARD_OVERVIEW_MOST_POPULAR: "/orders-api/dashboard/overview/most-popular-customers/",
  GET_DASHBOARD_OVERVIEW_WEIGHT_DISCREPANCIES: "/orders-api/dashboard/overview/weight-discrepancy/",

  //DASHBOARD ORDERS API'S 
  GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC:"/orders-api/dashboard/buyer-demographic/"

};
