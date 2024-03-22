import { all } from "@redux-saga/core/effects";
import { rateCardWatcher } from "./action/tools/rateCard";
import { rateCalculatorWatcher } from "./action/tools/rateCalculator";
import { reportSchedulerWatcher } from "./action/tools/reportScheduler";
import { getBillingWatcher } from "./action/billing";
import { getshipmentWatcher } from "./action/shipment";
import { getpaymentWatcher } from "./action/payment";
import { serviceAbilityWatcher } from "./action/tools/serviceAbility";
import { zoneMappingWatcher } from "./action/tools/zoneMapping";
import { courierAllocationWatcher } from "./action/tools/courierAllocation";
import { getupdateTicketStatusWatcher } from "./action/customerSupport";
import { getshipmentCardWatcher } from "./action/dashboard/overview/shipmentCard";
import { getCodDetailsWatcher } from "./action/dashboard/overview/codDetails";
import { getLastOrderWatcher } from "./action/dashboard/overview/lastOrders";
import { getRevenueCardWatcher } from "./action/dashboard/overview/revenueCard";
import { getCounterCardWatcher } from "./action/dashboard/overview/counterCard";
import { getSplitWiseStateWatcher } from "./action/dashboard/overview/stateWiseSplit";
import { getSignupWatcher } from "./action/auth/signUp";
import { getOrdersTabWatcher } from "./action/dashboard/order";
import { getShipmentTabWatcher } from "./action/dashboard/shipment";
import { getDashboardCouriersWatcher } from "./action/dashboard/courier";
import { getDashboardRtoWatcher } from "./action/dashboard/rto";
import { getDashboardNdrWatcher } from "./action/dashboard/ndr";
import { getWeightRecoWatcher } from "./action/weightReco";
import { getmoreorderWatcher } from "./action/moreorder";
import { getexportWatcher } from "./action/exports";
import { orderActionTabWatcher } from "./action/orders/deleteOrder";
import { ordersTabWatcher } from "./action/orders/orders";

export default function* rootSaga() {
  yield all([
   rateCardWatcher(),
   rateCalculatorWatcher(),
   reportSchedulerWatcher(),
   getBillingWatcher(),
   getshipmentWatcher(),
   serviceAbilityWatcher(),
   zoneMappingWatcher(),
   courierAllocationWatcher(),
   getupdateTicketStatusWatcher(),
   getshipmentCardWatcher(),
   getCodDetailsWatcher(),
   getLastOrderWatcher(),
   getRevenueCardWatcher(),
   getCounterCardWatcher(),
   getSplitWiseStateWatcher(),
   getSignupWatcher(),
   getOrdersTabWatcher(),
   getShipmentTabWatcher(),
   getpaymentWatcher(),
   getDashboardNdrWatcher(),
   getDashboardRtoWatcher(),
   getDashboardCouriersWatcher(),
   getWeightRecoWatcher(),
   getmoreorderWatcher(),
   ordersTabWatcher(),
   getexportWatcher(),
   orderActionTabWatcher()
  ]);
}
