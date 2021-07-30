import { call, put, takeEvery } from 'redux-saga/effects'
import { getItemsDispatcher } from './Action';

const apiUrl = `http://localhost:3001/itemMaster/`;

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

function* fetchItems(action) {
   try {
      const items = yield call(getApi);
      // console.log("userSaga fetchUsers: ",items);
      yield put(getItemsDispatcher({items}));
   } catch (e) {
      yield put(getItemsDispatcher({}));
   }
}

function* itemSaga() {
   yield takeEvery('GET_ITEMS_REQUESTED', fetchItems);
}

export default itemSaga;