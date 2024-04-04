import { PATHCLEAR_ACTION } from "../../constants/auth"

export default function pathClearAction(data){
    console.log(data,"this is a action data ")
    return{
        type:PATHCLEAR_ACTION,
        payload:data
    }
}