import { call, put, takeEvery } from 'redux-saga/effects'
import { getListDispatcher } from './Action';

// const apiUrl = `https://demo-be.profitley.com/api/v1/e-commerce/shop/products-list`;

function getApi(api, header) {//Function to call and fetch API with given apiEndPoint & Header
   return fetch(api, {
      method: 'GET',
      headers: header
   }).then(response => response.json())
      .then(res => res)
      .catch((error) => { throw error })
}

function* fetchList({ apiEndPoint, headers }) {
   try {
      const list = yield call(getApi, apiEndPoint, headers);//saga call with passed endpoint and heders
      console.log('apiEndPoint: ', apiEndPoint);
      const data = list.success; //setting success to be passed to reducer
      yield put(getListDispatcher({ data }));
   } catch (e) {
      yield put(getListDispatcher({}));
   }
}

function* listSaga() {
   yield takeEvery('GET_LIST_REQUESTED', fetchList);//Checks for Request Action and calls fetchList if founds one
}

export default listSaga;