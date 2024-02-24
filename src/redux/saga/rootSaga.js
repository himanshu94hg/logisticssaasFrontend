import { all } from "@redux-saga/core/effects";
import { getRateCardWatcher } from "./action/tools/rateCard";
import { getRateCalculatorWatcher } from "./action/tools/rateCalculator";
import { getBillingWatcher } from "./action/billing";
import { getshipmentWatcher } from "./action/shipment";


export default function* rootSaga() {
  yield all([
   getRateCardWatcher(),
   getRateCalculatorWatcher(),
   getBillingWatcher(),
   getshipmentWatcher()
  ]);
}
