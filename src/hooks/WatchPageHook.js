



import { useEffect } from 'react'
import UseGetData from '../hook/UseGetData';
import UseDeCrypt from '../hook/UseDeCrypt';

const WatchPageHook = () => {
    const url = location.origin;
    const fetchAd = async () => {
        const fetch = await UseGetData(`/ads/?url=${url}&page=watch`);
        
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


        sessionStorage.setItem("re_p", "true");
    };

    useEffect(() => {
        function handleBeforeUnload() {
            sessionStorage.removeItem("ad_w");
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        const path = window.location.pathname;
        const parts = path.split('/');
        const id = parts[parts.length - 1];

        if (JSON.parse(sessionStorage.getItem("ad_w")) === null) {
            fetchAd();
        }
        
    }, []);

    return {
        url
    }
}

export default WatchPageHook;