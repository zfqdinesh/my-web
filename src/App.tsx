import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';
import PremiumPlans from './components/PremiumPlans';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { AuthState, User } from './types';

function App() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showPremiumPlans, setShowPremiumPlans] = useState(false);

  // Load saved auth state from localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('authState');
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setAuth({
          ...parsedAuth,
          user: parsedAuth.user ? {
            ...parsedAuth.user,
            premiumExpiry: parsedAuth.user.premiumExpiry ? new Date(parsedAuth.user.premiumExpiry) : undefined
          } : null
        });
      } catch (error) {
        console.error('Error parsing saved auth state:', error);
      }
    }
  }, []);

  // Save auth state to localStorage
  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(auth));
  }, [auth]);

  const handleLogin = (user: User) => {
    setAuth({
      user,
      isAuthenticated: true,
      isLoading: false
    });
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    setShowCamera(false);
    setShowPremiumPlans(false);
  };

  const handleUpgrade = () => {
    // Refresh user data after upgrade
    if (auth.user) {
      setAuth(prevAuth => ({
        ...prevAuth,
        user: {
          ...prevAuth.user!,
          isPremium: true,
          premiumExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      }));
    }
    setShowPremiumPlans(false);
  };

  const scrollToPremiumPlans = () => {
    setShowPremiumPlans(true);
    setTimeout(() => {
      const element = document.getElementById('premium-plans');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        auth={auth}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      <main>
        {/* Hero Section */}
        {!showCamera && (
          <Hero onBuyPremium={scrollToPremiumPlans} />
        )}

        {/* Dashboard/Camera Section */}
        <section className={showCamera ? 'pt-20' : 'py-20'}>
          <Dashboard 
            user={auth.user}
            onCameraClick={() => setShowCamera(true)}
            showCamera={showCamera}
          />
        </section>

        {/* Premium Plans Section */}
        {(showPremiumPlans || !auth.isAuthenticated) && (
          <section id="premium-plans">
            <PremiumPlans 
              userId={auth.user?.id}
              onUpgrade={handleUpgrade}
            />
          </section>
        )}

        {/* Privacy Policy Placeholder */}
        {!showCamera && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
              <div className="bg-white rounded-2xl shadow-xl p-12">
                <div className="text-6xl mb-6">🔒</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Coming Soon</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We're putting the finishing touches on our comprehensive privacy policy. 
                  Rest assured, your privacy and data security are our top priorities. 
                  All gesture recognition happens locally on your device.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Back to Dashboard Button */}
      {showCamera && (
        <button
          onClick={() => setShowCamera(false)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 z-40"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;