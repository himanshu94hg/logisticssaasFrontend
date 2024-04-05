import { toast } from "react-toastify";

export const checkType = (res) => {
    for (let key in res) {
        if (res.hasOwnProperty(key)) {
            const keyType = typeof res[key];
            return keyType
        }
    }
}

export const errorHandlefirst = (res) => {
    toast.error(res)
}
export const errorinApi = (res) => {
    toast.error("Api called failed!")
}

export const errorHandleSecond = (res) => {
    Object.keys(res)?.map(key => {
        res[key].map(value => {
            toast.error(`${key.split("_").join(" ")}:${value}`)
        });
    });
}