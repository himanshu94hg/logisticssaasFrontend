import { all } from "@redux-saga/core/effects";
import { contactFilesData } from "./action/dashboard"; 
import { getRateCardWatcher } from "./action/tools/rateCard";
import { getRateCalculatorWatcher } from "./action/tools/rateCalculator";


export default function* rootSaga() {
  yield all([
   getRateCardWatcher(),
   getRateCalculatorWatcher(),
  ]);
}
