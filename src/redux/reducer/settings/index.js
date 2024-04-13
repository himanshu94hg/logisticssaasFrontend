import { GET_DEFAULT_WAREHOUSE_UPDATE, GET_WAREHOUSE_DETAILS_DATA } from "../../constants/settings";

const initialState = {
    defaultWarehouseRes:[],
    warehouseDetails:null,
};

export const settingsSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEFAULT_WAREHOUSE_UPDATE:
            return {
                ...state,
                defaultWarehouseRes: action?.payload +new Date()
            };
        case GET_WAREHOUSE_DETAILS_DATA:
            return {
                ...state,
                warehouseDetails: action?.payload 
            };
      
        default:
            return state
    }
}