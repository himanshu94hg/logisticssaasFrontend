import axios from "axios";
import Cookies from "js-cookie";

const authToken=Cookies.get("access_token")

export const getFileData = async (endPoint) => {

    console.log(endPoint.split("."),"endPointendPointendPoint")
    const filenameWithoutExtension = endPoint.replace(".jpg", "");
    try {
        const response = await axios.get(`http://65.2.38.87:8088/core-api/master/get-presigned-url/?file_key=${endPoint}`, {
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
                // Authorization: `Bearer ${authToken}`,
            },
        });

    } catch (error) {
        console.error('Error:', error);
    }
};

