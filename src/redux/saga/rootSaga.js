import { all } from "@redux-saga/core/effects";
import { getRateCardWatcher } from "./action/tools/rateCard";
import { getRateCalculatorWatcher } from "./action/tools/rateCalculator";
import { getReportSchedulerWatcher } from "./action/tools/reportScheduler";
import { getBillingWatcher } from "./action/billing";
import { getshipmentWatcher } from "./action/shipment";


export default function* rootSaga() {
  yield all([
   getRateCardWatcher(),
   getRateCalculatorWatcher(),
   getReportSchedulerWatcher(),
   getBillingWatcher(),
   getshipmentWatcher()
  ]);
}
