import { LOGIN_DATA } from "../../constants/auth";

const initialState = {
    checkAuth: null,
};

export const authDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_DATA:
            return {
                ...state,
                checkAuth: action?.payload?.data?.access_token
            };
        default:
            return state
    }
}