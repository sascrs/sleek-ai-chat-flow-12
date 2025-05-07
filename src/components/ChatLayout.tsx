
import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ChatWindow } from './ChatWindow';

interface ChatLayoutProps {
  children?: React.ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="h-screen flex flex-col">
      <Header onMenuClick={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden w-full relative">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : ''}`}>
          {children || <ChatWindow />}
        </main>
      </div>
    </div>
  );
}
