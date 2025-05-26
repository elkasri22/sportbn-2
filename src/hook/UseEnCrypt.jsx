import CryptoJS from "crypto-js";

const UseEnCrypt = (data) => {
    const secretKey = import.meta.env.VITE_ENCRYPTION_KEY;
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export default UseEnCrypt;