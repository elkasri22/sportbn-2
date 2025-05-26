import React, { useEffect, useMemo, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./style.css";
import UseGetData from "../../hook/UseGetData";
import UseDeCrypt from "../../hook/UseDeCrypt";
import { useParams } from "react-router-dom";

export const VideoJSComponent = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { options, onReady } = props;
    const [timePause, setTimePause] = useState(0);
    const [isActiveLocker, setIsActiveLocker] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const { id } = useParams();
    const [showOverlay, setShowOverlay] = useState(true); // حالة للتحكم في عرض التراكب

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
        setShowOverlay(true); // إظهار التراكب عند تغيير المباراة
        setSeconds(0);
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }

        // تفكيك المشغل القديم عند تغيير الفيديو
        if (playerRef.current) {
            playerRef.current.dispose();
            playerRef.current = null;
        }
    }, [id]);

    useEffect(() => {
        if (isDataLoaded) {
            if (!playerRef.current && videoRef.current) {
                const videoElement = document.createElement("video-js");
                videoElement.classList.add("vjs-big-play-centered");
                videoRef.current.appendChild(videoElement);

                const player = (playerRef.current = videojs(
                    videoElement,
                    options,
                    () => {
                        onReady && onReady(player);
                        videojs.log("player is ready");

                        if (isDataLoaded && isActiveLocker) {
                            let lastTime = 0;
                            player.on("timeupdate", () => {
                                const currentTime = Math.floor(player.currentTime());
                                if (currentTime > lastTime) {
                                    setSeconds((prevSeconds) => {
                                        const newSeconds = prevSeconds + 1;
                                        console.log(newSeconds);
                                        if (newSeconds >= timePause) {
                                            player.pause();
                                            _cW();
                                            if (player.isFullscreen()) {
                                                player.exitFullscreen();
                                            }
                                            clearInterval(intervalId);
                                            setIntervalId(null);
                                        }
                                        return newSeconds;
                                    });
                                    lastTime = currentTime;
                                }
                            });
                        }

                    }
                ));

                player.on("play", () => {
                    setShowOverlay(false);
                });

                const buttonPlay = document.querySelector(".vjs-big-play-button");

                buttonPlay?.addEventListener("click", function () {
                    setShowOverlay(false);
                    setSeconds(0);

                    if (intervalId) {
                        clearInterval(intervalId);
                        setIntervalId(null);
                    }
                });
            };
        }
    }, [options, videoRef, timePause, isActiveLocker, isDataLoaded]);

    useEffect(() => {
        const player = playerRef.current;
        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [playerRef, intervalId]);

    return (
        <div data-vjs-player className="position-relative">
            {props.match && showOverlay ? (
                <>

                    <div
                        className="child-overly"
                        onClick={() => {
                            const player = playerRef.current;
                            if (player && player.paused()) {
                                player.play().catch((e) => {
                                    console.warn("Autoplay blocked:", e);
                                });
                                setShowOverlay(false);
                                setSeconds(0);
                            }
                        }}
                    >
                    
                        <div className="teams d-flex justify-content-center align-items-center gap-2">
                            <div className="team1 text-center">
                                <img
                                    src={props.match.homeTeam.logo}
                                    loading="lazy"
                                    width="100px"
                                    height="100px"
                                    alt={`Team 1 ${props.match.homeTeam.name}`}
                                />

                                <p className="m-0 fw-bold mt-2">
                                    {props.match.homeTeam.name.length > 8
                                        ? `${props.match.homeTeam.name.slice(0, 8)}...`
                                        : props.match.homeTeam.name}
                                </p>
                            </div>

                            <div className="vs text-center" style={{ width: "50px" }}>
                                <h2 className="fw-bold">vs</h2>
                            </div>

                            <div className="team2 text-center">
                                <img
                                    src={props.match.awayTeam.logo}
                                    loading="lazy"
                                    width="100px"
                                    height="100px"
                                    alt={`Team 1 ${props.match.awayTeam.name}`}
                                />

                                <p className="m-0 fw-bold mt-2">
                                    {props.match.awayTeam.name.length > 8
                                        ? `${props.match.awayTeam.name.slice(0, 8)}...`
                                        : props.match.awayTeam.name}
                                </p>
                            </div>
                        </div>

                    </div>
                </>
            ) : null}
            <div ref={videoRef} />
        </div>
    );
};

export default VideoJSComponent;
