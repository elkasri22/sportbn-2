import { sport_types, status_type } from "../../../global/global";
import { IoMdPlayCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const OtherOffersMobile = ({ m, leagueName, homeTeamName, awayTeamName }) => {
    return (
        <Link
            to={`/watch-now/matches/${leagueName}/${homeTeamName}/${awayTeamName}/${m._id}`}
            className="mobile_other_matches specific-bg-match rounded py-2 px-3">
            <div className="match__">
                
                <div className="star d-flex align-items-center justify-content-between">
                    {
                        m.status == status_type.live ? (
                            <div className="live-icon"></div>
                        ) : (
                            <span className="small">{m.time} - {m.date}</span>
                        )
                    }
                    <span className="m-0 small">{m.league.name}</span>
                </div>

                <div className="left w-100 me-3 d-flex justify-content-between align-items-center">

                    <div className="left-footer w-100 mt-1 me-3 d-flex align-items-center justify-content-between">
                        <div className="match__ d-flex justify-content-between align-items-center">
                            <span>{m.homeTeam.name.length > 8 ? `${m.homeTeam.name.slice(0, 8)}...` : m.homeTeam.name}</span>
                            <img src={m.homeTeam.logo} width="40px" height="40px" loading="lazy" alt="Image home team" />
                        </div>
                        <div className="score mx-3">
                            <span className="py-1 px-3 rounded d-flex justify-content-center align-items-center">{m.type == sport_types.football || m.type == sport_types.AM_football ? `${m.homeTeam.score} - ${m.awayTeam.score}` : ` - `}</span>
                        </div>

                        <div className="match__ d-flex justify-content-between align-items-center">
                            <img src={m.awayTeam.logo} width="40px" height="40px" loading="lazy" alt="Image home team" />
                            <span>{m.awayTeam.name.length > 8 ? `${m.awayTeam.name.slice(0, 8)}...` : m.awayTeam.name}</span>
                        </div>
                    </div>
                
                    <div className="right d-flex align-items-center">
                        <button className="btn-yellow rounded-circle">
                            <IoMdPlayCircle className="h5 m-0" size={25} />
                        </button>
                    </div>
                </div>

            </div>

        </Link>
    )
}

export default OtherOffersMobile;