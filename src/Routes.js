
import { generatePath } from "react-router";

export const indexPattern = "/";
export const getIndexRoute = () => {
    return generatePath(indexPattern);
};
export const ordersPattern = "/orders";
export const getOrdersRoute = () => {
    return generatePath(ordersPattern);
};
export const reassignOrdersPattern = "/reassign-orders";
export const getReassignRoute = () => {
    return generatePath(reassignOrdersPattern);
};
export const mergeOrdersPattern = "/merge-orders";
export const getMergeOrdersRoute = () => {
    return generatePath(mergeOrdersPattern);
};
export const splitOrdersPattern = "/split-orders";
export const getSplitOrdersRoute = () => {
    return generatePath(splitOrdersPattern);
};
export const shipmentsPattern = "/shipments";
export const getShipmentsRoute = () => {
    return generatePath(shipmentsPattern);
};
export const dailyPrefrencesPattern = "/daily-preference";
export const getdailyPrefrenceRoute = () => {
    return generatePath(dailyPrefrencesPattern);
};

export const channelsIntegrationPattern = "/channels-integration";
export const getChannelsIntegrationRoute = () => {
    return generatePath(channelsIntegrationPattern);
};

export const omsIntegrationPattern = "/OMS-integration";
export const getOmsIntegrationRoute = () => {
    return generatePath(omsIntegrationPattern);
};
export const couriersIntegrationPattern = "/couriers-integration";
export const getCouriersIntegrationPattern = () => {
    return generatePath(couriersIntegrationPattern);
};
