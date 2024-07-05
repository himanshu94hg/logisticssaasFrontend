import { PATHNAME_ACTION } from "../../constants/auth";

export default function pathAction(data) {
    console.log(data,'zzzzzzzzzzzzzz')

    return {
        type: PATHNAME_ACTION,
        payload: data
    }
}
