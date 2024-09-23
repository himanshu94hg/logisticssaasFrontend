
import { generatePath } from "react-router";

export const indexPattern = "/";
export const getIndexRoute = () => {
    return generatePath(indexPattern);
};
export const loginPattern = "/login";
export const getLoginRoute = () => {
    return generatePath(loginPattern);
};
export const signUpPattern = "/sign-up";
export const getSignupRoute = () => {
    return generatePath(signUpPattern);
};
export const ordersPattern = "/orders";
export const getOrdersRoute = () => {
    return generatePath(ordersPattern);
};
export const orderdetailPattern = "/orderdetail/:slug";
export const getOrderdetailRoute = () => {
    return generatePath(orderdetailPattern);
};
export const reassignOrdersPattern = "/more-on-orders";
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

export const apiIntegrationPattern = "/API-integration";
export const getApiIntegrationRoute = () => {
    return generatePath(apiIntegrationPattern);
};

export const otherIntegrationPattern = "/other-integration";
export const getOtherIntegrationRoute = () => {
    return generatePath(otherIntegrationPattern);
};

export const couriersIntegrationPattern = "/couriers-integration";
export const getCouriersIntegrationRoute = () => {
    return generatePath(couriersIntegrationPattern);
};
export const generateApiKeyPattern = "/generate-api";
export const getGenerateApiKeyRoute = () => {
    return generatePath(generateApiKeyPattern);
};
export const socailPagePattern = "/social-integration";
export const getSocailPageRoute = () => {
    return generatePath(socailPagePattern);
};
export const indiaMapPattern = "/indiaMapp";
export const getIndiaMapRoute = () => {
    return generatePath(indiaMapPattern);
};
export const createOrderPattern = "/create-order";
export const getCreateOrderRoute = () => {
    return generatePath(createOrderPattern);
};
export const createOrderPattern1 = "/create-orders";
export const getCreateOrder1Route = () => {
    return generatePath(createOrderPattern1);
};
export const billingPattern = "/billing";
export const getBillingRoute = () => {
    return generatePath(billingPattern);
};
export const weightReconciliationPattern = "/weight-reconciliation";
export const getWeightReconciliationRoute = () => {
    return generatePath(weightReconciliationPattern);
};
export const misPattern = "/MIS";
export const getMisRoute = () => {
    return generatePath(misPattern);
};
export const customerPattern = "/customer";
export const getCustomerRoute = () => {
    return generatePath(misPattern);
};
export const customerSupportPattern = "/customer-support";
export const getCustomerSupportRoute = () => {
    return generatePath(customerSupportPattern);
};
export const settingsPattern = "/settings";
export const getSettingsRoute = () => {
    return generatePath(settingsPattern);
};
export const helpArticlesPattern = "/settings";
export const getHelpArticlesRoute = () => {
    return generatePath(helpArticlesPattern);
};
export const manageWarehousesPattern = "/manage-warehouses";
export const getManageWarehousesRoute = () => {
    return generatePath(manageWarehousesPattern);
};
export const pickupAddressPattern = "/add-pickup-address";
export const getPickupAddressRoute = () => {
    return generatePath(pickupAddressPattern);
};
export const shippingRatesPattern = "/shipping-rates";
export const shippingRatesRoute = () => {
    return generatePath(shippingRatesPattern);
};
export const shopifyIntegrationPattern = "/shopify-integration";
export const shopifyIntegrationRoutes = () => {
    return generatePath(shopifyIntegrationPattern);
};
export const WooCommerceIntegrationPattern = "/woocommerce-integration";
export const WooCommerceIntegrationRoutes = () => {
    return generatePath(WooCommerceIntegrationPattern);
};
export const MagentoIntegrationPattern = "/magento-integration";
export const MagentoIntegrationRoutes = () => {
    return generatePath(MagentoIntegrationPattern);
};
export const StoreHippoIntegrationPattern = "/storehippo-integration";
export const StoreHippoIntegrationRoutes = () => {
    return generatePath(StoreHippoIntegrationPattern);
};
export const AmazonDirectIntegrationPattern = "/amazon-direct-integration";
export const AmazonDirectIntegrationRoutes = () => {
    return generatePath(AmazonDirectIntegrationPattern);
};
export const EasyShipIntegrationPattern = "/easyship-integration";
export const EasyShipIntegrationRoutes = () => {
    return generatePath(EasyShipIntegrationPattern);
};
export const EasyEcomIntegrationPattern = "/easyecom-integration";
export const EasyEcomIntegrationRoutes = () => {
    return generatePath(EasyEcomIntegrationPattern);
};
export const VineRetailIntegrationPattern = "/vine-retail-integration";
export const VineRetailIntegrationRoutes = () => {
    return generatePath(VineRetailIntegrationPattern);
};
export const UnicommerceIntegrationPattern = "/unicommerce-integration";
export const UnicommerceIntegrationRoutes = () => {
    return generatePath(UnicommerceIntegrationPattern);
};
export const OMSGuruIntegrationPattern = "/omsguru-integration";
export const OMSGuruIntegrationRoutes = () => {
    return generatePath(OMSGuruIntegrationPattern);
};
export const ClickPostIntegrationPattern = "/clickpost-integration";
export const ClickPostIntegrationRoutes = () => {
    return generatePath(ClickPostIntegrationPattern);
};
export const RateCalculatorPattern = "/rate-calculator";
export const RateCalculatorRoutes = () => {
    return generatePath(RateCalculatorPattern);
};
export const ServiceabilityPattern = "/serviceability";
export const ServiceabilityRoutes = () => {
    return generatePath(ServiceabilityPattern);
};
export const ZoneMappingPattern = "/zone-mapping";
export const ZoneMappingRoutes = () => {
    return generatePath(ZoneMappingPattern);
};
export const ReportSchedulerPattern = "/report-scheduler";
export const ReportSchedulerRoutes = () => {
    return generatePath(ReportSchedulerPattern);
};
export const CourierAllocationPattern = "/courier-allocation";
export const CourierAllocationRoutes = () => {
    return generatePath(CourierAllocationPattern);
};

export const bypassPattern = "/bypass";
export const bypassPatternRoutes = () => {
    return generatePath(bypassPattern);
};
export const loginBypassPattern = "/bypass-login";
export const loginBypassRoutes = () => {
    return generatePath(loginBypassPattern);
};

export const ReferAndEarnPattern = "/refer-and-earn";
export const ReferAndEarnRoutes = () => {
    return generatePath(ReferAndEarnPattern);
};

export const BusinessPlanPattern = "/business-plan";
export const BusinessPlanRoutes = () => {
    return generatePath(BusinessPlanPattern);
};

export const LabelCustomizationPattern = "/label-customize";
export const LabelCustomizationRoutes = () => {
    return generatePath(LabelCustomizationPattern);
};

export const ViewIntegrationsPattern = "/integrations";
export const ViewIntegrationsRoutes = () => {
    return generatePath(ViewIntegrationsPattern);
};

export const gstInvoicingPattern = "/gstin-invoicing";
export const gstInvoicingRoutes = () => {
    return generatePath(gstInvoicingPattern);
};

export const BillingAddressPattern = "/company-address-details";
export const BillingAddressRoutes = () => {
    return generatePath(BillingAddressPattern);
};

export const ShipeaseBankDetailsPattern = "/shipease-bank-details";
export const ShipeaseBankDetailsRoutes = () => {
    return generatePath(ShipeaseBankDetailsPattern);
};

export const ManageSubAccountPattern = "/manage-sub-account";
export const ManageSubAccountRoutes = () => {
    return generatePath(ManageSubAccountPattern);
};

export const ThemeCustomizationPattern = "/theme-customization";
export const ThemeCustomizationRoutes = () => {
    return generatePath(ThemeCustomizationPattern);
};

export const BuyerCommunicationPagePattern = "/buyer-communication";
export const BuyerCommunicationPageRoutes = () => {
    return generatePath(BuyerCommunicationPagePattern);
};

export const SellerNotificationsPagePattern = "/seller-notifications";
export const SellerNotificationsPageRoutes = () => {
    return generatePath(SellerNotificationsPagePattern);
};

export const PostpaidSettingsPagePattern = "/payment-type";
export const PostpaidSettingsPageRoutes = () => {
    return generatePath(PostpaidSettingsPagePattern);
};

export const ProofOfDeliveryPattern = "/Proof-Of-Delivery";
export const ProofOfDeliveryRoutes = () => {
    return generatePath(ProofOfDeliveryPattern);
};

export const shopifyRedirectIntegrationPattern = "/shopify/redirect";
export const shopifyRedirectIntegrationRoutes = () => {
    return generatePath(shopifyRedirectIntegrationPattern);
};

export const WhatsAppIntegrationPattern = "/whatsapp-integration";
export const WhatsAppIntegrationRoutes = () => {
    return generatePath(WhatsAppIntegrationPattern);
};

export const WhatsAppNotificationPattern = "/whatsapp-notification";
export const WhatsAppNotificationRoutes = () => {
    return generatePath(WhatsAppNotificationPattern);
};

export const ccavenueRedirectIntegrationPattern = "/ccavenue-response";
export const ccavenueRedirectIntegrationRoutes = () => {
    return generatePath(ccavenueRedirectIntegrationPattern);
};

export const SkuUploadPattern = "/sku-upload";
export const SkuUploadRoutes = () => {
    return generatePath(SkuUploadPattern);
};

export const BrandedTrackingPattern = "/branded-tracking";
export const BrandedTrackingRoutes = () => {
    return generatePath(BrandedTrackingPattern);
};

export const TrackingScriptPattern = "/tracking-script";
export const TrackingScriptRoutes = () => {
    return generatePath(TrackingScriptPattern);
};