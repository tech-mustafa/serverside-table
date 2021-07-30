import {
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
    GET_ITEMS_REQUESTED
} from './Action';

const initialState = {
    itemMaster: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    // console.log("stataInitialData: ", state);
    switch (action.type) {
        case GET_ITEMS_REQUESTED:
            //console.log('In GetItemsRequested: ', payload);
            return ({
                ...state,
                loading: true,
            });
        case GET_ITEMS_SUCCESS:
            //console.log('In GetItemsSuccess: ', payload);
            return ({
                ...state,
                itemMaster: action.payload,
                loading: false,
            });
        case GET_ITEMS_FAILED:
            //console.log('In GetItemsFailed: ', payload);
            return ({
                ...state,
                loading: false,
            });
        default:
            return state;
    }
}

export default reducer;