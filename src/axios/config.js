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
  GET_COURIER_ALLOCATION_PARTNER: "/core-api/features/courier-category/",
  GET_COURIER_POST_ALLOCATION: "/core-api/seller/tools/save-general-preference/",
  POST_SELLER_SIGNUP: "/core-api/seller/sign-up/",

  //PAYMENT
  GET_PAYMENT_URL: "/core-api/seller/get-seller-balance/",


  //DASHBOARD OVERVIEW API'S 
  GET_DASHBOARD_OVERVIEW_SHIPMENT_CARD: "/orders-api/dashboard/overview/shipment-card/",
  GET_DASHBOARD_OVERVIEW_NDR_DETAILS: "/orders-api/dashboard/overview/ndr-details/",
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
  GET_DASHBOARD_ORDERS_STORE_BASED: "/orders-api/dashboard/orders/store-based-orders/",
  GET_DASHBOARD_ORDERS_COUNT: "/orders-api/dashboard/order-count/",
  GET_DASHBOARD_ORDERS_CANCELLED_ORDERS: "/orders-api/dashboard/orders/cancelled-orders-api/",
  GET_DASHBOARD_ORDERS_MPS_ORDER: "/orders-api/dashboard/orders/mps-order/",
  GET_DASHBOARD_ORDERS_ASSIGNED_PICKED_ORDER: "/orders-api/dashboard/orders/assigned-picked-orders/",
  GET_DASHBOARD_ORDERS_BUYERDEMOGRAPHIC: "/orders-api/dashboard/buyer-demographic/",
  GET_DASHBOARD_ORDERS_PREPAID_COD_COUNTER: "/orders-api/dashboard/orders/prepaid-cod-counter/",
  GET_DASHBOARD_ORDERS_WAREHOUSE_INFN: "/orders-api/dashboard/orders/warehouse-information/",
  GET_DASHBOARD_ORDERS_BEST_SKU_PROJECT: "/orders-api/dashboard/orders/best-sku-product/",
  GET_DASHBOARD_ORDERS_POPULAR_LOACTION: "/orders-api/dashboard/orders/popular-order-location/",
  GET_DASHBOARD_ORDERS_INTERVSDOM: "/orders-api/dashboard/orders/international-vs-domestic/",

  //DASHBOARD SHIPMENT API'S
  GET_DASHBOARD_SHIPMENT_WEIGHT_PROFILE: "/orders-api/dashboard/shipment/weight-profile/",
  GET_DASHBOARD_SHIPMENT_OFD_DATA: "/orders-api/dashboard/shipment/ofd-data/",
  GET_DASHBOARD_SHIPMENT_ZONE_WISE_DATA: "/orders-api/dashboard/zone-wise-data/",


  //DASHBOARD NDR API'S
  GET_DASHBOARD_NDR_COUNTER_CARDS: "/orders-api/dashboard/ndr/counter-cards/",
  GET_DASHBOARD_NDR_NDR_STATUS: "/orders-api/dashboard/ndr/ndr-status/",
  GET_DASHBOARD_NDR_SUCCESS_BY_COURIER: "/orders-api/dashboard/ndr/success-by-courier/",
  GET_DASHBOARD_NDR_SUCCESS_BY_ZONE: "/orders-api/dashboard/ndr/success-by-zone/",

  //DASHBOARD RTO API'S
  GET_DASHBOARD_RTO_TOP_RTO: "/orders-api/dashboard/rto/top-rto/",
  GET_DASHBOARD_RTO_TOP_CITY: "/orders-api/dashboard/rto/top-rto-city/",
  GET_DASHBOARD_RTO_COUNT_MONTHWISE: "/orders-api/dashboard/rto/month-wise-rto-count/",
  GET_DASHBOARD_RTO_TOP_COURIER: "/orders-api/dashboard/rto/top-rto-courier/",

  //DASHBOARD COURIER API'S
  GET_DASHBOARD_COURIER_DATA: "/orders-api/dashboard/courier/courier-data/",

};
