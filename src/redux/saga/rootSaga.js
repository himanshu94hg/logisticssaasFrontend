import { all } from "@redux-saga/core/effects";
import { getRateCardWatcher } from "./action/tools/rateCard";
import { getRateCalculatorWatcher } from "./action/tools/rateCalculator";
import { getBillingWatcher } from "./action/billing";



export default function* rootSaga() {
  yield all([
   getRateCardWatcher(),
   getRateCalculatorWatcher(),
   getBillingWatcher()
  ]);
}
