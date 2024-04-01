import { GET_WEIGHT_RECO_DATA,GET_WEIGHT_DATA,GET_HOLD_DATA,GET_SETTELED_DATA,GET_HISTORY_DATA,GET_ACCEPT_DATA,GET_COMMENT_DATA,GET_DISPUTE_DATA } from "../../constants/weightReco";

const initialState = {
    weightRecoData: [],
    weightData:[],
    holdData:[],
    setteledData:[],
    historyData:[],
    acceptData:[],
    commentData:[],
    disputeData:[]
};

export const weightRecoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WEIGHT_RECO_DATA:
            return {
                ...state,
                weightRecoData: action?.payload
            };
        case GET_WEIGHT_DATA:
            return {
                ...state,
                weightData: action?.payload?.results
            };
        case GET_HOLD_DATA:
            return {
                ...state,
                holdData: action?.payload?.results
            };
        case GET_SETTELED_DATA:
            return {
                ...state,
                setteledData: action?.payload?.results
            };
        case GET_HISTORY_DATA:
            return {
                ...state,
                historyData: action?.payload
            };
        case GET_ACCEPT_DATA:
            return {
                ...state,
                acceptData: action?.payload
            };
        case GET_COMMENT_DATA:
            return {
                ...state,
                commentData: action?.payload
            };
        case GET_DISPUTE_DATA:
            return {
                ...state,
                disputeData: action?.payload
            };
        default:
            return state
    }
}