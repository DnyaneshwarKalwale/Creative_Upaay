import React, { useState } from 'react';
import { Home, MessageSquare, ListChecks, Users, Settings, MoreHorizontal } from 'lucide-react';

function Sidebar() {
  const projects = [
    { name: 'Mobile App', active: true, color: 'bg-green-500' },
    { name: 'Website Redesign', active: false, color: 'bg-orange-500' },
    { name: 'Design System', active: false, color: 'bg-purple-500' },
    { name: 'Wireframes', active: false, color: 'bg-blue-500' }
  ];

  return (
    <div className="w-64 bg-white border-r p-4 flex flex-col justify-between h-screen">
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-6 h-6 bg-purple-600 rounded-lg"></div>
          <h1 className="text-lg font-semibold">Project M.</h1>
        </div>

        <nav className="space-y-1">
          <a href="#" className="flex items-center space-x-2 px-3 py-1 text-gray-600">
            <Home className="text-lg" />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-1 text-gray-600">
            <MessageSquare className="text-lg" />
            <span>Messages</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-1 text-gray-600">
            <ListChecks className="text-lg" />
            <span>Tasks</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-1 text-gray-600">
            <Users className="text-lg" />
            <span>Members</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-1 text-gray-600">
            <Settings className="text-lg" />
            <span>Settings</span>
          </a>
        </nav>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-400">MY PROJECTS</h2>
            <button className="text-gray-400 text-sm">+</button>
          </div>
          <div className="space-y-1">
            {projects.map((project) => (
              <a key={project.name} href="#" className={`flex items-center justify-between px-3 py-1 rounded-lg ${
                project.active ? 'bg-purple-50 text-purple-600' : 'text-gray-600'}`}>
                <span className="flex items-center space-x-1">
                  <span className={`w-2 h-2 rounded-full ${project.color}`}></span>
                  <span className="text-sm">{project.name}</span>
                </span>
                {project.active && <MoreHorizontal className="text-sm" />}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded-lg text-center">
        <div className="w-5 h-5 bg-yellow-400 rounded-full mx-auto mb-1"></div>
        <h3 className="text-xs font-semibold">Thoughts Time</h3>
        <p className="text-xs text-gray-500 mb-1">We don’t have any notice for you, till then you can share your thoughts with your peers.</p>
        <button className="text-purple-600 text-xs">Write a message</button>
      </div>
    </div>
  );
}

export default Sidebar;


