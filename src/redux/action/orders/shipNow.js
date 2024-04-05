import {  SHIP_NOW_DATA } from "../../constants/orders";

export default function shipNowAction(data){
    return{
        type:SHIP_NOW_DATA,
        payload:data
    }
}