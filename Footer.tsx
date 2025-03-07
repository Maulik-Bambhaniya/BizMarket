
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bizposter-blue-900 text-white pt-12 pb-6 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BizMarket</h3>
            <p className="text-white text-opacity-70 mb-4">
              Connect your business with the best marketing agencies and create stunning posters to grow your brand.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-bizposter-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-bizposter-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-bizposter-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-bizposter-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white text-opacity-70 hover:text-opacity-100 transition-colors">Home</Link></li>
              <li><Link to="/businesses" className="text-white text-opacity-70 hover:text-opacity-100 transition-colors">Businesses</Link></li>
              <li><Link to="/agencies" className="text-white text-opacity-70 hover:text-opacity-100 transition-colors">Agencies</Link></li>
              <li><Link to="/poster-creator" className="text-white text-opacity-70 hover:text-opacity-100 transition-colors">Create Poster</Link></li>
              <li><Link to="/pricing" className="text-white text-opacity-70 hover:text-opacity-100 transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="text-white text-opacity-70 hover:text-opacity-100 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white text-opacity-70 hover:text-opacity-100 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-white text-opacity-70 hover:text-opacity-100 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white text-opacity-70 hover:text-opacity-100 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-white text-opacity-70 hover:text-opacity-100 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white text-opacity-70">123 Business Street, Tech Park, City, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span className="text-white text-opacity-70">+91 000 00 00000</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span className="text-white text-opacity-70">info@bizmarket.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 pt-6 text-center text-white text-opacity-60 text-sm">
          <p>&copy; {new Date().getFullYear()} BizMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
