import { all } from "@redux-saga/core/effects";
import { contactFilesData } from "./action/dashboard"; 
import { getRateCardWatcher } from "./action/tools/rateCard";
import { getRateCalculatorWatcher } from "./action/tools/rateCalculator";
import { getReportSchedulerWatcher } from "./action/tools/reportScheduler";


export default function* rootSaga() {
  yield all([
   getRateCardWatcher(),
   getRateCalculatorWatcher(),
   getReportSchedulerWatcher()
  ]);
}
