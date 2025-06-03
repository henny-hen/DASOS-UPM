'use client';

import React, { ReactNode, useEffect } from 'react';
import Menu from '@/components/Menu';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ 
  children,
}: DashboardLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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
            <Image src="/icons/image.svg" width={220} height={280} className="w-full h-full"
                      aria-hidden="true" alt='loading logo'></Image>

          </div>
          <div className="h-4 w-40 bg-purple-300 bg-opacity-20 rounded mb-3"></div>
          <div className="h-3 w-32 bg-purple-300 bg-opacity-20 rounded"></div>
        </div>
      </div>
    );
  }
      {/* from-[#2c015e] via-[#470296]
            to-[#2c015e] from-[#23014a] via-[#470296]
            to-[#170030] 581c87 */}
  return (
    <div
      className="h-screen flex bg-gradient-to-br from-[#2c015e] via-[#4c1d95] animated-gradient to-[#170030] opacity-100 backdrop-blur-sm animate-gradient text-white overflow-hidden"
      role="main"
      tabIndex={-1}
      aria-label="Dashboard main content"
    >

      {/* Sidebar */}
      <nav
        className='h-screen flex w-[14%] md:w-[8%] lg:w-[14%] xl:w-[14%]'
        aria-label="Sidebar navigation"

      >
        <Menu user={user} />
      </nav>
      
      {/* Main content */}
      <main
        className='h-screen w-[86%] md:w-[92%] lg:w-[86%] xl:w-[86%] focus:outline-none overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent'
        aria-label="Dashboard content"
      >
        {children}

      </main>
      
    </div>
  );
}