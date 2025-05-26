import "./style.css";
import 'video.js/dist/video-js.css';
import WatchNowHook from "../../hooks/WatchNowHook";
import { useMemo, lazy } from "react";
import { status_type, sport_types } from "../../global/global";
const VideoJSComponent = lazy(() => import("../VideoJS/component"))
const OtherOffers = lazy(() => import("./otherOffers/component"));
const OtherOffersMobile = lazy(() => import("./otherOffers/mobile"));
const MetaData = lazy(() => import("../Helmet/component"))

const WatchPart = () => {

    const { match, otherMatches, videoJsOptions, videoJsOptionsUpcoming, handlePlayerReady } = WatchNowHook();

    const innerWidth = window.innerWidth;

    const renderedContent = useMemo(() => {

        if (match._id && otherMatches) {

            return (
                <div className="watch-part pt-4">
                    <MetaData title={`sportbn | ${match.homeTeam.name} vs ${match.awayTeam.name} - Watch Now`} des={`Watch Now ${match.type} Live Stream Free`} />
                    <div className="head">
                        <h1 className="fw-bolder m-0">{match.homeTeam.name} vs {match.awayTeam.name}</h1>
                        <p className="fw-semibold mt-2">{match.date} - {match.time}</p>
                    </div>

                    <div className="content-watches-now mt-3">
                        {
                            match.status == status_type.live ? (
                                match.type_match == "video" ? (
                                    <VideoJSComponent options={videoJsOptions} onReady={handlePlayerReady} match={match} />
                                ) : (
                                    <iframe width="560" height="315" src={match.matchUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>)
                            ) : (
                                <div className="overly active position-relative">
                                    <VideoJSComponent options={videoJsOptionsUpcoming} />
                                    <div className="overly-bg"></div>
                                    <div className="child-overly">

                                        <div className="teams d-flex justify-content-center align-items-center gap-2">
                                            <div className="team1 text-center">
                                                <img src={match.homeTeam.logo} loading="lazy" width="100px" height="100px" alt={`Team 1 ${match.homeTeam.name}`} />
                                                <p className="m-0 fw-bold mt-2">
                                                    {match.homeTeam.name.length > 8 ? `${match.homeTeam.name.slice(0, 8)}...` : match.homeTeam.name}
                                                </p>
                                            </div>
                                            <div className="vs text-center" style={{ width: "50px" }}>
                                                <h2 className="fw-bold">vs</h2>
                                            </div>
                                            <div className="team2 text-center">
                                                <img src={match.awayTeam.logo} loading="lazy" width="100px" height="100px" alt={`Team 1 ${match.awayTeam.name}`} />
                                                <p className="m-0 fw-bold mt-2">
                                                    {match.awayTeam.name.length > 8 ? `${match.awayTeam.name.slice(0, 8)}...` : match.awayTeam.name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="hint text-center mt-3 fw-bold">
                                            Check the time!
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            match.status === status_type.live && (
                                <div
                                    style={{
                                        marginTop: '10px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <a
                                        onClick={() => _cW()}
                                        className="btn btn-outline-info mx-1"
                                        style={{ textAlign: 'center' }}
                                    >
                                        Watch Now{' '}
                                        <i className="fa fa-film" style={{ color: 'orange' }} aria-hidden="true"></i>
                                        <br />
                                        <span style={{ fontSize: '11px', color: '#6a8aaa' }}>Quality: 4K-HD</span>
                                    </a>
                                </div>
                            )
                        }



                        <div className="info-match specific-bg-match mt-5 mb-4 d-flex justify-content-center align-items-center rounded">
                            <div className="team1">
                                <div className="content-t1 d-flex justify-content-end gap-2 align-items-center">
                                    <h6 className="fw-500">
                                        Home Team: {match.homeTeam.name} <br />
                                        {match.type == sport_types.football || match.type == sport_types.AM_football ? `Score: ${match.homeTeam.score}` : null}
                                    </h6>
                                    <img src={match.homeTeam.logo} className="ms-3" loading="lazy" width="60px" height="60px" alt={`Team 1 ${match.homeTeam.name}`} />
                                    <span className="text-center">{match.homeTeam.name}</span>
                                </div>
                            </div>

                            <div className="date-start mx-5 text-center">
                                <p className="fw-bold m-0 h3">{match.time}</p>
                                <p className="space m-0 h6">{match.time} - {match.date}</p>
                            </div>

                            <div className="team2">
                                <div className="content-t2 d-flex gap-2 align-items-center">
                                    <img src={match.awayTeam.logo} className="me-3" loading="lazy" width="60px" height="60px" alt={`Team 1 ${match.awayTeam.name}`} />
                                    <span className="text-center">{match.awayTeam.name}</span>
                                    <h6 className="fw-500">
                                        Away Team: {match.awayTeam.name} <br />
                                        {match.type == sport_types.football || match.type == sport_types.AM_football ? `Score: ${match.awayTeam.score}` : null}
                                    </h6>
                                </div>
                            </div>

                        </div>
                    </div>

                    {
                        otherMatches.length > 0 ? (
                            <div className="other_matches mb-4">
                                <h1 className="fw-bold my-4" style={{ fontSize: "20px" }}>Other Matches</h1>

                                <div className="matches d-grid gap-2">

                                    {
                                        otherMatches.map((m, i) => {
                                            // replace " " with "+" with use regex
                                            const leagueName = m.league.name.replaceAll(/ /g, "+");
                                            const homeTeamName = m.homeTeam.name.replaceAll(/ /g, "+");
                                            const awayTeamName = m.awayTeam.name.replaceAll(/ /g, "+");


                                            return (
                                                innerWidth > 992 ? (
                                                    <OtherOffers key={i} m={m} leagueName={leagueName} homeTeamName={homeTeamName} awayTeamName={awayTeamName} />
                                                ) : (
                                                    <OtherOffersMobile key={i} m={m} leagueName={leagueName} homeTeamName={homeTeamName} awayTeamName={awayTeamName} />
                                                )
                                            )
                                        })
                                    }

                                </div>

                            </div>
                        ) : null
                    }

                </div>
            );
        } else {
            return <h5>Loading...</h5>;
        }
    }, [match, otherMatches]);

    return renderedContent;
};

export default WatchPart;
