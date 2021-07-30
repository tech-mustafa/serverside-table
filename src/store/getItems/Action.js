//Actions
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const GET_ITEMS_REQUESTED = 'GET_ITEMS_REQUESTED';

//Initiator
export const getItems = () => ({
    type: GET_ITEMS_REQUESTED,
    // [WAIT_FOR_ACTION]: GET_ITEMS_SUCCESS,
}
);

//Dispatcher
export const getItemsDispatcher = (data) => {
    // console.log("in getItemsDispatcher->", data);
    return {
        type: GET_ITEMS_SUCCESS, 
        payload: data,
    };
}