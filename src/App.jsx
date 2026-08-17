import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';

import PageTransition from './components/PageTransition.jsx';
import GenerateLinkPage from './pages/GenerateLinkPage.jsx';
import PortalHomePage from './pages/PortalHomePage.jsx';
import { ROUTES } from './lib/constants.js';

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path={ROUTES.home}
          element={
            <PageTransition>
              <PortalHomePage />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.generate}
          element={
            <PageTransition>
              <GenerateLinkPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
