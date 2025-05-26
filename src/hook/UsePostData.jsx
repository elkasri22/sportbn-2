import { MainAxios } from "../api/api";

const UsePostData = async (url, values) => {
    const res = await MainAxios.post(url, values).then(res => res).catch(err => err);    

    if (res.response) {
        return res.response.data;
    }; 

    let response = res.data; 
    return response;
};

export default UsePostData;