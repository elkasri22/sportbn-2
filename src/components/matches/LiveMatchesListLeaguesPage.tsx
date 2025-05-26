import LiveMatch from './LiveMatch';
import { Button } from '@/components/ui/button';
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBarChart } from "react-icons/bs";
import { LuFlame } from "react-icons/lu";
import LeaguePageHook from "../../hooks/LeaguePageHook";

const LiveMatchesListLeaguesPage = () => {

  const innerWidth = window.innerWidth;

  const { allMatches, activeTab, setActiveTab, status_type } = LeaguePageHook();

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
                    <h2 className="text-xl font-bold text-white m-0 h5">Live Matches</h2> <br />
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
            onClick={() => setActiveTab(status_type.live)}
            className={activeTab === status_type.live ? "bg-sport-green hover:bg-sport-green/90 text-black" : ""}
          >
            <LuFlame size={16} className="mr-1" /> Live
          </Button>
          <Button
            variant={activeTab === status_type.upcoming ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(status_type.upcoming)}
            className={activeTab === status_type.upcoming ? "bg-amber-500 hover:bg-amber-500/90 text-black" : ""}
          >
            <FaRegCalendarAlt size={16} className="mr-1" /> Upcoming
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {allMatches.map((match, index) => (
          <LiveMatch
            key={match._id}
            {...match}
            // Delay animation for staggered effect
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>

      {allMatches.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BsBarChart size={48} className="text-gray-500 mb-4" />
          <h3 className="text-gray-300 text-lg font-medium mb-2">No matches found</h3>
          <p className="text-gray-500">There are no {activeTab} matches available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default LiveMatchesListLeaguesPage;
