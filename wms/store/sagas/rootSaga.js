// store/sagas/index.js
import { all } from 'redux-saga/effects';
import { watchFetchProducts } from './productsSaga';
import { watchLogin } from './authSaga'; // Assuming loginSaga exists

export default function* rootSaga() {
  yield all([watchLogin(), watchFetchProducts()]);
}
