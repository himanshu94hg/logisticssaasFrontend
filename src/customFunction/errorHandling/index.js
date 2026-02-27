import { toast } from "react-toastify";

/** When REACT_APP_SUPPRESS_API_ERROR_TOASTS=true, API error toasts are suppressed (useful for dev/dummy mode when APIs fail). Remove or set false for production. */
const SUPPRESS_API_ERROR_TOASTS = process.env.REACT_APP_SUPPRESS_API_ERROR_TOASTS === 'true';

/** Dedupe window: same message shown again within this ms is skipped (prevents duplicate toasts on refresh). */
const DEDUPE_MS = 3000;
let lastMessage = '';
let lastShownAt = 0;

/** Use this for API error toasts so they respect REACT_APP_SUPPRESS_API_ERROR_TOASTS. Deduplicates identical messages within 3s. */
export const showErrorToast = (message) => {
    if (!SUPPRESS_API_ERROR_TOASTS && message) {
        const now = Date.now();
        const isDuplicate = lastMessage === message && (now - lastShownAt) < DEDUPE_MS;
        if (!isDuplicate) {
            lastMessage = String(message);
            lastShownAt = now;
            toast.error(message);
        }
    }
};

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
    showErrorToast(res);
};
export const errorinApi = (res) => {
    showErrorToast("Api called failed!");
};

export const errorHandleSecond = (res) => {
    if (!res) return;
    Object.keys(res).forEach(key => {
        const val = res[key];
        const label = key?.split("_").join(" ");
        if (Array.isArray(val)) {
            val.forEach(v => showErrorToast(`${label}: ${v}`));
        } else if (typeof val === 'string') {
            showErrorToast(`${label}: ${val}`);
        } else if (val && typeof val === 'object') {
            showErrorToast(`${label}: ${JSON.stringify(val)}`);
        }
    });
};

export const customErrorFunction = (error) => {
    const errorType = typeof error?.response?.data?.detail;
    if (errorType === "string") {
        errorHandlefirst(error?.response?.data?.detail);
    }
    else if (error?.response?.status === 500) {
        showErrorToast("Internal Server error!");
    }
    else if (error?.response?.status >= 400 && error?.response?.status <= 499) {
        errorHandleSecond(error?.response?.data);
    }
    else {
        showErrorToast("Something went wrong!");
    }
};

export const customErrorPincode = () => {
    showErrorToast("No data found for the given pincode!");
};