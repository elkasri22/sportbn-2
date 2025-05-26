


import React, { useEffect, useState } from 'react'
import { status_type } from '../global/global';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LeaguePageHook = () => {

    const { loading, matches } = useSelector(state => state.WebSocketMatches);

    const { league } = useParams();
    
    const leagueName = league.replaceAll("+", " ");

    const current_matches = matches.filter((item) => item.league.name === leagueName);

    const [allMatches, setAllMatches] = useState([...current_matches]);

    const result_all_matches = [...current_matches];

    const [activeTab, setActiveTab] = useState(status_type.live);

    const filterStatusMatches = (status) => {
        setActiveTab(status);
        const filteredMatches = result_all_matches.filter(match => match.status === status);
        setAllMatches(filteredMatches);
    };

    useEffect(() => {
        if (!loading) {
            filterStatusMatches(activeTab);
        }
    }, [activeTab, league, loading, matches]);

    return {
        allMatches,
        status_type,
        activeTab,
        setActiveTab,
    }

};

export default LeaguePageHook;