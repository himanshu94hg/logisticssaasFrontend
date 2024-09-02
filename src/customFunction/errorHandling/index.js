import { toast } from "react-toastify";

export const checkType = (res) => {
    if (res) {
        for (let key in res) {
            if (res.hasOwnProperty(key)) {
                const keyType = typeof res[key];
                return keyType
            }
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
    if (res) {
        Object.keys(res)?.map(key => {
            res[key]?.map(value => {
                toast.error(`${key?.split("_").join(" ")}:${value}`)
            });
        });
    }
}

export const customErrorFunction = (error) => {
    const errorType = typeof error?.response?.data.detail;
    if (errorType === "string") {
        errorHandlefirst(error?.response?.data.detail)
    }
    else if (error?.response?.status === 500) {
        toast.error("Internal Server error!")
    }
    else if (error?.response?.status <= 400 && error?.response?.status <= 499) {
        errorHandleSecond(error?.response?.data)
        console.log(error?.response?.data,"this is a hyper link data")
    }
    else {
        toast.error("Something went wrong!")
    }
}

export const customErrorPincode = () => {
    toast.error("No data found for the given pincode!")
}