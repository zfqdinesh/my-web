import React from 'react';
import { User, LogIn, LogOut, Crown } from 'lucide-react';
import { AuthState } from '../types';

interface NavbarProps {
  auth: AuthState;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Navbar({ auth, onLoginClick, onLogout }: NavbarProps) {
  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-semibold text-lg">GestureSpeak</span>
          </div>

          {/* Account Section */}
          <div className="flex items-center space-x-4">
            {auth.isAuthenticated && auth.user ? (
              <div className="flex items-center space-x-3">
                {auth.user.isPremium && (
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full">
                    <Crown className="w-3 h-3 text-white" />
                    <span className="text-xs font-medium text-white">Premium</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm hidden sm:block">{auth.user.email}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}