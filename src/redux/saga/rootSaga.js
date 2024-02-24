import { all } from "@redux-saga/core/effects";
import { rateCardWatcher } from "./action/tools/rateCard";
import { rateCalculatorWatcher } from "./action/tools/rateCalculator";
import { reportSchedulerWatcher } from "./action/tools/reportScheduler";
import { getBillingWatcher } from "./action/billing";
import { getshipmentWatcher } from "./action/shipment";


export default function* rootSaga() {
  yield all([
   rateCardWatcher(),
   rateCalculatorWatcher(),
   reportSchedulerWatcher(),
   getBillingWatcher(),
   getshipmentWatcher()
  ]);
}
