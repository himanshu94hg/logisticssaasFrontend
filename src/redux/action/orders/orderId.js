import {  GET_ORDER_ID_DATA } from "../../constants/orders";

export default function orderIdAction(data){
    return{
        type:GET_ORDER_ID_DATA,
        payload:data
    }
}
