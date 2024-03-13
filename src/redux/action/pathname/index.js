import {  PATHNAME_ACTION } from "../../constants/auth";

export default function pathAction(data){
    return{
        type:PATHNAME_ACTION,
        payload:data
    }
}