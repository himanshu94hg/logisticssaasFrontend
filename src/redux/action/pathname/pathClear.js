import { PATHCLEAR_ACTION } from "../../constants/auth"

export default function pathClearAction(data) {
    return {
        type: PATHCLEAR_ACTION,
        payload: data
    }
}