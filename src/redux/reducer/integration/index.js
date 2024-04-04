import { GET_API_KEY } from "../../constants/integration";

const inititalState = {
    apiKey: null
}

export const integrationReducer = (state = inititalState, action) => {
    switch (action.type) {
        case GET_API_KEY:
            return {
                ...state,
                apiKey: action?.payload
            }

        default:
            return state;
    }

}