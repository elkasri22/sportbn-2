import { useState } from 'react';
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import UseDeCrypt from '../../hook/UseDeCrypt';

const AppLogicHook = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const socket = io("https://dashcontrol.space", {
        autoConnect: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
    });

    socket.on("matches", async (matches) => {
        const deCoded = await UseDeCrypt(matches);
        const { data } = deCoded;

        await dispatch({
            type: "WebSocketMatches/watchingWebSocketMatches",
            payload: data
        });
    });

    return {
        loading
    }

}

export default AppLogicHook
