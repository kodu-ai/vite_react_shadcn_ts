import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import NotFoundPage from './pages/not-found';
import AppProvider from './components/app-provider';
import FancyMotionStartPage from './pages/home';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* <Navbar /> */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<FancyMotionStartPage />} />
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
