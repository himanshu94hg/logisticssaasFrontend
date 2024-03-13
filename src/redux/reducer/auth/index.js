import { LOGIN_DATA, SIGN_UP_DATA } from "../../constants/auth";

const initialState = {
    checkAuth: null,
    signUpRes:null
};

export const authDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_DATA:
            return {
                ...state,
                checkAuth: action?.payload?.data?.access_token
            };
        case SIGN_UP_DATA:
            console.log(action.payload,"this is a reactr js data")
            return {
                ...state,
                signUpRes: action?.payload
            };
        default:
            return state
    }
}