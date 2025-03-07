import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

type ProfileType = 'general' | 'business' | 'agency';
type BusinessStep = 1 | 2;
type AgencyStep = 1 | 2;

interface User {
    _id: string;
    username: string;
    email: string;
    userType: number;
    accessToken: string;
}

const ProfileSetup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null); // User state

    const [profileType, setProfileType] = useState<ProfileType>('general');
    const [businessStep, setBusinessStep] = useState<BusinessStep>(1);
    const [agencyStep, setAgencyStep] = useState<AgencyStep>(1);

    const [generalForm, setGeneralForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        role: ''
    });

    const [businessForm, setBusinessForm] = useState({
        businessName: '',
        businessOwner: '',
        businessEmail: '',
        businessWebsite: '',
        businessType: '',
        businessDescription: '',
        keyWords: [] as string[],
        acceptTerms: false,
        otherBusinessType: ''
    });

    const [agencyForm, setAgencyForm] = useState({
        agencyName: '',
        agencyOwner: '',
        agencyEmail: '',
        agencyWebsite: '',
        serviceTypes: [] as string[],
        agencyDescription: '',
        keyWords: [] as string[],
        acceptTerms: false
    });

    const [keywordInput, setKeywordInput] = useState('');

    useEffect(() => {
        // Get user information from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // If user data is not available, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setGeneralForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setBusinessForm(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setBusinessForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAgencyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;

            if (name === 'serviceType') {
                const updatedServices = [...agencyForm.serviceTypes];
                if (checked) {
                    updatedServices.push(value);
                } else {
                    const index = updatedServices.indexOf(value);
                    if (index > -1) {
                        updatedServices.splice(index, 1);
                    }
                }
                setAgencyForm(prev => ({
                    ...prev,
                    serviceTypes: updatedServices
                }));
            } else {
                setAgencyForm(prev => ({
                    ...prev,
                    [name]: checked
                }));
            }
        } else {
            setAgencyForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleGeneralSubmit = () => {
        if (!generalForm.firstName || !generalForm.lastName || !generalForm.phoneNumber || !generalForm.address || !generalForm.role) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (generalForm.role === 'business') {
            setProfileType('business');
        } else if (generalForm.role === 'agency') {
            setProfileType('agency');
        } else {
            toast.success('Profile setup complete!');
            navigate('/');
        }
    };

    const handleBusinessNextStep = () => {
        if (!businessForm.businessName || !businessForm.businessOwner || !businessForm.businessEmail || !businessForm.businessType) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (businessForm.businessType === 'other' && !businessForm.otherBusinessType) {
            toast.error('Please specify your business type');
            return;
        }

        setBusinessStep(2);
    };

    const handleBusinessPrevStep = () => {
        setBusinessStep(1);
    };

    const handleBusinessSubmit = async () => {
        if (!businessForm.businessDescription || !businessForm.acceptTerms) {
            toast.error('Please fill in all required fields and accept terms & conditions');
            return;
        }

        try {
            const response = await axios.post('/api/users/business-profile', {
                businessName: businessForm.businessName,
                businessOwner: businessForm.businessOwner,
                businessDescription: businessForm.businessDescription,
                businessEmail: businessForm.businessEmail,
                businessWebsite: businessForm.businessWebsite,
                type: businessForm.businessType
            }, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            });

            if (response.status === 201) {
                toast.success('Business profile setup complete!');
                // Update userType in local storage
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    userData.userType = 1;
                    localStorage.setItem('user', JSON.stringify(userData));
                }
                navigate('/');
            } else {
                toast.error('Failed to create business profile');
            }
        } catch (error: any) {
            toast.error(`Error creating business profile: ${error.message}`);
        }
    };

    const handleAgencyNextStep = () => {
        if (!agencyForm.agencyName || !agencyForm.agencyOwner || !agencyForm.agencyEmail || agencyForm.serviceTypes.length === 0) {
            toast.error('Please fill in all required fields');
            return;
        }

        setAgencyStep(2);
    };

    const handleAgencyPrevStep = () => {
        setAgencyStep(1);
    };

    const handleAgencySubmit = async () => {
        if (!agencyForm.agencyDescription || !agencyForm.acceptTerms) {
            toast.error('Please fill in all required fields and accept terms & conditions');
            return;
        }

        try {
            const response = await axios.post('/api/users/agency-profile', {
                agencyName: agencyForm.agencyName,
                agencyOwner: agencyForm.agencyOwner,
                agencyDescription: agencyForm.agencyDescription,
                agencyEmail: agencyForm.agencyEmail,
                agencyWebsite: agencyForm.agencyWebsite,
                services: agencyForm.serviceTypes
            }, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            });

            if (response.status === 201) {
                toast.success('Agency profile setup complete!');
                // Update userType in local storage
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    userData.userType = 2;
                    localStorage.setItem('user', JSON.stringify(userData));
                }
                navigate('/');
            } else {
                toast.error('Failed to create agency profile');
            }
        } catch (error: any) {
            toast.error(`Error creating agency profile: ${error.message}`);
        }
    };

    const addKeyword = (formType: 'business' | 'agency') => {
        if (!keywordInput.trim()) return;

        if (formType === 'business') {
            if (businessForm.keyWords.length >= 3) {
                toast.error('Maximum 3 keywords allowed');
                return;
            }

            if (businessForm.keyWords.includes(keywordInput.trim())) {
                toast.error('Keyword already added');
                return;
            }

            setBusinessForm(prev => ({
                ...prev,
                keyWords: [...prev.keyWords, keywordInput.trim()]
            }));
        } else {
            if (agencyForm.keyWords.length >= 3) {
                toast.error('Maximum 3 keywords allowed');
                return;
            }

            if (agencyForm.keyWords.includes(keywordInput.trim())) {
                toast.error('Keyword already added');
                return;
            }

            setAgencyForm(prev => ({
                ...prev,
                keyWords: [...prev.keyWords, keywordInput.trim()]
            }));
        }

        setKeywordInput('');
    };

    const removeKeyword = (keyword: string, formType: 'business' | 'agency') => {
        if (formType === 'business') {
            setBusinessForm(prev => ({
                ...prev,
                keyWords: prev.keyWords.filter(k => k !== keyword)
            }));
        } else {
            setAgencyForm(prev => ({
                ...prev,
                keyWords: prev.keyWords.filter(k => k !== keyword)
            }));
        }
    };

    const handleAddKeywordKeyPress = (e: React.KeyboardEvent, formType: 'business' | 'agency') => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addKeyword(formType);
        }
    };

    const renderProfileSetup = () => {
        if (!user) {
            return <div>Loading...</div>;
        }

        if (profileType === 'general') {
            return (
                <div className="glass max-w-2xl w-full rounded-xl p-8 animate-fade-up">
                    <h1 className="text-2xl font-bold text-center text-white mb-8">Profile Setup</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label htmlFor="firstName" className="block text-sm font-medium text-white">First Name<span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={generalForm.firstName}
                                onChange={handleGeneralChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="lastName" className="block text-sm font-medium text-white">Last Name<span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={generalForm.lastName}
                                onChange={handleGeneralChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">Phone Number<span className="text-red-400">*</span></label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={generalForm.phoneNumber}
                                onChange={handleGeneralChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="role" className="block text-sm font-medium text-white">Select Your Role<span className="text-red-400">*</span></label>
                            <select
                                id="role"
                                name="role"
                                value={generalForm.role}
                                onChange={handleGeneralChange}
                                className="input-field"
                                required
                            >
                                <option value="">Select a role</option>
                                <option value="business">Business</option>
                                <option value="agency">Agency</option>
                            </select>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium text-white">Address<span className="text-red-400">*</span></label>
                            <textarea
                                id="address"
                                name="address"
                                value={generalForm.address}
                                onChange={handleGeneralChange}
                                rows={3}
                                className="input-field resize-none"
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center md:justify-end space-y-3 md:space-y-0 md:space-x-3 mt-8">
                        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                            {generalForm.role === 'business' && (
                                <div className="bg-bizposter-blue-600 rounded-md p-3 text-center cursor-pointer hover:bg-bizposter-blue-500 transition-colors">
                                    Businesses
                                </div>
                            )}
                            {generalForm.role === 'agency' && (
                                <div className="bg-bizposter-blue-600 rounded-md p-3 text-center cursor-pointer hover:bg-bizposter-blue-500 transition-colors">
                                    Agencies
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={handleGeneralSubmit}
                            className="bg-blue-600 text-white py-3 px-8 rounded-md font-medium hover:bg-blue-700 transition-colors"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            );
        } else if (profileType === 'business') {
            return businessStep === 1 ? (
                <div className="glass max-w-2xl w-full rounded-xl p-8 animate-fade-up">
                    <h1 className="text-2xl font-bold text-center text-white mb-8">Profile Setup For Business</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label htmlFor="businessName" className="block text-sm font-medium text-white">Business Name<span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                id="businessName"
                                name="businessName"
                                value={businessForm.businessName}
                                onChange={handleBusinessChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="businessOwner" className="block text-sm font-medium text-white">Business Owner<span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                id="businessOwner"
                                name="businessOwner"
                                value={businessForm.businessOwner}
                                onChange={handleBusinessChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="businessEmail" className="block text-sm font-medium text-white">Business Email<span className="text-red-400">*</span></label>
                            <input
                                type="email"
                                id="businessEmail"
                                name="businessEmail"
                                value={businessForm.businessEmail}
                                onChange={handleBusinessChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="businessType" className="block text-sm font-medium text-white">Type of Business<span className="text-red-400">*</span></label>
                            <select
                                id="businessType"
                                name="businessType"
                                value={businessForm.businessType}
                                onChange={handleBusinessChange}
                                className="input-field"
                                required
                            >
                                <option value="">Select business type</option>
                                <option value="store">Store</option>
                                <option value="shop">Shop/Cafe</option>
                                <option value="lending">Lending</option>
                                <option value="rentals">Rentals</option>
                                <option value="other">Other, please specify below</option>
                            </select>

                            {businessForm.businessType === 'other' && (
                                <input
                                    type="text"
                                    id="otherBusinessType"
                                    name="otherBusinessType"
                                    value={businessForm.otherBusinessType}
                                    onChange={handleBusinessChange}
                                    placeholder="Please specify your business type"
                                    className="input-field mt-3"
                                />
                            )}
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label htmlFor="businessWebsite" className="block text-sm font-medium text-white">Business Website</label>
                            <input
                                type="url"
                                id="businessWebsite"
                                name="businessWebsite"
                                value={businessForm.businessWebsite}
                                onChange={handleBusinessChange}
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={() => setProfileType('general')}
                            className="bg-transparent border border-white border-opacity-30 text-white py-3 px-6 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleBusinessNextStep}
                            className="bg-blue-600 text-white py-3 px-8 rounded-md font-medium hover:bg-blue-700 transition-colors"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            ) : (
                <div className="glass max-w-2xl w-full rounded-xl p-8 animate-fade-up">
                    <h1 className="text-2xl font-bold text-center text-white mb-8">Profile Setup For Business</h1>

                    <div className="space-y-6">
                        <div className="space-y-1">
                            <label htmlFor="businessDescription" className="block text-sm font-medium text-white">Business Description<span className="text-red-400">*</span></label>
                            <textarea
                                id="businessDescription"
                                name="businessDescription"
                                value={businessForm.businessDescription}
                                onChange={handleBusinessChange}
                                rows={4}
                                className="input-field resize-none"
                            ></textarea>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="keywords" className="block text-sm font-medium text-white">Keywords (Max 3)</label>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="text"
                                    id="keywords"
                                    placeholder="Enter keyword"
                                    value={keywordInput}
                                    onChange={(e) => setKeywordInput(e.target.value)}
                                    onKeyPress={(e) => handleAddKeywordKeyPress(e, 'business')}
                                    className="input-field"
                                />
                                <button
                                    type="button"
                                    onClick={() => addKeyword('business')}
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap mt-2">
                                {businessForm.keyWords.map((keyword, index) => (
                                    <div key={index} className="bg-gray-600 text-white px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
                                        {keyword}
                                        <button
                                            type="button"
                                            onClick={() => removeKeyword(keyword, 'business')}
                                            className="ml-2 focus:outline-none"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                name="acceptTerms"
                                checked={businessForm.acceptTerms}
                                onChange={handleBusinessChange}
                                className="mr-2"
                            />
                            <label htmlFor="acceptTerms" className="text-sm font-medium text-white">I accept the terms & conditions<span className="text-red-400">*</span></label>
                        </div>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={handleBusinessPrevStep}
                            className="bg-transparent border border-white border-opacity-30 text-white py-3 px-6 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleBusinessSubmit}
                            className="bg-blue-600 text-white py-3 px-8 rounded-md font-medium hover:bg-blue-700 transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            );
        } else if (profileType === 'agency') {
            return agencyStep === 1 ? (
                <div className="glass max-w-2xl w-full rounded-xl p-8 animate-fade-up">
                    <h1 className="text-2xl font-bold text-center text-white mb-8">Profile Setup For Agency</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label htmlFor="agencyName" className="block text-sm font-medium text-white">Agency Name<span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                id="agencyName"
                                name="agencyName"
                                value={agencyForm.agencyName}
                                onChange={handleAgencyChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="agencyOwner" className="block text-sm font-medium text-white">Agency Owner<span className="text-red-400">*</span></label>
                            <input
                                type="text"
                                id="agencyOwner"
                                name="agencyOwner"
                                value={agencyForm.agencyOwner}
                                onChange={handleAgencyChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="agencyEmail" className="block text-sm font-medium text-white">Agency Email<span className="text-red-400">*</span></label>
                            <input
                                type="email"
                                id="agencyEmail"
                                name="agencyEmail"
                                value={agencyForm.agencyEmail}
                                onChange={handleAgencyChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-white">Service Types<span className="text-red-400">*</span></label>
                            <div className="flex flex-col">
                                <label className="inline-flex items-center mt-3">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                        name="serviceType"
                                        value="seo"
                                        checked={agencyForm.serviceTypes.includes('seo')}
                                        onChange={handleAgencyChange}
                                    />
                                    <span className="ml-2 text-white">SEO</span>
                                </label>
                                <label className="inline-flex items-center mt-3">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                        name="serviceType"
                                        value="content"
                                        checked={agencyForm.serviceTypes.includes('content')}
                                        onChange={handleAgencyChange}
                                    />
                                    <span className="ml-2 text-white">Content Creation</span>
                                </label>
                                <label className="inline-flex items-center mt-3">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                        name="serviceType"
                                        value="ads"
                                        checked={agencyForm.serviceTypes.includes('ads')}
                                        onChange={handleAgencyChange}
                                    />
                                    <span className="ml-2 text-white">Ads Management</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label htmlFor="agencyWebsite" className="block text-sm font-medium text-white">Agency Website</label>
                            <input
                                type="url"
                                id="agencyWebsite"
                                name="agencyWebsite"
                                value={agencyForm.agencyWebsite}
                                onChange={handleAgencyChange}
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={() => setProfileType('general')}
                            className="bg-transparent border border-white border-opacity-30 text-white py-3 px-6 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleAgencyNextStep}
                            className="bg-blue-600 text-white py-3 px-8 rounded-md font-medium hover:bg-blue-700 transition-colors"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            ) : (
                <div className="glass max-w-2xl w-full rounded-xl p-8 animate-fade-up">
                    <h1 className="text-2xl font-bold text-center text-white mb-8">Profile Setup For Agency</h1>

                    <div className="space-y-6">
                        <div className="space-y-1">
                            <label htmlFor="agencyDescription" className="block text-sm font-medium text-white">Agency Description<span className="text-red-400">*</span></label>
                            <textarea
                                id="agencyDescription"
                                name="agencyDescription"
                                value={agencyForm.agencyDescription}
                                onChange={handleAgencyChange}
                                rows={4}
                                className="input-field resize-none"
                            ></textarea>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="keywords" className="block text-sm font-medium text-white">Keywords (Max 3)</label>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="text"
                                    id="keywords"
                                    placeholder="Enter keyword"
                                    value={keywordInput}
                                    onChange={(e) => setKeywordInput(e.target.value)}
                                    onKeyPress={(e) => handleAddKeywordKeyPress(e, 'agency')}
                                    className="input-field"
                                />
                                <button
                                    type="button"
                                    onClick={() => addKeyword('agency')}
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap mt-2">
                                {agencyForm.keyWords.map((keyword, index) => (
                                    <div key={index} className="bg-gray-600 text-white px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
                                        {keyword}
                                        <button
                                            type="button"
                                            onClick={() => removeKeyword(keyword, 'agency')}
                                            className="ml-2 focus:outline-none"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                name="acceptTerms"
                                checked={agencyForm.acceptTerms}
                                onChange={handleAgencyChange}
                                className="mr-2"
                            />
                            <label htmlFor="acceptTerms" className="text-sm font-medium text-white">I accept the terms & conditions<span className="text-red-400">*</span></label>
                        </div>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={handleAgencyPrevStep}
                            className="bg-transparent border border-white border-opacity-30 text-white py-3 px-6 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleAgencySubmit}
                            className="bg-blue-600 text-white py-3 px-8 rounded-md font-medium hover:bg-blue-700 transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            );
        } else {
            return <div>Invalid profile type</div>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center bg-hero-pattern py-10 px-4">
                {renderProfileSetup()}
            </main>
            <Footer />
        </div>
    );
};

export default ProfileSetup;
