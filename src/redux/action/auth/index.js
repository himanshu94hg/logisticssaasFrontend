import { LOGIN_DATA } from "../../constants/auth";

export default function authAction(data){
    return{
        type:LOGIN_DATA,
        payload:data
    }
}