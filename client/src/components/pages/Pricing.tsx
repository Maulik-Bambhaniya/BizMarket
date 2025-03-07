
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-bizposter-blue-800 text-white pt-24 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center animate-fade-up">
            Simple, Transparent <span className="text-bizposter-green" >Pricing</span>
          </h1>
          
          <p className="text-lg text-center mb-8 text-white text-opacity-80 max-w-2xl mx-auto">
            Choose the plan that works best for your business needs. No hidden fees, cancel anytime.
          </p>
          
          <div className="flex justify-center mb-10">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-1 inline-flex">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === 'monthly' ? 'bg-bizposter-blue-600 text-white' : 'text-white text-opacity-70 hover:text-opacity-100'
                }`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === 'yearly' ? 'bg-bizposter-blue-600 text-white' : 'text-white text-opacity-70 hover:text-opacity-100'
                }`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="glass-card rounded-xl p-6 relative overflow-hidden transform transition-all hover:scale-[1.02]" >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bizposter-blue-400 to-bizposter-blue-600"></div>
              
              <h2 className="text-2xl font-bold mb-2" style={{color:'black'}}>Free</h2>
              <p className="text-white text-opacity-70 mb-4" style={{color:'black'}}>Get started with access to basic features</p>
              
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold" style={{color:'black'}}>₹0</span>
                <span className="text-white text-opacity-70 ml-1 mb-1" style={{color:'black'}}>/mo</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check size={18} className="text-bizposter-green mr-2 mt-0.5 flex-shrink-0" />
                  <span style={{color:'black'}}>Limited business profile</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-bizposter-green mr-2 mt-0.5 flex-shrink-0" />
                  <span style={{color:'black'}}>Connect with up to 5 agencies</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-bizposter-green mr-2 mt-0.5 flex-shrink-0" />
                  <span style={{color:'black'}}>Basic poster templates</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-bizposter-green mr-2 mt-0.5 flex-shrink-0" />
                  <span style={{color:'black'}}>Access to community forums</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-bizposter-green mr-2 mt-0.5 flex-shrink-0" />
                  <span style={{color:'black'}}>Email support</span>
                </li>
              </ul>
              
              <button className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 py-2.5 rounded-md font-medium transition-colors" style={{color:'black'}}>
                Get Started
              </button>
            </div>
            
            {/* Pro Plan */}
            <div className="glass-card rounded-xl p-6 relative overflow-hidden bg-premium-gradient shadow-xl transform transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 bg-bizposter-purple px-3 py-1 text-xs font-bold rounded-bl-lg">
                POPULAR
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Pro</h2>
              <p className="text-white text-opacity-70 mb-4">Grow your business with premium features</p>
              
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold">₹{billingCycle === 'yearly' ? '800' : '1000'}</span>
                <span className="text-white text-opacity-70 ml-1 mb-1">/mo</span>
                {billingCycle === 'yearly' && (
                  <span className="ml-2 px-2 py-1 bg-bizposter-green text-white text-xs rounded">Save 20%</span>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check size={18} className="text-bizposter-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Enhanced business profile with analytics</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-bizposter-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Unlimited agency connections</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-bizposter-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Premium poster templates + custom elements</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-bizposter-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Featured listing in search results</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-bizposter-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-bizposter-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Advanced marketing tools and resources</span>
                </li>
              </ul>
              
              <button className="w-full bg-white py-2.5 rounded-md font-medium text-bizposter-blue-900 hover:bg-opacity-90 transition-colors">
                Become Pro
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">Need a custom plan for your enterprise?</h3>
            <p className="text-white text-opacity-70 mb-6 max-w-2xl mx-auto">
              We offer custom solutions for larger businesses and agencies with specific requirements. Let's discuss how we can help.
            </p>
            <button className="bg-bizposter-blue-600 hover:bg-bizposter-blue-500 px-6 py-2.5 rounded-md font-medium transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
