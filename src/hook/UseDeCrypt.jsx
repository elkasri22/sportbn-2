import CryptoJS from "crypto-js";

const UseDeCrypt = (encryptedData) => {
    const secretKey = import.meta.env.VITE_ENCRYPTION_KEY;
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export default UseDeCrypt;