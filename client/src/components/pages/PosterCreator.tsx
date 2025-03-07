
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PosterCreator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const templates = Array.from({ length: 12 }).map((_, idx) => ({
    id: idx + 1,
    name: idx % 4 === 0 ? "Digital Marketing" :
          idx % 4 === 1 ? "Hiring Poster" :
          idx % 4 === 2 ? "Sale Announcement" : "Product Launch",
    image: `https://th.bing.com/th/id/OIP.JjgsaMlB2HO7zIfyw87VqQHaKe?w=206&h=291&c=7&r=0&o=5&dpr=1.3&pid=1.7,${idx}`,
    isPremium: idx % 3 === 0
  }));
  
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-bizposter-blue-800 text-white pt-24 pb-12 px-4 md:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up text-center">
            Make Awesome <span className="text-bizposter-green">Poster</span> For Your Businesses!! 🎨
          </h1>
          
          <div className="flex justify-center mt-6 mb-10">
            <form onSubmit={handleSearch} className="max-w-xl w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-2 flex items-center">
              <input
                type="text"
                placeholder="Search Templates..."
                className="w-full bg-transparent px-4 py-2 text-white placeholder-white placeholder-opacity-60 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-bizposter-blue-600 text-white p-2 rounded-full">
                <Search size={20} />
              </button>
            </form>
          </div>
          
          {selectedTemplate ? (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Editing: {selectedTemplate.name}</h2>
                <button 
                  onClick={() => setSelectedTemplate(null)}
                  className="bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Back to Templates
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3">
                  <div className="bg-white p-4 rounded-lg aspect-[3/4] flex items-center justify-center">
                    <img
                      src={selectedTemplate.image}
                      alt={selectedTemplate.name}
                      className="max-h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-semibold mb-4">Edit Poster</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Text</label>
                      <textarea
                        className="w-full bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-md px-4 py-2 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                        rows={3}
                        placeholder="Enter text to add to poster..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Font</label>
                      <select className="w-full bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-md px-4 py-2 text-white">
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Color</label>
                      <div className="flex space-x-2">
                        {["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00"].map(color => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded-full border border-white border-opacity-50"
                            style={{ backgroundColor: color }}
                          ></button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Upload Image</label>
                      <div className="border-2 border-dashed border-white border-opacity-30 rounded-md p-4 text-center">
                        <p className="text-sm text-white text-opacity-70">Drop your image here, or browse</p>
                        <button className="mt-2 px-4 py-1 bg-white bg-opacity-10 hover:bg-opacity-20 rounded text-sm transition-colors">
                          Browse
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button className="w-full bg-bizposter-blue-600 hover:bg-bizposter-blue-500 py-2 rounded-md font-medium transition-colors">
                        Download Poster
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {templates.map((template) => (
                <div 
                  key={template.id} 
                  className="glass-card rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-medium truncate" style={{color:'black'}}>{template.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-bizposter-blue-700 px-2 py-0.5 rounded">
                        {template.isPremium ? 'Premium' : 'Free'}
                      </span>
                      <button className="text-xs bg-bizposter-blue-600 hover:bg-bizposter-blue-500 px-2 py-1 rounded transition-colors">
                        Use
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PosterCreator;
