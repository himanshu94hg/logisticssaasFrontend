import { SUBSCRIPTION_STATUS_DATA } from "../../constants/auth";

export default function planAction(data) {
    return {
        type: SUBSCRIPTION_STATUS_DATA,
        payload: data
    }
}