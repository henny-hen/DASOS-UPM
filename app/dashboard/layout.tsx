'use client';

import React, { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '@/components/Menu';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ 
  children,
}: DashboardLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show loading or nothing while checking authentication
  if (loading || !user) {
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#2c015e] via-[#470296] to-[#2c015e]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-full p-4 mb-4"></div>
          <div className="h-4 w-40 bg-purple-300 bg-opacity-20 rounded mb-3"></div>
          <div className="h-3 w-32 bg-purple-300 bg-opacity-20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-[#2c015e] via-[#470296]
            to-[#2c015e] opacity-100 backdrop-blur-sm text-white overflow-hidden">

        {/* Sidebar */}
        <div className='h-screen flex w-[14%] md:w-[8%] lg:w-[14%] xl:w-[14%] '>
            <Menu user={user} />
        </div>
        
        {/* Main content */}
        <div className='h-screen w-[86%] md:w-[92%] lg:w-[86%] xl:w-[86%] overflow-scroll'>
            {children}
        </div>
    </div>
  );
}