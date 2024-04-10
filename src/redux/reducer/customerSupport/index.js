import { TICKET_UPDATE_DATA } from "../../constants/customerSupport";

const inititalState = {
    ticketStatus: null
}

export const customerSupportReducer = (state = inititalState, action) => {
    switch (action.type) {
        case TICKET_UPDATE_DATA:
            return {
                ...state,
                ticketStatus: action?.payload+new Date()
            }

        default:
            return state;
    }

}