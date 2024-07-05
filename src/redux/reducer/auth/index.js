import { CHECK_AUTH_DATA, LOGIN_DATA, PATHCLEAR_ACTION, PATHNAME_ACTION, SCREEN_WIDTH_DATA, SIGN_UP_DATA, ZONE_MAPPING_PATH_ACTION } from "../../constants/auth";

const initialState = {
    checkAuth: null,
    signUpRes: null,
    pathName: null,
    zonePathName: null,
    screenWidthData:null,
    checkAuthIsValid:""
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
            console.log(action.payload,'aaaaaaaaaaaaaaaaa')
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
                zonePathName: action?.payload + new Date()
            };
        case SCREEN_WIDTH_DATA:
            return {
                ...state,
                screenWidthData: action?.payload
            };
        case CHECK_AUTH_DATA:
            return {
                ...state,
                checkAuthIsValid: action?.payload
            };
        default:
            return state
    }
}