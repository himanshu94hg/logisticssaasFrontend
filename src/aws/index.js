
const authToken=Cookies.get("access_token")

const getFileData = async (endPoint) => {
    try {
        const categoryResponse = await axios.get(`http://65.2.38.87:8088/core-api/master/get-presigned-url/?file_key=${endPoint}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

    } catch (error) {
        console.error('Error:', error);
    }
};

const uploadImageData = async (url) => {
    try {
        const categoryResponse = await axios.post(url, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

    } catch (error) {
        console.error('Error:', error);
    }
};
const deleteImageData = async (url) => {
    try {
        const categoryResponse = await axios.post(url, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

    } catch (error) {
        console.error('Error:', error);
    }
};

