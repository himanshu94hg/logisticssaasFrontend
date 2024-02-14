import { all } from "@redux-saga/core/effects";
import { contactFilesData } from "./index";


export default function* rootSaga() {
  yield all([
   contactFilesData()
  ]);
}
