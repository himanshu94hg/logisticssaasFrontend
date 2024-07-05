import { SCREEN_WIDTH_DATA } from "../../constants/auth"

export default function screenWidth(data){
    return{
        type:SCREEN_WIDTH_DATA,
        payload:data
    }
}