import {  PATHNAME_ACTION } from "../../constants/auth";

export default function pathAction(data){
    console.log(data,"this is a action data ")
    return{
        type:PATHNAME_ACTION,
        payload:data
    }
}