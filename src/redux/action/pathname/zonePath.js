import { ZONE_MAPPING_PATH_ACTION } from "../../constants/auth";

export default function zonePathClearAction(data){
    return{
        type:ZONE_MAPPING_PATH_ACTION,
        payload:data
    }
}