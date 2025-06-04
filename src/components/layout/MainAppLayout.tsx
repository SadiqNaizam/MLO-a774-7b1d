import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';
import { X } from 'lucide-react';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  activePath?: string; // Optional: pass activePath to Sidebar
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, pageTitle, activePath }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Static Sidebar for Desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-20 border-r border-sidebar-border bg-sidebar">
        <Sidebar activePath={activePath} />
      </div>

      {/* Mobile Sidebar (Drawer) */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex" role="dialog" aria-modal="true">
          {/* Backdrop */} 
          <div
            className="fixed inset-0 bg-black/60 transition-opacity duration-300 ease-linear data-[state=open]:opacity-100 data-[state=closed]:opacity-0"
            aria-hidden="true"
            onClick={toggleMobileSidebar}
            data-state={isMobileSidebarOpen ? 'open' : 'closed'}
          />
          {/* Sidebar Panel */} 
          <div className={cn(
            "relative flex w-64 max-w-xs flex-1 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out",
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <div className="absolute top-2 right-2 pt-2 lg:hidden">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-sidebar-primary-foreground hover:bg-sidebar-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sidebar-primary"
                onClick={toggleMobileSidebar}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <Sidebar onLinkClick={closeMobileSidebar} activePath={activePath} />
          </div>
        </div>
      )}

      {/* Main Content Area */} 
      <div className="flex flex-1 flex-col lg:pl-64">
        <Header
          pageTitle={pageTitle}
          onToggleSidebar={toggleMobileSidebar}
          className="sticky top-0 z-10"
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-muted">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
