import { sport_types, status_type } from "../../../global/global";
import { IoMdPlayCircle } from "react-icons/io";
import { Link } from "react-router-dom";


const OtherOffers = ({m, leagueName, homeTeamName, awayTeamName}) => {
    return (
        <Link 
            to={`/watch-now/matches/${leagueName}/${homeTeamName}/${awayTeamName}/${m._id}`}
            className="d-flex justify-content-between specific-bg-match rounded py-2 px-3">
            <div className="match__ d-flex justify-content-between align-items-center">
                <div className="star d-flex align-items-center">
                    <img src={m.league.logo} loading="lazy" width="40px" height="40px" alt="Image league match." />
                    <div className="flex-direction-column align-items-center ms-3">
                        {
                            m.status == status_type.live ? (
                                <div className="live-icon"></div>
                            ) : (
                                <span className="small">{m.time} - {m.date}</span>
                            )
                        }
                        <p className="m-0 small fw-semibold">{m.league.name}</p>
                    </div>
                </div>
                <div className="info-match--">
                    <img src={m.homeTeam.logo} width="40px" height="40px" loading="lazy" alt="Image home team" />
                </div>
            </div>

            <div className="score d-flex justify-content-center align-items-center">
                <span className="py-1 px-3 rounded">{m.type == sport_types.football || m.type == sport_types.AM_football ? `${m.homeTeam.score} - ${m.awayTeam.score}` : ` - `}</span>
            </div>

            <div className="match__ d-flex justify-content-between align-items-center">
                <div className="info-match--">
                    <img src={m.awayTeam.logo} width="40px" height="40px" loading="lazy" alt="Image home team" />
                </div>
                <button className="btn-yellow py-2 px-4 rounded fw-bolder d-flex align-items-center">
                    <IoMdPlayCircle className="h5 m-0 me-2" />
                    <span>Watch</span>
                </button>
            </div>

        </Link>
    )
}

export default OtherOffers;