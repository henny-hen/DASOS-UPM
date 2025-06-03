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
      <div className='h-full bg-[#2c015e] p-4 flex flex-col border-r border-purple-800 border-opacity-20'>
        {/* Logo  rounded-full border-white border-2*/}
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-3 font-bold p-5"
          aria-label="Ir al Dashboard"
        >
          <Image
            src="/icons/image.svg"
            alt="Logo de la Universidad Politécnica de Madrid"
            width={32}
            height={38}
            priority
          />
          <span className="hidden lg:block text-xl font-outfit text-white">DASOS UPM</span>
        </Link>

        {/* User info */}
        {/*}
        <div className="flex flex-col items-center mb-6 mt-2">
          <div className="relative w-12 h-12 lg:w-16 lg:h-16 mb-2">
            <Image 
              src={user.avatar || "/avatars/default.png"} 
              alt={`Avatar de ${user.name}`}
              width={64}
              height={64}
              className="rounded-full border-2 border-purple-400"
            />
            <div
              className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"
              aria-label="Usuario en línea"
              role="status"
            ></div>
          </div>
          <div className="text-center">
            <h3 className="hidden lg:block text-sm font-medium text-white">{user.name}</h3>
            <p className="hidden lg:block text-xs text-purple-300">
              {user.role === 'student' ? 'Estudiante' : user.role === 'professor' ? 'Profesor' : 'Administrador'}
            </p>
          </div>
        </div>
        */}

        {/* Menu sections {section.title} */}
        <nav aria-label="Menú principal" role="navigation">
          {menuItems.map(section => (
            <div className='flex flex-col gap-2' key={section.title}>
              <span
                className='hidden lg:block text-pink-200 font-light my-4'
                aria-label={`Sección ${section.title}`}
              >
                
              </span>
              <ul className='flex-grow' role="menu" aria-label={section.title}>
                {section.items.map(item => {
                  const isActive = pathname === item.href;
                  const isLogout = item.href === '#logout';

                  return (
                    <li key={item.label} role="none">
                      <Link
                        href={item.href}
                        onClick={isLogout ? handleLogoutClick : undefined}
                        className={`group flex lg:justify-start justify-center text-sm ml-2
                          font-medium gap-4 p-3 transition-colors rounded-xl mb-2 
                          ${isActive 
                            ? 'bg-white text-[#2c015e]' 
                            : 'text-white hover:bg-white hover:text-[#2c015e] hover:bg-opacity-20'
                          }
                          ${isLogout ? 'hover:text-red-500' : 'hover:text-[#2c015e]'}
                        `}
                        aria-current={isActive ? 'page' : undefined}
                        role="menuitem"
                        tabIndex={0}
                        aria-label={item.label}
                      >
                        <Image
                          src={item.icon}
                          alt=""
                          width={20}
                          height={20}
                          aria-hidden="true"
                        />
                        <span className='hidden lg:flex items-center gap-8'>
                          {item.label}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-6 h-6 text-[#2c015e] rounded-t-full  rounded-b-full opacity-0 transition-all
                            ${isActive ? 'group-hover:opacity-0' : 'group-hover:opacity-100 group-hover:translate-x-2 group-hover:duration-500'}
                             ${isLogout ? 'text-red-500' : 'text-[#2c015e]'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Menu;