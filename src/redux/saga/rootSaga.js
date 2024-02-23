import { all } from "@redux-saga/core/effects";
import { contactFilesData } from "./action/dashboard"; 


export default function* rootSaga() {
  yield all([
   contactFilesData()
  ]);
}
