
import { MainAxios } from "../api/api";

const UseGetData = async (url) => {
    const res = await MainAxios.get(url).then(res => res).catch(err => err);    

    if (res.response) {
        return res.response.data;
    }; 

    let response = res.data; 
    return response;
};

export default UseGetData;