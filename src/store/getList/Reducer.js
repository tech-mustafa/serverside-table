import {
    GET_LIST_SUCCESS,
    GET_LIST_FAILED,
    GET_LIST_REQUESTED
} from './Action';

const initialState = {
    list: [],
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
            //console.log('In GetLISTSuccess: ', payload);
            return ({
                ...state,
                list: action.payload,
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