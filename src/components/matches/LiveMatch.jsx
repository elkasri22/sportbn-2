import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { FiPlay } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { cn } from '@/lib/utils';
import { sport_types } from '../../global/global';

const LiveMatch = ({ _id, league, homeTeam, awayTeam, status, time, style, type="football" }) => {
  const [isHovered, setIsHovered] = useState(false);

  // replace " " with "+" with use regex
  const leagueName = league.name.replaceAll(/ /g, "+");
  const homeTeamName = homeTeam.name.replaceAll(/ /g, "+");
  const awayTeamName = awayTeam.name.replaceAll(/ /g, "+");

  const innerWidth = window.innerWidth;

  return (
    <Link
      to={`/watch-now/matches/${leagueName}/${homeTeamName}/${awayTeamName}/${_id}`}
      className="match-card rounded-xl overflow-hidden animate-fade-in hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
    >
      <div className="p-3 flex items-center justify-between border-b border-gray-800/30">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <img
              src={league.logo}
              width={25}
              height={25}
              loading="lazy"
              alt={league.name}
              className="w-6 h-6 me-2"
              style={{minHeight: "25px", minWidth: "25px", height: "25px", width: "25px", objectFit: "contain"}}
            />
          </div>

          <div>
            {status === "live" && (
              <div className="live-indicator text-xs font-medium text-sport-green" style={{fontSize: "12px"}}>
                LIVE
              </div>
            )}
            {status === "upcoming" && (
              <div className="text-xs font-medium text-amber-400 flex items-center" style={{fontSize: "12px"}}>
                <GoClock size={12} className="mr-1" /> {time || "upcoming"}
              </div>
            )}
            <div className="text-xs text-gray-400" style={{fontSize: "12px"}}>
              {league.name}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-sport-card-hover rounded-md px-2 py-1 text-xs text-gray-400" style={{fontSize: "15px", textTransform: "capitalize"}}>
            {type}
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between content-match">
        <div className="flex items-center space-x-3 w-[40%]" style={{width: "40%"}}>
          <div className="w-10 h-10 flex items-center justify-center bg-gray-800/30 rounded-full overflow-hidden">
            <img src={homeTeam.logo} width={35} height={35} loading="lazy" alt={homeTeam.name} className="w-6 h-6 object-contain" style={{minHeight: "35px", minWidth: "35px", height: "35px", width: "35px"}}/>
          </div>
          {
            innerWidth > 991 ? (
              <span className="text-white text-sm font-medium truncate">{homeTeam.name}</span>

            ) : (
              <span className="text-white text-sm font-medium truncate">{homeTeam.name.length > 8 ? `${homeTeam.name.slice(0, 8)}..` : homeTeam.name}</span>
            )
          }
        </div>

        <div className="px-3 py-1 rounded-md min-w-16 text-center" style={{width: "20%", display: "flex", justifyContent: "center"}}>
          {status === "live" ? (
            <span className="text-white text-lg font-bold small">{type === sport_types.football || type === sport_types.AM_football ? `${homeTeam.score} - ${awayTeam.score}` : " - "}</span>
          ) : (
            <span className="text-gray-400 text-lg">VS</span>
          )}
        </div>

        <div className="flex items-center space-x-3 w-[40%]" style={{width: "40%", display: "flex", justifyContent: "end"}}>
          {
            innerWidth > 991 ? (
              <span className="text-white text-sm font-medium truncate">{awayTeam.name}</span>

            ) : (
              <span className="text-white text-sm font-medium truncate">{awayTeam.name.length > 8 ? `${awayTeam.name.slice(0, 8)}..` : awayTeam.name}</span>
            )
          }          <div className="w-10 h-10 flex items-center justify-center bg-gray-800/30 rounded-full overflow-hidden">
            <img src={awayTeam.logo} width={35} height={35} loading="lazy" alt={awayTeam.name} className="w-6 h-6 object-contain" style={{minHeight: "35px", minWidth: "35px", height: "35px", width: "35px"}}/>
          </div>
        </div>
      </div>

      <div
        className={cn(
          isHovered ? "bg-sport-green" : "bg-sport-card",
        )}
      >
        <button
          className={`p-3 flex justify-center items-center border-t w-full ${cn(
            "flex items-center justify-center text-sm font-medium",
            isHovered ? "text-black" : "text-white"
          )}`}
          id="watch-now-button"
        >
          <FiPlay size={16} className="mr-2" style={{marginRight: "8px"}}/>
          Watch Match
        </button>
      </div>
    </Link>
  );
};

export default LiveMatch;
