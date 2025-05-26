import { useEffect, useState } from 'react';
import { sport_types, status_type } from '../global/global';
import { useDispatch, useSelector } from 'react-redux';
import { changeTypeSport } from '../redux/matchesReducer';

const LogicFilteringMatches = () => {
    // Mock data for the matches
    const dispatch = useDispatch();

    const { currentTypeSport } = useSelector(state => state.WebSocketMatches);

    const { loading, matches } = useSelector(state => state.WebSocketMatches);

    const [AllCurrentMatches, setAllCurrentMatches] = useState([...matches]);

    const [allMatches, setMatches] = useState(AllCurrentMatches);
    const [activeTab, setActiveTab] = useState(status_type.live);
    const [activeSport, setActiveSport] = useState(sport_types.all);

    const filterStatusMatches = async (status) => {
        setActiveTab(status);

        let filteredMatches;

        if (status === status_type.upcoming) {

            const matches_upcoming = matches.filter(match => match.status === status);

            function sortMatchesByProximity(matches) {
                const now = new Date();
                const today = now.toISOString().slice(0, 10); // الحصول على التاريخ الحالي بتنسيق YYYY-MM-DD

                const getMatchDateTime = (match) => {
                    const [year, month, day] = match.date.split('-').map(Number);
                    const [hours, minutes] = match.time.split(':').map(Number);
                    return new Date(year, month - 1, day, hours, minutes); // إنشاء كائن Date لكائن المباراة
                };

                const sortedMatches = [...matches].sort((matchA, matchB) => {
                    const dateTimeA = getMatchDateTime(matchA);
                    const dateTimeB = getMatchDateTime(matchB);

                    // إعطاء الأولوية للمباريات القادمة
                    if (matchA.status === "upcoming" && matchB.status !== "upcoming") {
                        return -1;
                    }
                    if (matchB.status === "upcoming" && matchA.status !== "upcoming") {
                        return 1;
                    }

                    // إذا كانت كلتا المباراتين قادمتين أو ليستا قادمتين، نقارن حسب التاريخ والوقت
                    const diffA = Math.abs(dateTimeA - now);
                    const diffB = Math.abs(dateTimeB - now);

                    return diffA - diffB;
                });

                return sortedMatches;
            }

            filteredMatches = await sortMatchesByProximity(matches_upcoming);

        } else if (status === status_type.live) {
            filteredMatches = matches.filter(match => match.status === status);
        };

        filterSportMatches(filteredMatches, activeSport);
    };

    const filterSportMatches = (matches, sport) => {
        if (sport === sport_types.all) {
            setMatches(matches);
        } else {
            const filteredSportMatches = matches.filter(match => match.type === sport);
            setMatches(filteredSportMatches);
        }
    };

    useEffect(() => {
        filterStatusMatches(activeTab);
    }, [activeSport, loading, matches, AllCurrentMatches]);

    const ClickOnTypeSport = (sport) => {
        setActiveSport(sport);
        dispatch(changeTypeSport(sport));
    };

    return {
        loading,
        activeTab,
        allMatches,
        activeSport,
        setActiveSport,
        ClickOnTypeSport,
        currentTypeSport,
        sport_types,
        status_type,
        filterStatusMatches,
    };
};

export default LogicFilteringMatches;
