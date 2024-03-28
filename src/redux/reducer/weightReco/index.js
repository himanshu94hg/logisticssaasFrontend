import { GET_WEIGHT_RECO_DATA,GET_WEIGHT_DATA,GET_HOLD_DATA,GET_SETTELED_DATA,GET_HISTORY_DATA } from "../../constants/weightReco";

const initialState = {
    weightRecoData: [],
    weightData:[],
    holdData:[],
    setteledData:[],
    historyData:[]
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
        default:
            return state
    }
}