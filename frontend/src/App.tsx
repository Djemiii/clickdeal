import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CouponsPage from './pages/CouponsPage';
import CouponDetailPage from './pages/CouponDetailPage';
import WheelOfFortunePage from './pages/WheelOfFortunePage';
import BusinessPage from './pages/BusinessPage';
import PartnersPage from './pages/PartnersPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coupons" element={<CouponsPage />} />
            <Route path="/coupon/:id" element={<CouponDetailPage />} />
            <Route path="/wheel-of-fortune" element={<WheelOfFortunePage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;