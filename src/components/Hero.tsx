import React from 'react';
import { Play, Heart, Users, Shield } from 'lucide-react';

interface HeroProps {
  onBuyPremium: () => void;
}

export default function Hero({ onBuyPremium }: HeroProps) {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Voice,{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Your Way
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We understand that communication is deeply personal. Our gentle technology translates your gestures into words, giving you the voice you deserve—with compassion, respect, and complete privacy.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="flex items-center space-x-2 text-gray-300">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-sm">Built with care</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Trusted by thousands</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm">Completely secure</span>
              </div>
            </div>

            <button
              onClick={onBuyPremium}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Start Your Free Week
            </button>
          </div>

          {/* Right Content - Visual Demo */}
          <div className="relative">
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
              <div className="aspect-video bg-gray-700 rounded-lg mb-4 relative overflow-hidden">
                {/* Animated gesture demo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse">
                    <svg width="120" height="120" viewBox="0 0 120 120" className="text-blue-400">
                      <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
                      <circle cx="60" cy="60" r="15" fill="currentColor" opacity="0.3" />
                      <path d="M45 60 L60 45 L75 60" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-300 text-sm mb-2">Live gesture recognition</p>
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-white font-medium">Hello, how are you today?</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}