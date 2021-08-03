//Actions
export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
export const GET_LIST_FAILED = 'GET_LIST_FAILED';
export const GET_LIST_REQUESTED = 'GET_LIST_REQUESTED';

//Initiator
export const getList = () => ({
    type: GET_LIST_REQUESTED,
    // [WAIT_FOR_ACTION]: GET_LIST_SUCCESS,
}
);

//Dispatcher
export const getListDispatcher = (data) => {
    // console.log("in getListDispatcher->", data);
    return {
        type: GET_LIST_SUCCESS, 
        payload: data,
    };
}