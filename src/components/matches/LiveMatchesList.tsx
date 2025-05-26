import LiveMatch from './LiveMatch';
import { Button } from '@/components/ui/button';
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBarChart } from "react-icons/bs";
import { LuFlame } from "react-icons/lu";
import "./styles.css";


const LiveMatchesList = ({ loading=false, allMatches,  activeTab, activeSport, setActiveSport, sport_types, status_type, ClickOnTypeSport, filterStatusMatches, filtersBtn = true }) => {

  const innerWidth = window.innerWidth;

  return (
    <div className="space-y-4 w-full" style={{ minHeight: '100vh', width: '100%' }}>
      <div className="flex items-center justify-between mb-6 matches-header">
        <div className="flex items-center gap-2" style={{ zIndex: "-1" }}>
          {activeTab === status_type.live ? (
            <div className="flex items-center gap-3 animate-pulse-soft">

              {
                innerWidth < 992 ? (
                  <>
                    <div className="text-xl">
                      <img src="https://raw.githubusercontent.com/elkasri22/sportbn/refs/heads/main/live.webp" width="30" height="30" loading="lazy" alt="Icon live sport" />
                    </div>
                    <h2 className="font-bolder text-white m-0" style={{fontSize: "1.05em"}}>Live Matches</h2> <br />
                  </>
                ) : (
                  <>
                    <div className="text-2xl">
                      <img src="https://raw.githubusercontent.com/elkasri22/sportbn/refs/heads/main/live.webp" width="35" height="35" loading="lazy" alt="Icon live sport" />
                    </div>
                    <h2 className="text-xl font-bold text-white m-0">Live Matches</h2>
                  </>
                )
              }

            </div>
          ) : (
            <div className="flex items-center gap-3">
              <FaRegCalendarAlt className="text-sport-gold" size={24} />
              <h2 className="text-xl font-bold text-white m-0">Upcoming Matches</h2>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant={activeTab === status_type.live ? "default" : "outline"}
            size="sm"
            onClick={() => filterStatusMatches(status_type.live)}
            className={activeTab === status_type.live ? "bg-sport-green hover:bg-sport-green/90 text-black" : ""}
          >
            <LuFlame size={16} className="mr-1" /> Live
          </Button>
          <Button
            variant={activeTab === status_type.upcoming ? "default" : "outline"}
            size="sm"
            onClick={() => filterStatusMatches(status_type.upcoming)}
            className={activeTab === status_type.upcoming ? "bg-amber-500 hover:bg-amber-500/90 text-black" : ""}
          >
            <FaRegCalendarAlt size={16} className="mr-1" /> Upcoming
          </Button>
        </div>
      </div>

      {
        filtersBtn ? (
          <div className="flex flex-wrap gap-2 mb-4 matches-filters">
            <Button
              variant="outline"
              size="sm"
              onClick={() => ClickOnTypeSport(sport_types.all)}
              className={activeSport === 'all' ? "bg-gray-700" : ""}
            >
              All Sports
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => ClickOnTypeSport(sport_types.football)}
              className={activeSport === sport_types.football ? "bg-gray-700" : ""}
            >
              Football
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => ClickOnTypeSport(sport_types.basketball)}
              className={activeSport === sport_types.basketball ? "bg-gray-700" : ""}
            >
              Basketball
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => ClickOnTypeSport(sport_types.tennis)}
              className={activeSport === sport_types.tennis ? "bg-gray-700" : ""}
            >
              Tennis
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => ClickOnTypeSport(sport_types.hockey)}
              className={activeSport === sport_types.hockey ? "bg-gray-700" : ""}
            >
              Hockey
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => ClickOnTypeSport(sport_types.AM_football)}
              className={activeSport === sport_types.AM_football ? "bg-gray-700" : ""}
            >
              AM. Football
            </Button>
          </div>
        ) : null
      }

      <div className="grid grid-cols-1 gap-4">
        {
          loading ? (
            <div className="loaderr"> 
            <div className="lds-ripple"><div></div><div></div></div>
            <small>
              Wait for the matches to load...
            </small>
            </div>
          ) : (
            allMatches && allMatches.length > 0 ? (
              allMatches.map((match, index) => (
                <LiveMatch
                  key={match._id}
                  {...match}
                  // Delay animation for staggered effect
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
              <BsBarChart size={48} className="text-gray-500 mb-4" />
              <h3 className="text-gray-300 text-lg font-medium mb-2">No matches found</h3>
              <p className="text-white-500">There are no {activeTab} matches available at the moment.</p>
            </div>
            )
          )
        }
      </div>

    </div>
  );
};

export default LiveMatchesList;
