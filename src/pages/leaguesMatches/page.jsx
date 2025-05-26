import React, { lazy } from 'react';
import MetaData from '../../components/Helmet/component';
import { Suspense } from 'react';
import Loader from "../../components/Loader/component";
import { useParams } from 'react-router-dom';
import {sport_types, AllLeagues, AllLeaguesBasketball, AllLeaguesTennis, AllLeaguesHockey, AllLeaguesAmFootball } from '../../global/global';
import { useSelector } from 'react-redux';

const LeaguesSidebar = lazy(() => import('@/components/leagues/LeaguesSidebar'));
const LiveMatchesListLeaguesPage = lazy(() => import('@/components/matches/LiveMatchesListLeaguesPage'));

const LeaguesMatchesPage = () => {

  const innerWidth = window.innerWidth;

  const { league } = useParams();

  const leagueName = league.replaceAll("+", " ");

  const { currentTypeSport } = useSelector(state => state.WebSocketMatches);

  return (
    <div className="min-h-screen bg-sport-dark max-w-7xl mx-auto container parent">
      <MetaData title={`sportbn | Watch all matches's ${leagueName}`} des="LiveSport is a platform that provides live streaming of football, basketball and tennis matches." />

      {/* Create popup here */}

      <Suspense fallback={<Loader />}>
        <main className="pt-24 pb-16 lg:px-8 max-w-7xl mx-auto" style={{ marginTop: innerWidth < 992 ? '4rem' : '6rem' }}>
          <div className="flex flex-row lg:flex-row gap-6 row_f">
            {/* Sidebar */}
            <div className="lg:w-1/4 animate-slide-up desktop-sidebar">
              <div className="lg:w-1/4 animate-slide-up desktop-sidebar">
                {
                  currentTypeSport === sport_types.all || currentTypeSport === sport_types.football ? (
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
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 flex-1 animate-slide-up" style={{ animationDelay: '0.1s', width: "100%" }}>
              <div className="md:flex items-center justify-between mb-6 title_live_matches">
                {
                  innerWidth < 992 ? (
                    <h1 className="text-xl font-bold text-white">{leagueName}</h1>
                  ) : (
                    <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">{leagueName}</h1>
                  )
                }
              </div>

              <LiveMatchesListLeaguesPage />
            </div>
          </div>
        </main>
      </Suspense>

    </div >
  );
};

export default LeaguesMatchesPage;
