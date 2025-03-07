import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

interface Agency {
    _id: string;
    agencyName: string;
    agencyDescription: string;
    agencyEmail: string;
    agencyWebsite: string;
    agencyOwner: string;
    services: string[];
    rating: number;
    yearsInBusiness: number;
    createdAt: string;
    updatedAt: string;
}

const Agencies = () => {
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        budget: "",
        rating: "",
        services: [] as string[]
    });
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgencies = async () => {
            setLoading(true);
            setError(null);

            try {
                let url = `/api/agencies?searchTerm=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

                if (filters.budget) {
                    url += `&budget=${filters.budget}`;
                }
                if (filters.rating) {
                    url += `&rating=${filters.rating}`;
                }
                if (filters.services.length > 0) {
                    url += `&services=${filters.services.join(',')}`;
                }

                const response = await axios.get(url);
                setAgencies(response.data.data.agencies);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch agencies');
            } finally {
                setLoading(false);
            }
        };

        fetchAgencies();
    }, [searchTerm, filters, sortBy, sortOrder]);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleServiceChange = (service: string) => {
        if (filters.services.includes(service)) {
            setFilters({
                ...filters,
                services: filters.services.filter(s => s !== service)
            });
        } else {
            setFilters({
                ...filters,
                services: [...filters.services, service]
            });
        }
    };

    if (loading) return <div>Loading agencies...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow bg-bizposter-blue-900 text-white pt-24 pb-12 px-4 md:px-8">
                <div className="container mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
                        Find Best <span className="text-bizposter-green">Marketing Agencies</span> Suitable For Your Businesses 🎯
                    </h1>

                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-grow">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search agencies..."
                                    className="w-full bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-md px-4 py-2 pl-10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                                    onChange={handleSearchChange}
                                />
                                <Search className="absolute left-3 top-2.5 text-white text-opacity-70" size={18} />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-md font-medium transition-colors flex items-center"
                                onClick={toggleFilters}
                            >
                                <Filter size={18} className="mr-2" /> Filter
                            </button>
                            <select
                                className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-md font-medium transition-colors text-white appearance-none cursor-pointer pr-8 pl-4"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundPosition: 'right 10px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}
                            >
                                <option value="" style={{ color: 'black' }}>Sort by</option>
                                <option value="rating_high" style={{ color: 'black' }}>Rating: High to Low</option>
                                <option value="rating_low" style={{ color: 'black' }}>Rating: Low to High</option>
                                <option value="name" style={{ color: 'black' }}>Name</option>
                            </select>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="glass-card rounded-xl p-5 mb-8 animate-fade-in">
                            <h3 className="font-semibold mb-4" style={{ color: 'black' }}>Filter Agencies</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium mb-2" style={{ color: 'black' }}>Budget Range</h4>
                                    <select
                                        className="w-full bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-md px-4 py-2 text-white"
                                        value={filters.budget}
                                        onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                                        style={{ color: 'grey' }}
                                    >
                                        <option value="" style={{ color: 'grey' }}>Any Budget</option>
                                        <option value="0-20000" style={{ color: 'grey' }}>₹0 - ₹20,000</option>
                                        <option value="20000-50000" style={{ color: 'grey' }}>₹20,000 - ₹50,000</option>
                                        <option value="50000-100000" style={{ color: 'grey' }}>₹50,000 - ₹1,00,000</option>
                                        <option value="100000+" style={{ color: 'grey' }}>Above ₹1,00,000</option>
                                    </select>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2" style={{ color: 'black' }}>Rating</h4>
                                    <select
                                        className="w-full bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-md px-4 py-2 text-white"
                                        value={filters.rating}
                                        onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                                        style={{ color: 'grey' }}
                                    >
                                        <option value="" style={{ color: 'grey' }}>Any Rating</option>
                                        <option value="4+" style={{ color: 'grey' }}>4+ Stars</option>
                                        <option value="3+" style={{ color: 'grey' }}>3+ Stars</option>
                                        <option value="2+" style={{ color: 'grey' }}>2+ Stars</option>
                                    </select>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2" style={{ color: 'black' }}>Services</h4>
                                    <div className="space-y-2">
                                        {["Social Media Marketing", "Content Marketing", "Email Marketing", "Advertising", "Affiliate Marketing"].map((service) => (
                                            <label key={service} className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.services.includes(service)}
                                                    onChange={() => handleServiceChange(service)}
                                                    className="rounded border-white border-opacity-30 bg-white bg-opacity-10 text-bizposter-blue-500 focus:ring-0 focus:ring-offset-0"
                                                />
                                                <span className="text-sm">{service}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6 gap-3">
                                <button
                                    className="px-4 py-2 text-sm border border-white border-opacity-30 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors"
                                    onClick={() => setFilters({ budget: "", rating: "", services: [] })}
                                >
                                    Clear All
                                </button>
                                <button className="px-4 py-2 text-sm bg-bizposter-blue-600 rounded-md hover:bg-bizposter-blue-500 transition-colors" style={{ backgroundColor: 'blue' }}>
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        {agencies.map((agency) => (
                            <div key={agency._id} className="glass-card rounded-xl p-5 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 transform transition-transform hover:scale-[1.01]">
                                <div className="flex-shrink-0">
                                    <div className="bg-bizposter-blue-900 bg-opacity-50 rounded-lg p-2 w-16 h-16 flex items-center justify-center">
                                        <img
                                            src="/lovable-uploads/a1.jpg"
                                            alt="Agency Logo"
                                            className="w-12 h-12 object-cover rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <div className="flex flex-col md:flex-row gap-2 md:gap-6 justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-bold text-lg" style={{ color: 'black' }}>
                                                    {agency.agencyName}
                                                </h3>
                                                <div className="px-2 py-0.5 bg-bizposter-blue-700 bg-opacity-50 rounded text-xs font-medium">
                                                    {agency.services && agency.services.length > 0 ? agency.services[0] : 'No Services'}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center mt-1 gap-2">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={16}
                                                            className={i < (agency.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-sm text-white text-opacity-80" style={{ color: 'black' }}>
                                                    {agency.rating?.toFixed(1) || "0.0"}
                                                </p>
                                                <span className="text-white text-opacity-50">•</span>
                                                <p className="text-sm text-white text-opacity-80" style={{ color: 'black' }}>Marketing Agency</p>
                                                <span className="text-white text-opacity-50">•</span>
                                                <p className="text-sm text-white text-opacity-80" style={{ color: 'black' }}>
                                                    {agency.yearsInBusiness}+ years in business
                                                </p>
                                            </div>

                                            <div className="flex items-start gap-1 mt-2">
                                                <MapPin size={16} className="text-white text-opacity-70 mt-0.5 flex-shrink-0" style={{ color: 'black' }} />
                                                <p className="text-sm text-white text-opacity-70" style={{ color: 'black' }}>
                                                    {agency.agencyDescription}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-3 md:mt-0">
                                            <button className="bg-bizposter-blue-600 hover:bg-bizposter-blue-500 px-5 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap" style={{ backgroundColor: 'blue' }}>
                                                CONNECT
                                            </button>
                                            <button className="bg-white bg-opacity-10 hover:bg-opacity-20 px-5 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                                                INFO
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Agencies;
