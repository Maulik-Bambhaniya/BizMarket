
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Target, TrendingUp, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { isAbsolute } from 'path';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-section relative overflow-hidden" >
          <div className="container mx-auto relative z-10 flex flex-col items-center" style={{left:-240}}> 
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up" style={{ animationDelay: '0.1s'}}>
              Grow Your Business with the <br className="hidden md:block" />
              <span className="text-bizposter-green">Best Marketing Agencies</span> 🚀
            </h1>
            
            <p className="text-xl md:text-2xl max-w-3xl mb-8 text-white text-opacity-90 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <span className="font-semibold">Connect</span> with experts, 
              <span className="font-semibold"> Create</span> engaging content, 
              <span className="font-semibold text-bizposter-green"> Grow</span> your brand!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <Link to="/profile-setup" className="btn-primary">GET STARTED</Link>
              <Link to="/agencies" className="btn-secondary">BROWSE AGENCIES</Link>
            </div>
          </div>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 opacity-80 hidden lg:block animate-fade-in" style={{ animationDelay: '0.7s',height: 500,width: 500,zIndex: 3,position: 'absolute',
            top:350
          }}>
            <img 
              src="/lovable-uploads/illustration.png" 
              alt="Business illustration" 
              className="w-full h-auto"
            />
          </div>

          {/* Decorative shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-bizposter-blue-500 bg-opacity-30 blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-bizposter-purple bg-opacity-20 blur-xl animate-pulse" style={{ animationDuration: '7s' }}></div>
        </section>
        
        {/* Business Section */}
        <section className="section bg-bizposter-blue-800 text-white">
          <div className="container mx-auto">
            <h2 className="section-title text-center">
              Explore <span className="section-highlight">Businesses</span> Looking for Marketing Agencies 💡
            </h2>
            
            <div className="scroll-container mt-10">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="w-72 md:w-80 glass-card rounded-xl p-5 flex flex-col gap-3 transform transition-transform hover:scale-[1.02]">
                  <div className="bg-bizposter-blue-100 bg-opacity-10 rounded-lg p-2 w-fit">
                    <img 
                      src="/lovable-uploads/b1.jpeg"
                      alt="Business Logo" 
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </div>
                  
                  <h3 className="font-bold text-lg"  style={{color:'black'}}>
                    {item === 1 ? "Business Consulting Services" : 
                     item === 2 ? "XYZ Engineering Limited" : 
                     item === 3 ? "Coffee Place" : 
                     item === 4 ? "Tech Solutions Inc." : "Creative Design Studio"}
                  </h3>
                  
                  <p className="text-sm text-white text-opacity-70"  style={{color:'black'}}>
                    {item === 1 ? "Consulting Agency" : 
                     item === 2 ? "Mechanical Devices Repairing" : 
                     item === 3 ? "A Cafe Shop" : 
                     item === 4 ? "IT Services & Support" : "Graphics & Web Design"}
                  </p>
                  
                  <div className="flex items-center mt-1">
                    <CheckCircle size={16} className="text-bizposter-green mr-2"  style={{color:'black'}}/>
                    <p className="text-sm"  style={{color:'black'}}>Looking for Marketing Work</p>
                  </div>
                  
                  <div className="flex items-start gap-1 mt-1">
                    <MapPin size={16} className="text-white text-opacity-70 mt-0.5 flex-shrink-0"  style={{color:'black'}} />
                    <p className="text-sm text-white text-opacity-70"  style={{color:'black'}}>
                      {item === 1 ? "Gandhinagar, India" : 
                       item === 2 ? "Ahmedabad, India" : 
                       item === 3 ? "Surat, India" : 
                       item === 4 ? "Baroda, India" : "Mumbai, India"}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-1">
                    <Target size={16} className="text-white text-opacity-70"  style={{color:'black'}}/>
                    <p className="text-sm text-white text-opacity-70"  style={{color:'black'}}>
                      {item === 1 ? "Content Creation, Branding, Social Media, SEO" : 
                       item === 2 ? "Digital Marketing, Branding, Social Media, Web" : 
                       item === 3 ? "Marketing, Branding, Imaging, SEO" : 
                       item === 4 ? "Email Marketing, Lead Generation" : "Website Design, SEO, Content"}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={16} className="text-white text-opacity-70"  style={{color:'black'}} />
                    <p className="text-sm text-white text-opacity-70"  style={{color:'black'}}>
                      {item === 1 ? "30K - 50K per Annum" : 
                       item === 2 ? "15K - 25K per Annum" : 
                       item === 3 ? "20K - 45K per Annum" : 
                       item === 4 ? "40K - 60K per Annum" : "25K - 40K per Annum"}
                    </p>
                  </div>
                  
                  <div className="flex justify-between mt-3">
                    <button className="bg-bizposter-blue-600 hover:bg-bizposter-blue-500 px-5 py-2 rounded-md text-sm font-medium transition-colors" style={{backgroundColor:'blue'}} >
                      CONNECT
                    </button>
                    <button className="bg-white bg-opacity-10 hover:bg-opacity-20 px-5 py-2 rounded-md text-sm font-medium transition-colors" style={{color:'black'}}>
                      KNOW MORE
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/businesses" className="inline-flex items-center text-bizposter-green hover:text-bizposter-blue-400 transition-colors font-medium"  style={{color:'black'}}>
                View All Businesses <ArrowRight size={30} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Agencies Section */}
        <section className="section bg-bizposter-blue-900 text-white">
          <div className="container mx-auto">
            <h2 className="section-title text-center">
              Find Best <span className="section-highlight">Marketing Agencies</span> Suitable For Your Businesses 🎯
            </h2>
            
            <div className="mt-10 space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="glass-card rounded-xl p-5 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 transform transition-transform hover:scale-[1.01]">
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
                        <div className="flex items-center">
                          <h3 className="font-bold text-lg"  style={{color:'black'}}>
                            {item === 1 ? "Reflect Digital Marketing" : 
                             item === 2 ? "Sphinx Marketing" : "Mahadev Advertising"}
                          </h3>
                          <div className="ml-3 px-2 py-0.5 bg-bizposter-blue-700 bg-opacity-50 rounded text-xs font-medium">
                            {item === 1 ? "Social Media Marketing" : 
                             item === 2 ? "Social Media Marketing" : "Content Marketing"}
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm ml-2 text-white text-opacity-80"  style={{color:'black'}}>5.0</p>
                          <span className="mx-2 text-white text-opacity-50">•</span>
                          <p className="text-sm text-white text-opacity-80"  style={{color:'black'}}>Marketing Agency</p>
                          <span className="mx-2 text-white text-opacity-50">•</span>
                          <p className="text-sm text-white text-opacity-80"  style={{color:'black'}}>
                            {item === 1 ? "7+ years in business" : 
                             item === 2 ? "5+ years in business" : "3+ years in business"}
                          </p>
                        </div>
                        
                        <p className="text-sm text-white text-opacity-70 mt-2"  style={{color:'black'}}>
                          {item === 1 ? "7th, Third Floor, Titanium City Center, 100ft Anand Nagar Road, Beside Sachin Tower, Ahmedabad, Gujarat 380015" : 
                           item === 2 ? "B-2, Shrinandan Complex, Panchvati Chowk, Waghawadi Road, Bhavnagar, Bhavnagar" : 
                           "102, First Floor, Raj Tower, Opposite ICICI Bank, Race Course Road, Vadodara, Gujarat 390007"}
                        </p>
                      </div>
                      
                      <div className="flex gap-3 mt-3 md:mt-0">
                        <button className="bg-bizposter-blue-600 hover:bg-bizposter-blue-500 px-5 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"  style={{backgroundColor:'blue'}}>
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
            
            <div className="text-center mt-8">
              <Link to="/agencies" className="inline-flex items-center text-bizposter-green hover:text-bizposter-blue-400 transition-colors font-medium"  style={{color:'black'}}>
                View All Agencies <ArrowRight size={30} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Poster Creation Section */}
        <section className="section bg-bizposter-blue-800 text-white">
          <div className="container mx-auto">
            <h2 className="section-title text-center">
              Make Awesome <span className="section-highlight">Poster</span> For Your Businesses!! 🎨
            </h2>
            
            <div className="flex justify-center mt-6 mb-10">
              <div className="max-w-xl w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-2 flex items-center">
                <input
                  type="text"
                  placeholder="Search Templates..."
                  className="w-full bg-transparent px-4 py-2 text-white placeholder-white placeholder-opacity-60 focus:outline-none"
                />
                <button className="bg-bizposter-blue-600 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className="glass-card rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
                  <img
                    src={`https://th.bing.com/th/id/OIP.JjgsaMlB2HO7zIfyw87VqQHaKe?w=206&h=291&c=7&r=0&o=5&dpr=1.3&pid=1.7,${idx}`}
                    alt={`Poster template ${idx + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-medium truncate" style={{color:'black'}}>
                      {idx % 4 === 0 ? "Digital Marketing" :
                       idx % 4 === 1 ? "Hiring Poster" :
                       idx % 4 === 2 ? "Sale Announcement" : "Product Launch"}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-bizposter-blue-700 px-2 py-0.5 rounded">Free</span>
                      <button className="text-xs bg-bizposter-blue-600 hover:bg-bizposter-blue-500 px-2 py-1 rounded transition-colors" >
                        Use
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/poster-creator" className="inline-flex items-center text-bizposter-green hover:text-bizposter-blue-400 transition-colors font-medium" style={{color:'black'}}>
                Browse All Templates <ArrowRight size={30} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
