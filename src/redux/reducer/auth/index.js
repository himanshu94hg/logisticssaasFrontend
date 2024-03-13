import { LOGIN_DATA, PATHNAME_ACTION, SIGN_UP_DATA } from "../../constants/auth";

const initialState = {
    checkAuth: null,
    signUpRes:null,
    pathName:null
};

export const authDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_DATA:
            return {
                ...state,
                checkAuth: action?.payload?.data?.access_token
            };
        case SIGN_UP_DATA:
            return {
                ...state,
                signUpRes: action?.payload
            };
        case PATHNAME_ACTION:
            return {
                ...state,
                pathName: action?.payload
            };
        default:
            return state
    }
}