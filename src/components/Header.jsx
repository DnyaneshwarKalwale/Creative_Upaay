import React from 'react';
import { Search, Calendar, Bell } from 'lucide-react';

function Header() {
  return (
    <div className="bg-white border-b px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search for anything..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Calendar className="text-xl" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell className="text-xl" />
          </button>
          <img src="/5042458.jpg" alt="Profile"className="w-8 h-8 rounded-full border-2 border-white"/>
        </div>
      </div>
    </div>
  );
}

export default Header;
