import { GET_DEFAULT_WAREHOUSE_UPDATE } from "../../constants/settings";

const initialState = {
    defaultWarehouseRes:[],
};

export const settingsSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEFAULT_WAREHOUSE_UPDATE:
            return {
                ...state,
                defaultWarehouseRes: action?.payload +new Date()
            };
      
        default:
            return state
    }
}