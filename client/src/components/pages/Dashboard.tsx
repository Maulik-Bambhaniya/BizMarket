
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Dashboard = () => {
  // Mock user data
  const userData = {
    name: "Business_Name",
    occupation: "occupation",
    posts: 420,
    followers: 10000,
    following: 7000
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar with colors matching the website theme */}
      <div className="w-[320px] bg-brand-dark-blue p-6 flex flex-col">
        <h1 className="text-4xl font-bold text-white mb-12">BizMarket</h1>
        
        <div className="space-y-4">
          <Link to="/dashboard" className="flex items-center gap-3 bg-brand-blue text-white p-4 rounded-full">
            <div className="w-8 h-8 bg-white rounded-full"></div>
            <span className="text-xl font-bold">Dashboard</span>
          </Link>
          
          <Link to="/" className="flex items-center gap-3 text-white p-4 rounded-full hover:bg-brand-blue/40 transition-colors">
            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            <span className="text-xl font-bold">Home</span>
          </Link>
          
          <Link to="/businesses" className="flex items-center gap-3 text-white p-4 rounded-full hover:bg-brand-blue/40 transition-colors">
            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            <span className="text-xl font-bold">Businesses</span>
          </Link>
          
          <Link to="/agencies" className="flex items-center gap-3 text-white p-4 rounded-full hover:bg-brand-blue/40 transition-colors">
            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            <span className="text-xl font-bold">Agencies</span>
          </Link>
          
          <Link to="/create-poster" className="flex items-center gap-3 text-white p-4 rounded-full hover:bg-brand-blue/40 transition-colors">
            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            <span className="text-xl font-bold">Create Poster</span>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 bg-brand-dark-blue p-8">
        <div className="grid grid-cols-4 gap-6 mb-6">
          {/* Social media cards */}
          <Card className="bg-white rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Facebook className="text-brand-blue h-8 w-8" />
                <span className="text-xl text-gray-600">Facebook</span>
              </div>
              <img src="/lovable-uploads/fed605d8-4f4d-4cad-b1e2-fb72fa1207c0.png" alt="Facebook Stats" className="h-32 object-contain mx-auto" />
            </CardContent>
          </Card>
          
          <Card className="bg-white rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Instagram className="text-brand-pink h-8 w-8" />
                <span className="text-xl text-gray-600">Instagram</span>
              </div>
              <img src="/lovable-uploads/fed605d8-4f4d-4cad-b1e2-fb72fa1207c0.png" alt="Instagram Stats" className="h-32 object-contain mx-auto" />
            </CardContent>
          </Card>
          
          <Card className="bg-white rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Linkedin className="text-brand-blue h-8 w-8" />
                <span className="text-xl text-gray-600">Linkedin</span>
              </div>
              <img src="/lovable-uploads/fed605d8-4f4d-4cad-b1e2-fb72fa1207c0.png" alt="LinkedIn Stats" className="h-32 object-contain mx-auto" />
            </CardContent>
          </Card>
          
          <Card className="bg-white rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Twitter className="text-brand-light-blue h-8 w-8" />
                <span className="text-xl text-gray-600">Twitter</span>
              </div>
              <img src="/lovable-uploads/fed605d8-4f4d-4cad-b1e2-fb72fa1207c0.png" alt="Twitter Stats" className="h-32 object-contain mx-auto" />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Account Engagement */}
          <Card className="col-span-8 bg-white rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-700">Account Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-3">New Accounts by Month</p>
              <img src="/lovable-uploads/fed605d8-4f4d-4cad-b1e2-fb72fa1207c0.png" alt="Account Engagement" className="h-40 w-full object-contain" />
            </CardContent>
          </Card>
          
          {/* Profile summary */}
          <Card className="col-span-4 bg-white rounded-lg">
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl text-gray-700 text-right">{userData.name}</CardTitle>
              <p className="text-right text-gray-500">{userData.occupation}</p>
            </CardHeader>
            <CardContent>
              <div className="border-t my-6"></div>
              <div className="flex justify-between text-center">
                <div>
                  <p className="text-2xl font-bold">{userData.posts}</p>
                  <p className="text-gray-500">POSTS</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{userData.followers}</p>
                  <p className="text-gray-500">FOLLOWER</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{userData.following}</p>
                  <p className="text-gray-500">FOLLOWING</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Visitors */}
          <Card className="bg-white rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-700">Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <img src="/lovable-uploads/fed605d8-4f4d-4cad-b1e2-fb72fa1207c0.png" alt="Visitors" className="h-32 object-contain" />
            </CardContent>
          </Card>
          
          {/* Insights */}
          <Card className="bg-white rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-700">Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-center justify-center">
                <p className="text-gray-400">No insights data available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
