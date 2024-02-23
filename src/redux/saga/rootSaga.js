import { all } from "@redux-saga/core/effects";
import { contactFilesData } from "./dashboard"; 
import { getRateCardWatcher } from "./tools/rateCard";
import { getRateCalculatorWatcher } from "./tools/rateCalculator";


export default function* rootSaga() {
  yield all([
   getRateCardWatcher(),
   getRateCalculatorWatcher(),
  ]);
}
