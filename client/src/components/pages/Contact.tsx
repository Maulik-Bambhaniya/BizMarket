
import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-bizposter-blue-800 text-white pt-24 pb-12 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto glass-card rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-3">
                <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{color:'black'}}>Get In Touch</h1>
                <p className="text-white text-opacity-70 mb-6" style={{color:'black'}}>
                  We Are Here For You! How can we help You?
                </p>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1" style={{color:'black'}}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-md text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1" style={{color:'black'}}>
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-md text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1" style={{color:'black'}}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Go ahead, we are listening..."
                        className="w-full px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-md text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 resize-none"
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-bizposter-blue-600 hover:bg-bizposter-blue-500 py-3 rounded-md font-medium transition-colors"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="md:col-span-2 flex flex-col justify-between" >
                <div>
                  <div className="flex items-center mb-6">
                    <img
                      src="https://www.meshini.com/themes/meshini-v3/assets/img/icons/contact_us.png"
                      alt="Contact Us"
                      className="w-32 h-auto"
                    />
                    <h2 className="text-xl font-bold ml-4" style={{color:'black'}}>CONTACT US!</h2>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <Mail className="mr-3 text-bizposter-green flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-medium" style={{color:'black'}}>Email Address</h3>
                        <p className="text-white text-opacity-70" style={{color:'black'}}>info@bizmarket.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="mr-3 text-bizposter-green flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-medium" style={{color:'black'}}>Phone</h3>
                        <p className="text-white text-opacity-70" style={{color:'black'}}>+91 00000 00000</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="mr-3 text-bizposter-green flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-medium" style={{color:'black'}}>Location</h3>
                        <p className="text-white text-opacity-70" style={{color:'black'}}>
                          123 Business Street, Tech Park, City, 12345
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-medium mb-2" style={{color:'black'}}>Business Hours</h3>
                  <p className="text-sm text-white text-opacity-70" style={{color:'black'}}>Monday - Friday: 9 AM - 6 PM</p>
                  <p className="text-sm text-white text-opacity-70" style={{color:'black'}}>Saturday: 10 AM - 4 PM</p>
                  <p className="text-sm text-white text-opacity-70" style={{color:'black'}}>Sunday: Closed</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
