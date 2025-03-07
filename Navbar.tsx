import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react'; // Import User icon
import { toast } from 'sonner';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // User state
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check for user in local storage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedInUser(null);
    toast.success('Logged out successfully!');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold mr-8">BizMarket</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/businesses" className={`nav-link ${isActive('/businesses') ? 'active' : ''}`}>Businesses</Link>
          <Link to="/agencies" className={`nav-link ${isActive('/agencies') ? 'active' : ''}`}>Agencies</Link>
          <Link to="/poster-creator" className={`nav-link ${isActive('/poster-creator') ? 'active' : ''}`}>Create Poster</Link>
          <Link to="/pricing" className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}>Pricing</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact Us</Link>
        </div>
      </div>

      {/* Auth Buttons / User Info */}
      <div className="hidden md:flex items-center space-x-3">
        {loggedInUser ? (
          <>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                <User className="text-white" size={20} />
              </div>
              <span className="text-white">{loggedInUser.username}</span>
            </div>
            <button onClick={handleLogout} className="auth-button signin-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-button signin-button">Sign In</Link>
            <Link to="/register" className="auth-button register-button">Register</Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={toggleMenu}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-bizposter-blue-900 bg-opacity-95 backdrop-blur-md shadow-lg py-4 border-b border-white border-opacity-10 md:hidden animate-fade-in">
          <div className="flex flex-col space-y-2 px-8">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/businesses"
              className={`nav-link ${isActive('/businesses') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Businesses
            </Link>
            <Link
              to="/agencies"
              className={`nav-link ${isActive('/agencies') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Agencies
            </Link>
            <Link
              to="/poster-creator"
              className={`nav-link ${isActive('/poster-creator') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Create Poster
            </Link>
            <Link
              to="/pricing"
              className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            {loggedInUser ? (
              <>
                <div className="flex items-center pt-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                    <User className="text-white" size={20} />
                  </div>
                  <span className="text-white">{loggedInUser.username}</span>
                </div>
                <button onClick={handleLogout} className="auth-button signin-button w-full text-center">Logout</button>
              </>
            ) : (
              <div className="pt-3 flex space-x-3">
                <Link
                  to="/login"
                  className="auth-button signin-button w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="auth-button register-button w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
