import { SET_CHANNEL_DATA } from "../../constants/channel";

const initialState = {
    channelSetCard:[],
};

export const channelSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHANNEL_DATA:
            return {
                ...state,
                paymentSetCard: action?.payload
            };
        default:
            return state
    }
}