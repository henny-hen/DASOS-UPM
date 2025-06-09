'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Menu from '@/components/Menu';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import KeyboardShortcutsModal from '@/components/KeyboardShortcutsModal';
import { use } from 'chai';


interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ 
  children,
}: DashboardLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useKeyboardShortcuts();
  // Check if we're on mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show loading or nothing while checking authentication
  if (loading || !user) {
    return (
      <div
        className="h-screen flex justify-center items-center bg-gradient-to-br from-[#2c015e] via-[#470296] to-[#2c015e]"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="animate-pulse flex flex-col items-center">
          <div
            className="w-60 h-70 rounded-full p-4 mb-4"
            aria-label="Loading"
          >
            <Image 
              src="/icons/image.svg" 
              width={220} 
              height={280} 
              className="w-full h-full"
              aria-hidden="true" 
              alt='loading logo'
            />
          </div>
          <div className="h-4 w-40 bg-purple-300 bg-opacity-20 rounded mb-3"></div>
          <div className="h-3 w-32 bg-purple-300 bg-opacity-20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main
      className="h-min-screen flex bg-gradient-to-br from-[#2c015e] via-[#4c1d95] animated-gradient to-[#170030] opacity-100 backdrop-blur-sm animate-gradient text-white scrollbar-hidden overflow-hidden"
      role="main"
      tabIndex={-1}
      aria-label="DASOS UPM"
    >
      {/* Desktop Sidebar */}
      {!isMobile && (
        <nav
          className='h-screen flex w-[14%] md:w-[8%] lg:w-[14%] xl:w-[14%] fixed left-0 top-0 z-30'
          aria-label="navigation"
          role="navigation"
        >
          <Menu user={user} />
        </nav>
      )}

      {/* Mobile Menu */}
      {isMobile && <Menu user={user} />}
      
      {/* Main content */}
      <div
        id="main-content"
        aria-label='Dashboard content'
        tabIndex={-1}  
        className={`min-h-screen focus:outline-none overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent
          ${isMobile 
            ? 'w-full scrollbar-thumb-purple-500 scrollbar-track-transparent' 
            : ' h-screen w-[86%] md:w-[92%] lg:w-[86%] xl:w-[86%] ml-[14%] md:ml-[8%] lg:ml-[14%] xl:ml-[14%]'
          }
        `}

      >
        {children}
      </div>
      <KeyboardShortcutsModal />
    </main>
  );
}