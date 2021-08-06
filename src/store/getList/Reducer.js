import {
    GET_LIST_SUCCESS,
    GET_LIST_FAILED,
    GET_LIST_REQUESTED
} from './Action';

const initialState = {
    list: [],
    meta: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    // console.log("stataInitialData: ", state);
    switch (action.type) {
        case GET_LIST_REQUESTED:
            //console.log('In GetLISTRequested: ', payload);
            return ({
                ...state,
                loading: true,
            });
        case GET_LIST_SUCCESS:
            // console.log('In GetLISTSuccess: ', action.payload);
            return ({
                ...state,
                list: action.payload.data.data,
                meta: action.payload.data.meta,
                loading: false,
            });
        case GET_LIST_FAILED:
            //console.log('In GetLISTFailed: ', payload);
            return ({
                ...state,
                loading: false,
            });
        default:
            return state;
    }
}

export default reducer;