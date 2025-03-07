import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios'; // Import Axios

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    // Validate username
    if (!formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      valid = false;
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Show loading toast
        toast.loading('Creating your account...');

        // API endpoint
        const apiUrl = '/api/users/register'; // Use the proxy-configured endpoint

        // Request body
        const requestBody = {
          email: formData.email,
          username: formData.username,
          password: formData.password,
        };

        // Make the API call using Axios
        const response = await axios.post(apiUrl, requestBody);

        // Handle the response
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(response.data.message || 'Failed to create account');
        }

        // Success toast and navigation
        toast.dismiss();
        toast.success('Account created successfully!');
        navigate('/profile-setup');
      } catch (error:any) {
        // Dismiss loading toast and show error message
        toast.dismiss();
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-hero-pattern py-10 px-4">
        <div className="glass max-w-md w-full rounded-xl p-8 animate-fade-up">
          <h1 className="text-2xl font-bold text-center text-white mb-6">Registration</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@host.com"
                  className="input-field"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 w-5 h-5" />
              </div>
              {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="abc_123"
                  className="input-field"
                />
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 w-5 h-5" />
              </div>
              {errors.username && <p className="text-red-300 text-xs mt-1">{errors.username}</p>}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password}</p>}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium uppercase tracking-wide shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              SUBMIT
            </button>
          </form>
          
          <div className="mt-6 text-center text-white text-opacity-80 text-sm">
            Already have an Account? <Link to="/login" className="text-blue-300 hover:text-blue-200 transition-colors">Login Now</Link>
          </div>
          
          <div className="absolute right-12 transform translate-y-16">
            {/* <img 
              src="/lovable-uploads/abe436ab-7532-48bd-9f13-f18f7e9b48c3.png" 
              alt="Registration illustration" 
              className="w-48 h-auto hidden lg:block"
            /> */}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
