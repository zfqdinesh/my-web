import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Volume2, Settings, Pause, Play } from 'lucide-react';
import { User, GestureResult } from '../types';

interface CameraTabProps {
  user: User;
}

export default function CameraTab({ user }: CameraTabProps) {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAvatar, setShowAvatar] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Mock gesture recognition results
  const mockGestures: string[] = [
    "Hello there!",
    "How are you today?",
    "Thank you so much",
    "I need help please",
    "Good morning",
    "See you later",
    "I'm happy",
    "Can you help me?",
    "Nice to meet you",
    "Have a great day"
  ];

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleCamera = async () => {
    if (isCameraOn) {
      // Turn off camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
      setIsRecording(false);
    } else {
      // Turn on camera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' }, 
          audio: false 
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Unable to access camera. Please check permissions.');
      }
    }
  };

  const simulateGestureRecognition = () => {
    const randomGesture = mockGestures[Math.floor(Math.random() * mockGestures.length)];
    setCurrentText(randomGesture);
    
    if (user.isPremium) {
      speakText(randomGesture);
    }
  };

  const speakText = (text: string) => {
    if (user.isPremium && 'speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply user voice settings
      if (user.voiceSettings) {
        utterance.pitch = user.voiceSettings.pitch;
        utterance.rate = user.voiceSettings.speed;
        const voices = speechSynthesis.getVoices();
        const selectedVoice = voices.find(voice => 
          voice.name.includes(user.voiceSettings!.voice === 'female-1' ? 'female' : 'male')
        );
        if (selectedVoice) utterance.voice = selectedVoice;
      }
      
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Simulate gesture recognition every 3 seconds
      const interval = setInterval(() => {
        if (isCameraOn) {
          simulateGestureRecognition();
        }
      }, 3000);
      
      setTimeout(() => clearInterval(interval), 15000); // Stop after 15 seconds
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Camera Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Gesture Recognition</h2>
              <p className="text-gray-600">Show hand gestures to the camera for real-time translation</p>
            </div>
            
            <div className="relative bg-gray-900 aspect-video">
              {isCameraOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-400">
                    <Camera className="w-16 h-16 mx-auto mb-4" />
                    <p>Camera is off</p>
                  </div>
                </div>
              )}
              
              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Recording</span>
                </div>
              )}
              
              {/* Controls overlay */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <button
                  onClick={toggleCamera}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isCameraOn 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isCameraOn ? <CameraOff className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
                </button>
                
                {isCameraOn && (
                  <button
                    onClick={toggleRecording}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isRecording 
                        ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isRecording ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {/* Text Output */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recognized Text</h3>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[120px] flex items-center justify-center">
              {currentText ? (
                <p className="text-gray-800 text-center font-medium">{currentText}</p>
              ) : (
                <p className="text-gray-400 text-center">Start recording to see recognized gestures</p>
              )}
            </div>
            
            {user.isPremium && currentText && (
              <button
                onClick={() => speakText(currentText)}
                disabled={isSpeaking}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isSpeaking ? 'Speaking...' : 'Speak Text'}</span>
              </button>
            )}
          </div>

          {/* Premium Avatar */}
          {user.isPremium && showAvatar && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Voice Avatar</h3>
                <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center transition-transform duration-500 ${
                  isSpeaking ? 'animate-bounce' : ''
                }`}>
                  <span className="text-white text-xl">👤</span>
                </div>
                <p className="text-gray-600 text-sm">
                  {isSpeaking ? 'Speaking your words...' : 'Ready to speak for you'}
                </p>
              </div>
            </div>
          )}

          {/* Feature Info */}
          {!user.isPremium && (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">Unlock Premium Features</h3>
              <ul className="text-orange-700 text-sm space-y-1">
                <li>• Text-to-speech output</li>
                <li>• Animated voice avatar</li>
                <li>• Customizable voice settings</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}