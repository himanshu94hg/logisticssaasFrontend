import { all } from "@redux-saga/core/effects";
import { rateCardWatcher } from "./action/tools/rateCard";
import { rateCalculatorWatcher } from "./action/tools/rateCalculator";
import { reportSchedulerWatcher } from "./action/tools/reportScheduler";
import { getBillingWatcher } from "./action/billing";
import { getshipmentWatcher } from "./action/shipment";
import { serviceAbilityWatcher } from "./action/tools/serviceAbility";
import { zoneMappingWatcher } from "./action/tools/zoneMapping";
import { courierAllocationWatcher } from "./action/tools/courierAllocation";
import { getupdateTicketStatusWatcher } from "./action/customerSupport";


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
   getupdateTicketStatusWatcher()
  ]);
}
