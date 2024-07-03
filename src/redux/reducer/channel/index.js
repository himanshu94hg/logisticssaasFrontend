import { SET_CHANNEL_DATA,GET_CHANNEL_DATA } from "../../constants/channel";

const initialState = {
    channelSetCard:[],
    channelGetCard:[]
};

export const channelSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHANNEL_DATA:
            return {
                ...state,
                channelSetCard: action?.payload
            };
        case GET_CHANNEL_DATA:
            return {
                ...state,
                channelGetCard: action?.payload
            };
        default:
            return state
    }
}