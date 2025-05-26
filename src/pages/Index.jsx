import React, { lazy } from 'react';
import MetaData from '../components/Helmet/component';
import { Suspense } from 'react';
import Loader from "../components/Loader/component";
import HomePageHook from '../hooks/HomePageHook';
import LogicFilteringMatches from '../hooks/filteringMatches';
import { AllLeagues, AllLeaguesBasketball, AllLeaguesTennis, AllLeaguesHockey, AllLeaguesAmFootball } from '../global/global';

const LeaguesSidebar = lazy(() => import('@/components/leagues/LeaguesSidebar'));
const LiveMatchesList = lazy(() => import('@/components/matches/LiveMatchesList'));

const Index = () => {

  const innerWidth = window.innerWidth;

  const { url } = HomePageHook();

  const { loading, allMatches, activeTab, activeSport, setActiveSport, currentTypeSport, sport_types, ClickOnTypeSport, status_type, filterStatusMatches } = LogicFilteringMatches();

  return (
    <div className="min-h-screen bg-sport-dark max-w-7xl mx-auto container parent">
      <MetaData title="sportbn | You can watch any football, basketball and tennis matches live and upcoming." des="LiveSport is a platform that provides live streaming of football, basketball and tennis matches."/>

      {/* Create popup here */}

      <Suspense fallback={<Loader />}>
        <main className="pt-24 pb-16 lg:px-8 max-w-7xl mx-auto" style={{ marginTop: innerWidth < 992 ? '4rem' : '6rem' }}>
          <div className="flex flex-row lg:flex-row gap-6 row_f">
            {/* Sidebar */}
            <div className="lg:w-1/4 animate-slide-up desktop-sidebar">          
              {
                currentTypeSport === "all" || currentTypeSport === "football" ? (
                  <LeaguesSidebar AllLeagues={AllLeagues} />
                ) : (
                  currentTypeSport === sport_types.basketball ? (
                    <LeaguesSidebar AllLeagues={AllLeaguesBasketball} />
                  ) : (
                    currentTypeSport === sport_types.tennis ? (
                      <LeaguesSidebar AllLeagues={AllLeaguesTennis} />
                    ) : (
                      currentTypeSport === sport_types.hockey ? (
                        <LeaguesSidebar AllLeagues={AllLeaguesHockey} />
                      ) : (
                        currentTypeSport === sport_types.AM_football ? (
                          <LeaguesSidebar AllLeagues={AllLeaguesAmFootball} />
                        ) : null
                      )
                    )
                  )
                )
              }
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 flex-1 animate-slide-up" style={{ animationDelay: '0.1s', width: "100%" }}>
              <div className="flex items-center justify-between mb-2 title_live_matches">
                {
                  innerWidth < 992 ? (
                    <>
                    <h2 className="font-bolder text-white m-0" style={{fontSize: "1.12em"}}>Live Matches</h2>
                    </>
                  ) : (
                    <h1 className="text-2xl font-bold text-white mb-0">Live Matches</h1>
                  )
                }
              </div>

              <LiveMatchesList loading={loading} allMatches={allMatches} activeTab={activeTab} activeSport={activeSport} setActiveSport={setActiveSport} ClickOnTypeSport={ClickOnTypeSport} sport_types={sport_types}
                status_type={status_type} filterStatusMatches={filterStatusMatches}
              />

            </div>
          </div>
        </main>
      </Suspense>

    </div >
  );
};

export default Index;
