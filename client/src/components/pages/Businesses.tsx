import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MapPin, Target, TrendingUp, Filter, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

interface Business {
    _id: string;
    businessName: string;
    businessDescription: string;
    type: string;
    rating: number;
    businessEmail: string;
    businessWebsite: string;
    businessOwner: string;
    createdAt: string;
    updatedAt: string;
}

const Businesses = () => {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Default sort order
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBusinesses = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`/api/businesses?searchTerm=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`);
                setBusinesses(response.data.data.businesses);
                setTotalPages(response.data.data.totalPages); // Assuming totalPages is in the response
            } catch (error: any) {
                setError(error.message || 'Failed to fetch businesses');
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, [searchTerm, sortBy, sortOrder, page, limit]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [field, order] = e.target.value.split('_');
        setSortBy(field);
        setSortOrder(order as 'asc' | 'desc');
    };

    if (loading) return <div>Loading businesses...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow bg-bizposter-blue-900 text-white pt-24 pb-12 px-4 md:px-8">
                <div className="container mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
                        Explore <span className="text-bizposter-green">Businesses</span> Looking for Marketing Agencies 💡
                    </h1>

                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-grow">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search businesses..."
                                    className="w-full bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-md px-4 py-2 pl-10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <Search className="absolute left-3 top-2.5 text-white text-opacity-70" size={18} />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-md font-medium transition-colors flex items-center">
                                <Filter size={18} className="mr-2" /> Filter
                            </button>
                            <select
                                className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-md font-medium transition-colors text-white appearance-none cursor-pointer pr-8 pl-4"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundPosition: 'right 10px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}
                                value={`${sortBy}_${sortOrder}`}
                                onChange={handleSortChange}
                            >
                                <option value="">Sort by</option>
                                <option value="rating_desc">Rating: High to Low</option>
                                <option value="rating_asc">Rating: Low to High</option>
                                <option value="businessName_asc">Name (A-Z)</option>
                                <option value="businessName_desc">Name (Z-A)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {businesses.map((business) => (
                            <div key={business._id} className="glass-card rounded-xl p-5 flex flex-col gap-3 transform transition-transform hover:scale-[1.02]">
                                <div className="bg-bizposter-blue-100 bg-opacity-10 rounded-lg p-2 w-fit">
                                    <img
                                        src="/lovable-uploads/b3.jpeg"
                                        alt="Business Logo"
                                        className="w-12 h-12 object-cover rounded-md"
                                    />
                                </div>

                                <h3 className="font-bold text-lg" style={{ color: 'black' }}>
                                    {business.businessName}
                                </h3>

                                <p className="text-sm text-white text-opacity-70" style={{ color: '#272727' }}>
                                    {business.businessDescription}
                                </p>

                                <div className="flex items-center mt-1">
                                    <CheckCircle size={16} className="text-bizposter-green mr-2" style={{ color: 'black' }} />
                                    <p className="text-sm" style={{ color: 'black' }}>Looking for Marketing Work</p>
                                </div>

                                <div className="flex items-start gap-1 mt-1">
                                    <MapPin size={16} className="text-white text-opacity-70 mt-0.5 flex-shrink-0" style={{ color: 'black' }} />
                                    <p className="text-sm text-white text-opacity-70" style={{ color: 'black' }}>
                                        {business.type}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1 mt-1">
                                    <Target size={16} className="text-white text-opacity-70" style={{ color: 'black' }} />
                                    <p className="text-sm text-white text-opacity-70" style={{ color: 'black' }}>
                                        {business.businessEmail}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp size={16} className="text-white text-opacity-70" style={{ color: 'black' }} />
                                    <p className="text-sm text-white text-opacity-70" style={{ color: 'black' }}>
                                        {business.businessWebsite}
                                    </p>
                                </div>

                                <div className="flex justify-between mt-3">
                                    <button className="bg-bizposter-blue-600 hover:bg-bizposter-blue-500 px-5 py-2 rounded-md text-sm font-medium transition-colors" style={{ backgroundColor: 'blue' }}>
                                        CONNECT
                                    </button>
                                    <button className="bg-white bg-opacity-10 hover:bg-opacity-20 px-5 py-2 rounded-md text-sm font-medium transition-colors" style={{ color: 'black' }}>
                                        KNOW MORE
                                    </button>
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

export default Businesses;
