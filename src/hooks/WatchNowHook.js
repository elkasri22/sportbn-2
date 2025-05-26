import React, { useEffect, useState } from 'react';
import videojs from 'video.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WatchNowHook = () => {

    const thumbNail = "https://raw.githubusercontent.com/elkasri22/sportbn/refs/heads/main/bg.webp";

    const { id } = useParams();

    const { loading, matches } = useSelector(state => state.WebSocketMatches);

    const [match, setMatch] = useState({});
    const [otherMatches, setOtherMatches] = useState([]);

    useEffect(() => {
        if(!loading){
            const currentMatch = matches.filter((m) => m._id == id)[0];
            if(currentMatch){
                setMatch(currentMatch);
            };
        }
    }, [id, loading, matches]);

    useEffect(() => {
        if(!loading && match){
            const otherMatches = matches.filter((m) => {
                if(m.type === match.type && m._id != id){  
                    return m;
                }
            });
            setOtherMatches(otherMatches.slice(0,4));
        }
    }, [loading, matches, match]);
    
    const videoJsOptions = {
        autoplay: false,
        poster: thumbNail,
        pictureInPictureToggle: false,
        playsinline: true,
        controlBar: {
            volumePanel: {
                inline: false
            }
        },
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: match.matchUrl,
            type: "video/mp4"
        }, {
            src: match.matchUrl,
            type: "video/webm"
        }, {
            src: match.matchUrl,
            type: "application/x-mpegURL"
        }]
    };

    const videoJsOptionsUpcoming = {
        poster: thumbNail,
        responsive: true,
        fluid: true,
    };

    const playerRef = React.useRef(null);

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };
    

    return{
        match,
        otherMatches,
        videoJsOptions,
        videoJsOptionsUpcoming,
        handlePlayerReady
    }
};

export default WatchNowHook;
