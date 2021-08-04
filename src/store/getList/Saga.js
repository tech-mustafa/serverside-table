import { call, put, takeEvery } from 'redux-saga/effects'
import { getListDispatcher } from './Action';

// const apiUrl = `https://demo-be.profitley.com/api/v1/e-commerce/shop/products-list`;

function getApi(api, header) {
   return fetch(api, {
      method: 'GET',
      headers: header
   }).then(response => response.json())
      .then(res => res)
      .catch((error) => { throw error })
}

function* fetchList({apiEndPoint, headers}) {
   try {
      const list = yield call(getApi, apiEndPoint, headers);
      console.log('apiEndPoint: ', apiEndPoint);
      console.log("listSaga fetchList: ", list);
      const data = list.success.data;
      yield put(getListDispatcher({ data }));
   } catch (e) {
      yield put(getListDispatcher({}));
   }
}

function* listSaga() {
   yield takeEvery('GET_LIST_REQUESTED', fetchList);
}

export default listSaga;