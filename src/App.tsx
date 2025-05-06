import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner'; // For notifications

import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFound'; // Assuming NotFound exists
import { Navbar } from './components/Navbar';
import AppProvider from './components/app-provider';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
        <Toaster />
      </Router>
    </AppProvider>
  );
}

export default App;
