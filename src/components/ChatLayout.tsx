
import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ChatWindow } from './ChatWindow';

export function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="h-screen flex flex-col">
      <Header onMenuClick={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 md:ml-64 relative">
          <ChatWindow />
        </main>
      </div>
    </div>
  );
}
