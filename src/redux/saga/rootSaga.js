import { all } from "@redux-saga/core/effects";
import { contactFilesData } from "./dashboard"; 


export default function* rootSaga() {
  yield all([
   contactFilesData()
  ]);
}
