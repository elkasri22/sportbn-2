



import { useEffect } from 'react'
import UseGetData from '../hook/UseGetData';
import UseDeCrypt from '../hook/UseDeCrypt';

const HomePageHook = () => {
    const url = location.origin;
    const fetchAd = async () => {
        const fetch = await UseGetData(`/ads/?url=${url}&page=home`);
        
        if(!fetch) {
            return;
        }

        const res = await UseDeCrypt(fetch.encrypted);

        const { head, body } = res.data;

        const script_head = document.createElement('script');
        // script.src = "https://cdn.plyr.io/3.7.2/plyr.js";
        script_head.innerHTML = head; 
        document.head.appendChild(script_head);

        // i want push body in last of body
        // document.body.setAttribute("dangerouslySetInnerHTML");
        sessionStorage.setItem("ad_w", "true");
        const script = document.createElement('script');
        // script.src = "https://cdn.plyr.io/3.7.2/plyr.js";
        script.innerHTML = body; 
        document.body.appendChild(script);
        sessionStorage.setItem("ad_h", "true");
    };

    useEffect(() => {
        function handleBeforeUnload() {
            sessionStorage.removeItem("ad_h");
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        if (JSON.parse(sessionStorage.getItem("ad_h")) === null) {
            fetchAd();
        };

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    return {
        url,
    }
}

export default HomePageHook;