import { Heart, Camera, Mic, Users, Shield, Sparkles } from 'lucide-react';
import { User } from '../types';
import CameraTab from './CameraTab';

interface DashboardProps {
  user: User | null;
  onCameraClick: () => void;
  showCamera: boolean;
}

export default function Dashboard({ user, onCameraClick, showCamera }: DashboardProps) {
  if (showCamera && user) {
    return <CameraTab user={user} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            signX
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We believe everyone deserves to be heard. Our platform transforms your hand gestures into spoken words, 
          giving you a powerful new way to communicate with the world around you.
        </p>
      </div>

      {user ? (
        /* Logged-in User Dashboard */
        <div className="space-y-12">
          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              onClick={onCameraClick}
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Start Gesturing</h3>
              <p className="text-gray-600">Begin real-time gesture recognition and text conversion</p>
            </div>

            {user.isPremium && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 border border-orange-200">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl mb-6">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-orange-800 mb-3">Voice Features</h3>
                <p className="text-orange-700">Customize your text-to-speech settings and avatar</p>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">Connect with others and share your experience</p>
            </div>
          </div>

          {/* User Status */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Account</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${user.isPremium ? 'text-orange-600' : 'text-gray-900'}`}>
                      {user.isPremium ? 'Premium Member' : 'Free Account'}
                    </span>
                  </div>
                  {user.isPremium && user.premiumExpiry && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Premium Until:</span>
                      <span className="font-medium text-gray-900">
                        {user.premiumExpiry.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {user.isPremium && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Voice Settings</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Voice Type:</span>
                      <span className="font-medium text-gray-900 capitalize">
                        {user.voiceSettings?.voice.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pitch:</span>
                      <span className="font-medium text-gray-900">{user.voiceSettings?.pitch}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Speed:</span>
                      <span className="font-medium text-gray-900">{user.voiceSettings?.speed}x</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Non-logged-in User Content */
        <div className="space-y-16">
          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Built with Care</h3>
              <p className="text-gray-600">
                Every feature is designed with empathy and understanding of your unique communication needs.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-3xl mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Privacy First</h3>
              <p className="text-gray-600">
                Your gestures and conversations are processed locally. We never store or share your personal data.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-400 rounded-3xl mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Always Improving</h3>
              <p className="text-gray-600">
                Our AI learns and adapts to provide better recognition accuracy with each interaction.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                  <div className="text-4xl mb-2">👋</div>
                  <h4 className="font-semibold text-gray-900">1. Show Gestures</h4>
                </div>
                <p className="text-gray-600">Use natural hand movements in front of your camera</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                  <div className="text-4xl mb-2">🤖</div>
                  <h4 className="font-semibold text-gray-900">2. AI Translation</h4>
                </div>
                <p className="text-gray-600">Our AI instantly converts gestures to text</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                  <div className="text-4xl mb-2">🔊</div>
                  <h4 className="font-semibold text-gray-900">3. Voice Output</h4>
                </div>
                <p className="text-gray-600">Premium users get natural voice synthesis</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}