import "./style.css";
import React, { useState, useEffect, lazy } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ModelRegister from '../model/register';
import { RiMenuLine } from "react-icons/ri";
const SearchBar = lazy(() => import('@/components/ui/SearchBar'));
const LeaguesSidebar = lazy(() => import('@/components/leagues/LeaguesSidebar'));
// import Brand from "../../assets/brand/brand.webp";
// import BrandMobile from "../../assets/brand/brandMobile.webp";
import { useSelector } from "react-redux";
import { AllLeagues, AllLeaguesAmFootball, AllLeaguesBasketball, AllLeaguesHockey, AllLeaguesTennis, sport_types } from "../../global/global";

const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const innerWidth = window.innerWidth;

  const { currentTypeSport } = useSelector(state => state.WebSocketMatches);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md',
        scrolled ? 'bg-sport-dark/90 shadow-md' : 'bg-transparent'
      )}
      style={{ position: "fixed", width: "100%", zIndex: 9999 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 child-nav container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="https://raw.githubusercontent.com/elkasri22/sportbn/refs/heads/main/SportBN%20logo%20offic.webp"
                width={70}
                height={70}
                alt="LiveSport Now"
                loading="lazy"
                style={{minHeight:"70px", minWidth:"70px"}}
              />
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="md:block" style={{ width: "324px", display: innerWidth < 992 ? "none" : "block" }}>
            <div className="flex items-center space-x-4">
              <NavLink href="/" active>
                HOME
              </NavLink>

              <NavLink href="/matches" hide={true}>
                HOT MATCHES
              </NavLink>

              <NavLink href="/lives" hide={true}>
                LIVE TV
              </NavLink>

              <NavLink href="/pricing" hide={true}>
                PRICING
              </NavLink>

            </div>
          </div>

          <div className="last flex items-center space-x-4">
            <div className="w-full md:w-auto">
              <SearchBar className="md:w-64 lg:w-80" />
            </div>

            <ModelRegister width={innerWidth} />

            <button onClick={handleToggleSidebar} className="btn menu-button" aria-label="Menu">
              <RiMenuLine size={30} style={{ color: "white" }} />
            </button>

            <div className={`offcanvas offcanvas-start ${toggleSidebar ? "show" : "fade"}`}>
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="MenuLabel">Menu</h5>
                <button onClick={handleToggleSidebar} className="btn-close"></button>
              </div>
              <div className="offcanvas-body">
                <div className="w-full md:w-auto">
                  <SearchBar className="md:w-64 lg:w-80" />
                </div>

                <div className="lg:w-1/4 animate-slide-up mt-4">
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
            </div>

          </div>

        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children, active, hide }) => {
  return (
    <Link
      to={href}
      className={cn(
        'px-3 py-2 font-medium transition-all duration-200 relative',
        active
          ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sport-gold active_f'
          : 'text-gray-300 hover:text-white'
      )}
      style={{ opacity: hide ? 0 : 1, position: "relative" }}
    >
      {children}
    </Link>
  );
};

export default Navbar;