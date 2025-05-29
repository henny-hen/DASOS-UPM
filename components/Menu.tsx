'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/auth';
import { usePathname } from 'next/navigation';

// Define menu item interface
interface MenuItem {
  icon: string;
  label: string;
  href: string;
}

// Define menu section interface
interface MenuSection {
  title: string;
  items: MenuItem[];
}

function Menu({ user }: { user: any }) {
  const { logout } = useAuth();
  const pathname = usePathname();

  const menuItems: MenuSection[] = [
    {
      title: "CONSULTAS",
      items: [
        {
          icon: "/icons/dashboard.svg",
          label: "Dashboard",
          href: "/dashboard",
        },
        {
          icon: "/icons/search.svg",
          label: "Buscar",
          href: "/dashboard/subjectdata",
        },
      ]
    },
    {
      title: "USUARIO",
      items: [
        {
          icon: "/icons/profile.svg",
          label: "Perfil",
          href: "/dashboard/profile",
        },
        {
          icon: "/icons/settings.svg",
          label: "Ajustes",
          href: "/dashboard/settings",
        },
        {
          icon: "/icons/logout.svg",
          label: "Cerrar Sesión",
          href: "#logout", // Special case for logout
        },
      ]
    }
  ];

  // Handle logout click
  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className='w-full h-full'>
      <div className='h-full bg-[#2c015e] p-4 flex flex-col border-r border-white border-opacity-20'>
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center justify-center gap-2 font-bold p-5">
          <Image src="/upm-logo.png" alt="UPM Logo" width={32} height={32} className="rounded-full border-white border-2" />
          <span className="hidden lg:block text-white">DASOS UPM</span>
        </Link>

        {/* User info */}
        {/*}
        <div className="flex flex-col items-center mb-6 mt-2">
          <div className="relative w-12 h-12 lg:w-16 lg:h-16 mb-2">
            <Image 
              src={user.avatar || "/avatars/default.png"} 
              alt={user.name}
              width={64}
              height={64}
              className="rounded-full border-2 border-purple-400"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
          </div>
          <div className="text-center">
            <h3 className="hidden lg:block text-sm font-medium text-white">{user.name}</h3>
            <p className="hidden lg:block text-xs text-purple-300">{user.role === 'student' ? 'Estudiante' : user.role === 'professor' ? 'Profesor' : 'Administrador'}</p>
          </div>
        </div>

        {/* Menu sections */}
        {menuItems.map(section => (
          <div className='flex flex-col gap-2' key={section.title}>
            <span className='hidden lg:block text-pink-200 font-light my-4'>{section.title}</span>
            <nav className='flex-grow'>
              {section.items.map(item => {
                const isActive = pathname === item.href;
                const isLogout = item.href === '#logout';

                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    onClick={isLogout ? handleLogoutClick : undefined}
                    className={`flex lg:justify-start justify-center text-sm ml-2
                      font-medium gap-4 p-4 transition-colors rounded-lg mb-2 
                      ${isActive 
                        ? 'bg-white text-[#2c015e]' 
                        : 'text-white hover:bg-white hover:text-[#2c015e] hover:bg-opacity-20'
                      }
                      ${isLogout ? 'hover:text-red-500' : 'hover:text-[#2c015e]'}
                    `}
                  >
                    <Image  src={item.icon} alt="" width={20} height={20} />
                    <span className='hidden lg:block'>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}


      </div>
    </div>
  );
}

export default Menu;