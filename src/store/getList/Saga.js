import { call, put, takeEvery } from 'redux-saga/effects'
import { getListDispatcher } from './Action';

const apiUrl = `http://localhost:3001/data`;

function getApi() {
  return fetch(apiUrl, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',

      }
  }).then(response => response.json())
  .then(res => res)
  .catch((error) => {throw error})
}

function* fetchList(action) {
   try {
      const list = yield call(getApi);
      // console.log("userSaga fetchUsers: ",list);
      yield put(getListDispatcher({list}));
   } catch (e) {
      yield put(getListDispatcher({}));
   }
}

function* listSaga() {
   yield takeEvery('GET_LIST_REQUESTED', fetchList);
}

export default listSaga;