import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import "./style.css";
import UseGetData from '../../hook/UseGetData';
import UseDeCrypt from '../../hook/UseDeCrypt';

export const VideoJSComponent = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { options, onReady } = props;
    const [timePause, setTimePause] = useState(0);
    const [isActiveLocker, setIsActiveLocker] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const GetDataLocker = async () => {
        try {
            const fetch = await UseGetData("/locker");
            const res = await UseDeCrypt(fetch.encrypted);
            const data = res.data[0];
            if (data?.isActive && data?._id) {
                setTimePause(data.seconds);
                setIsActiveLocker(data.isActive);
            }
            setIsDataLoaded(true);
        } catch (error) {
            setIsDataLoaded(true);
        }
    };

    useEffect(() => {
        GetDataLocker();
    }, []);

    useEffect(() => {
        if (isDataLoaded) {
            if (!playerRef.current) {
                const videoElement = document.createElement("video-js");
                videoElement.classList.add('vjs-big-play-centered');
                videoRef.current.appendChild(videoElement);

                const player = playerRef.current = videojs(videoElement, options, () => {
                    onReady && onReady(player);
                    videojs.log('player is ready');
                });

                if(isDataLoaded && isActiveLocker){
                    setTimeout(() => {
                        _cW();
                        player.pause();
                        if (player.isFullscreen()) {
                            player.exitFullscreen();
                        }
                    }, timePause);
                };

            } else {
                const player = playerRef.current;
                player.autoplay(options.autoplay);
                player.src(options.sources);
            }
        }
    }, [options, videoRef, timePause, isActiveLocker, isDataLoaded]);

    useEffect(() => {
        const player = playerRef.current;
        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
}

export default VideoJSComponent;
