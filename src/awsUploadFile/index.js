import axios from "axios";
import Cookies from "js-cookie";

const authToken=Cookies.get("access_token")

export const getFileData = async (endPoint) => {
    try {
        const response = await axios.get(`https://dev.shipease.in/core-api/master/get-presigned-url/?file_key=${endPoint}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response; 

    } catch (error) {
        console.error('Error:', error);
    }
};

export const uploadImageData = async (awsUrl,formData) => {
    try {
        const categoryResponse = await axios.post(awsUrl,formData, {
            headers: {
                "Content-Type": "multipart/form-data",              
            },
        });
        return categoryResponse

    } catch (error) {
        console.error('Error:', error);
    }
};

export const deleteImageData = async (awsUrl,formData) => {
    try {
        const categoryResponse = await axios.post(awsUrl,formData, {
            headers: {
            },
        });

    } catch (error) {
        console.error('Error:', error);
    }
};

