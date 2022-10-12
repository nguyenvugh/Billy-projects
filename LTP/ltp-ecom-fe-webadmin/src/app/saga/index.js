import { all, call, spawn } from 'redux-saga/effects';
import orders from 'app/saga/orders';
import authorization from 'app/saga/authorization';
import address from 'app/saga/address';
import branch from 'app/saga/branch';
import shop from 'app/saga/shop';
import uploadFile from 'app/saga/upload-file';
import combo from 'app/saga/combo';
import charity from 'app/saga/charity';
import product from 'app/saga/product';
import staticPage from 'app/saga/static-page';
import warehouse from 'app/saga/warehouse';
import warehouseReceipt from 'app/saga/warehouse-receipt';
import profile from 'app/saga/profile';
import email from 'app/saga/email';

export default function* rootSaga() {
  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
        }
      }
    }))
  );
}

const sagas = [
  ...orders,
  ...authorization,
  ...address,
  ...branch,
  ...shop,
  ...uploadFile,
  ...combo,
  ...charity,
  ...product,
  ...staticPage,
  ...warehouse,
  ...warehouseReceipt,
  ...profile,
  ...email,
];
