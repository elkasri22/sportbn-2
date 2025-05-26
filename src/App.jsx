import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "./components/Loader/component";

const Index = lazy(() => import("./pages/Index"));
const Navbar = lazy(() => import("@/components/layout/Navbar"));
const PageWatchNow = lazy(() => import("./pages/watch/page"));
const LeaguesMatchesPage = lazy(() => import("./pages/leaguesMatches/page"));
const SearchPage = lazy(() => import("./pages/search/page"));
const TermsAndConditions = lazy(() => import("./pages/terms/page"));
const PrivacyPolicy = lazy(() => import("./pages/policy/page"));
const FooterComponent = lazy(() => import("@/components/footer/footer"));

const App = () => {

  return (
      <>
        <Router>


          <Navbar />
          
          <Suspense fallback={<Loader />}>

            <Routes>
              <Route path="/" exact element={<Index />} />
              <Route path="/watch-now/matches/:league/:team1/:team2/:id" element={<PageWatchNow />} />
              <Route path="/watch-now/matches/:league" element={<LeaguesMatchesPage />} />
              <Route path="/search+about/:search" element={<SearchPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

          </Suspense>

          <FooterComponent />

        </Router>
      </>
  )
};

export default App;
