import "./style.css";
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from "react-router-dom";

const LeaguesSidebar = ({ className, AllLeagues }) => {
  const [activeLeague, setActiveLeague] = React.useState(null);

  return (
    <div className={`${cn('bg-sport-dark/40 rounded-xl p-4 w-full max-w-xs', className)} LeaguesSidebar`}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Leagues</h2>
        <div className="space-y-1">
          {AllLeagues?.length > 0 && AllLeagues.map((league, index) => (
            <LeagueItem 
              key={index}
              league={league}
              isActive={activeLeague === league.id}
              onClick={() => setActiveLeague(league.id)}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-8" style={{color: "white"}}>
        <h2 className="text-xl font-bold text-white mb-4">Teams</h2>
        <div className="text-sm text-gray-400">
          Popular teams will appear here based on your viewing history.
        </div>
      </div>
    </div>
  );
};

const LeagueItem = ({ league, isActive, onClick }) => {
  return (
    <Link to={`/watch-now/matches/${league.name.replaceAll(/ /g, "+")}`}
      onClick={onClick}
      className={`${
        cn(
          'flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200',
          isActive
            ? 'bg-sport-card/70 text-white'
            : 'text-gray-300 hover:bg-sport-card/40 hover:text-white'
        )
      } LeagueItem mt-2`}
    >
      <span className="w-6 h-6 flex items-center justify-center text-xl" style={{marginLeft: "0 !important"}}>
        <img src={league.logo} width="25px" height="25px" loading="lazy" alt="Image league" style={{
          height: "25px",
          objectFit: "contain",
        }}/>
      </span>
      <span className="text-md font-medium">{league.name}</span>
    </Link>
  );
};

export default LeaguesSidebar;
