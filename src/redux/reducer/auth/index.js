import { LOGIN_DATA, PATHCLEAR_ACTION, PATHNAME_ACTION, SIGN_UP_DATA, ZONE_MAPPING_PATH_ACTION } from "../../constants/auth";

const initialState = {
    checkAuth: null,
    signUpRes:null,
    pathName:null,
    zonePathName:null
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
        case PATHCLEAR_ACTION:
            return {
                ...state,
                pathName: action?.payload
            };
        case ZONE_MAPPING_PATH_ACTION:
            return {
                ...state,
                zonePathName: action?.payload+ new Date()
            };
        default:
            return state
    }
}