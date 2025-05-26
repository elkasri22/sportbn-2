import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LogicSearch = () => {

    const { loading, matches } = useSelector(state => state.WebSocketMatches);

    let { search } = useParams();

    const [filteredMatches, setMatches] = useState([]);

    useEffect(() => {
        if(search && matches){
            search = search.replaceAll("+", " ");
            const searchedMatches = matches.filter((match) => {
                const { homeTeam, awayTeam, league } = match;
                return homeTeam.name.toLowerCase().includes(search.toLowerCase()) || awayTeam.name.toLowerCase().includes(search.toLowerCase()) || league.name.toLowerCase().includes(search.toLowerCase());
            });
        
            setMatches(searchedMatches);
        }
    }, [search, loading]);

    return {
        search,
        filteredMatches,
        loading
    };
};

export default LogicSearch;
