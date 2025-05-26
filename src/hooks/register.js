import UsePostData from "../hook/UsePostData";
import UseDeCrypt from "../hook/UseDeCrypt";
import { useState } from "react";

const RegisterHook = () => {

    const [isRegistered, setIsRegistered] = useState(JSON.parse(localStorage.getItem("_r")) || false);
    const [loading, setLoading] = useState(false);

    const onSubmitRegister = async(e) => {
        e.preventDefault();

        const urlSite = window.location.origin;

        const values = {
            url: urlSite,
            email: e.target.email.value,
        };

        setLoading(true);
        const fetch = await UsePostData("/emails", values);
        setLoading(false);

        const res = await UseDeCrypt(fetch.encrypted);

        if (res.status === "success") {
            // toast from right top of the screen
            localStorage.setItem("_r", "true");
            setIsRegistered(true);
        };

    };

    return{
        isRegistered,
        onSubmitRegister,
        loading,
    }
};

export default RegisterHook;