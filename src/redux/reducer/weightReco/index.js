import { GET_WEIGHT_RECO_DATA } from "../../constants/weightReco";

const initialState = {
    weightRecoData: [],
};

export const weightRecoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WEIGHT_RECO_DATA:
            return {
                ...state,
                weightRecoData: action?.payload
            };
       
        default:
            return state
    }
}