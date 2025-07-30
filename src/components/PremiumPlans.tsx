import React, { useState } from 'react';
import { Check, Crown, Loader2, Sparkles } from 'lucide-react';
import { PremiumPlan } from '../types';
import { upgradeToPremium } from '../utils/auth';

interface PremiumPlansProps {
  userId?: string;
  onUpgrade: () => void;
}

const plans: PremiumPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Premium',
    price: 399,
    duration: 'per month',
    features: [
      'Text-to-speech output',
      'Customizable voice settings',
      'Anime avatar companion',
      'Advanced gesture recognition',
      'Priority support',
      'Export conversation history'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly Premium',
    price: 3999,
    duration: 'per year',
    popular: true,
    features: [
      'Everything in Monthly',
      'Save ₹1,989 per year',
      'Early access to new features',
      'Premium voice collection',
      'Custom avatar themes',
      'Advanced analytics'
    ]
  }
];

export default function PremiumPlans({ userId, onUpgrade }: PremiumPlansProps) {
  const [isUpgrading, setIsUpgrading] = useState<string | null>(null);

  const handleUpgrade = async (planId: string) => {
    if (!userId) return;
    
    setIsUpgrading(planId);
    try {
      await upgradeToPremium(userId, planId);
      onUpgrade();
    } catch (error) {
      console.error('Upgrade failed:', error);
    } finally {
      setIsUpgrading(null);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock Your Full Potential
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the complete power of gesture communication with our premium features. 
            Start with a free week, then choose the plan that fits your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'ring-4 ring-blue-500 ring-opacity-50' 
                  : 'hover:shadow-2xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-600">{plan.duration}</span>
                </div>
                {plan.id === 'yearly' && (
                  <p className="text-green-600 font-medium mt-2">Save 58% annually!</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={!userId || isUpgrading === plan.id}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {isUpgrading === plan.id ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5" />
                    <span>{userId ? 'Upgrade Now' : 'Login to Upgrade'}</span>
                  </>
                )}
              </button>

              {plan.id === 'monthly' && (
                <p className="text-center text-sm text-gray-500 mt-3">
                  Start with a free 7-day trial
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include a 7-day free trial. Cancel anytime, no questions asked.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>✓ Secure payment</span>
            <span>✓ No hidden fees</span>
            <span>✓ 30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}