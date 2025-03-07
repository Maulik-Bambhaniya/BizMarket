import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            // API call to login
            toast.loading('Logging in...');

            const response = await axios.post('/api/users/login', {
                email: formData.email, // or username, depending on your API
                password: formData.password
            });

            toast.dismiss();

            if (response.status === 200) {
                const { user, accessToken, userType } = response.data.data;

                const userData = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    userType: userType,
                    accessToken: accessToken
                };

                localStorage.setItem('user', JSON.stringify(userData));
                toast.success('Login successful!');

                navigate('/profile-setup'); // Navigate to profile setup
            } else {
                toast.error('Login failed');
            }
        } catch (error: any) {
            toast.dismiss();
            toast.error(`Login failed: ${error.response?.data?.message || error.message}`);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow flex items-center justify-center bg-hero-pattern py-10 px-4">
                <div className="glass max-w-md w-full rounded-xl p-8 animate-fade-up">
                    <h1 className="text-2xl font-bold text-center text-white mb-6">Login Now!</h1>

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
                                    placeholder="yourname@gmail.com"
                                    className="input-field"
                                />
                                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 w-5 h-5" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                                <Link to="/forgot-password" className="text-sm text-blue-300 hover:text-blue-200 transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
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
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-white border-opacity-30 bg-transparent focus:ring-blue-500 text-blue-600"
                            />
                            <label htmlFor="rememberMe" className="ml-2 text-sm text-white text-opacity-90">
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium uppercase tracking-wide shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center text-white text-opacity-80 text-sm">
                        Don't have an account? <Link to="/register" className="text-blue-300 hover:text-blue-200 transition-colors">Register Now</Link>
                    </div>

                    <div className="flex justify-center space-x-4 mt-6">
                        <button
                            type="button"
                            className="p-2 bg-[#3b5998] rounded-full text-white hover:opacity-90 transition-opacity"
                            aria-label="Sign in with Facebook"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="p-2 bg-[#4285F4] rounded-full text-white hover:opacity-90 transition-opacity"
                            aria-label="Sign in with Google"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.956 12.457v7.59h4.2a6.996 6.996 0 0 0 6.052-3.559l-3.037-2.35c-.857 1.281-2.21 2.139-3.82 2.139h-1.822v-3.046l7.244-3.01-8.817-3.29v5.526Z" />
                                <path d="M22.663 6.898a12.727 12.727 0 0 0-.24-.483 7.003 7.003 0 0 0-6.247-3.85h-4.22v7.713l8.86 3.294a7.01 7.01 0 0 0 1.847-6.674Z" />
                                <path d="M5.963 14.938a6.99 6.99 0 0 0 5.993 3.414v-7.713L3 7.317v4.326a7.01 7.01 0 0 0 2.963 7.294Z" />
                                <path d="M16.176 2.882a6.994 6.994 0 0 0-10.213 4.435l8.956 3.323 1.257-7.758Z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="p-2 bg-black rounded-full text-white hover:opacity-90 transition-opacity"
                            aria-label="Sign in with Apple"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.2-.17 2.35-.88 3.56-.81 1.47.1 2.58.62 3.29 1.5-2.72 1.76-2.28 5.65.58 6.79-.58 1.63-1.31 3.27-2.51 4.7zM12.03 7.25c-.15-2.23 1.66-4.16 3.8-4.3.27 2.14-.67 4.1-3.8 4.3z" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-8 flex items-center justify-center">
                        {/* <img
              // src="https://img.freepik.com/premium-vector/online-registration-illustration-design-concept-websites-landing-pages-other_108061-939.jpg?w=2000"
              // alt="Login illustration"
              className="w-32 h-auto"
            /> */}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Login;
