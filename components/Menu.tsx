'use client';

import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/auth';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Define menu item interface
interface MenuItem {
  icon: string;
  label: string;
  href: string;
  shortcut?: string; 
}

// Define menu section interface
interface MenuSection {
  title: string;
  items: MenuItem[];
}

function Menu({ user }: { user: any }) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  // Check if we're on mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isMobile]);

  const menuItems: MenuSection[] = [
    {
      title: "CONSULTAS",
      items: [
        {
          icon: "/icons/dashboard.svg",
          label: "Dashboard",
          href: "/dashboard",
          shortcut: "Alt+H"
        },
        {
          icon: "/icons/search.svg",
          label: "Buscar",
          href: "/dashboard/subjectdata",
          shortcut: "Alt+S"
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
          shortcut: "Alt+P"
        },
        {
          icon: "/icons/settings.svg",
          label: "Ajustes",
          href: "/dashboard/settings",
          shortcut: "Alt+,"
        },
        {
          icon: "/icons/logout.svg",
          label: "Cerrar Sesión",
          href: "#logout",
          shortcut: "Ctrl+Shift+Q"
        },
      ]
    }
  ];

  // Handle logout click
  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
      if (!menuRef.current) return;

      const focusableElements = menuRef.current.querySelectorAll(
        'a[role="menuitem"]:not([disabled])'
      ) as NodeListOf<HTMLAnchorElement>;
      
      const currentIndex = Array.from(focusableElements).findIndex(
        el => el === document.activeElement
      );
switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
        focusableElements[nextIndex]?.focus();
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
        focusableElements[prevIndex]?.focus();
        break;
      
      case 'Home':
        e.preventDefault();
        focusableElements[0]?.focus();
        break;
      
      case 'End':
        e.preventDefault();
        focusableElements[focusableElements.length - 1]?.focus();
        break;
      
      case 'Enter':
      case ' ':
        if (document.activeElement instanceof HTMLAnchorElement) {
          e.preventDefault();
          document.activeElement.click();
        }
        break;
    }
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  const handleBackdropClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Desktop sidebar (lg and up)
  const DesktopSidebar = () => (
    <div className='w-full h-full'>
      <div className='h-full bg-[#2c015e] p-4 flex flex-col border-r border-purple-800 border-opacity-20' ref={menuRef} onKeyDown={handleMenuKeyDown}>
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-3 font-bold p-5 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg"
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

        {/* Menu sections */}
        <nav aria-label="Menú principal" role="navigation" className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
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
                          focus:outline-none focus:ring-2 focus:ring-purple-400 
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
                        title={item.shortcut ? `Atajo: ${item.shortcut}` : undefined}
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
                            className={`w-6 h-6 text-[#2c015e] rounded-t-full rounded-b-full opacity-0 transition-all
                            ${isActive ? 'group-hover:opacity-0' : 'group-hover:opacity-100 group-hover:translate-x-2 group-hover:duration-500'}
                             ${isLogout ? 'text-red-500' : 'text-[#2c015e]'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
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

        {/* Keyboard shortcuts hint */}
        <div className="mt-auto pt-4 border-t border-purple-800 border-opacity-20">
          <div className="text-center">
            <button
              onClick={() => document.dispatchEvent(new CustomEvent('showKeyboardShortcuts'))}
              className="text-xs text-purple-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 rounded px-2 py-1"
              aria-label="Mostrar atajos de teclado"
            >
              <span className="hidden lg:inline">Presiona </span>
              <span className="font-mono bg-purple-800 bg-opacity-50 px-1 rounded">?</span>
              <span className="hidden lg:inline"> para atajos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile hamburger button
  const MobileMenuButton = () => (
    <motion.button
      onClick={toggleMobileMenu}
      className="fixed top-4 left-4 z-50 p-3 bg-[#2c015e]/75 rounded-xl shadow-lg border border-purple-800 border-opacity-20"
      aria-label="Toggle navigation menu"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        <motion.span
          className="block h-0.5 w-6 bg-white mb-1"
          animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block h-0.5 w-6 bg-white mb-1"
          animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block h-0.5 w-6 bg-white"
          animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.button>
  );

  // Mobile sidebar overlay
  const MobileSidebar = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleBackdropClick}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-80 bg-[#2c015e] z-50 shadow-2xl"
          >
            <div className="h-full p-4 flex flex-col overflow-hidden">
              {/* Logo */}
              <div className="flex items-center justify-center gap-3 font-bold p-5 mb-4">
                <Image
                  src="/icons/image.svg"
                  alt="Logo de la Universidad Politécnica de Madrid"
                  width={32}
                  height={38}
                  priority
                />
                <span className="text-xl font-outfit text-white">DASOS UPM</span>
              </div>


              {/* Menu sections */}
              <nav 
                aria-label="Menú principal" 
                role="navigation" 
                className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent"
              >
                {menuItems.map((section, sectionIndex) => (
                  <motion.div 
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIndex * 0.1 + 0.2 }}
                    className='flex flex-col gap-2 mb-6'
                  >
                    <span className='text-pink-200 font-light text-xs uppercase tracking-wider mb-2'>

                    </span>
                    <ul className='flex-grow space-y-1' role="menu" aria-labelledby="menubutton" aria-label={section.title}>
                      {section.items.map((item, itemIndex) => {
                        const isActive = pathname === item.href;
                        const isLogout = item.href === '#logout';

                        return (
                          <motion.li 
                            key={item.label} 
                            role="none"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) + 0.3 }}
                          >
                            <Link
                              href={item.href}
                              onClick={isLogout ? handleLogoutClick : undefined}
                              className={`group flex items-center text-sm font-medium gap-4 p-3 transition-all rounded-xl
                                ${isActive 
                                  ? 'bg-white text-[#2c015e] shadow-lg' 
                                  : 'text-white hover:bg-white hover:bg-opacity-20 hover:translate-x-1'
                                }
                                ${isLogout ? 'hover:text-red-400' : ''}
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
                                className={isLogout ? 'group-hover:filter group-hover:brightness-0 group-hover:sepia group-hover:hue-rotate-320 group-hover:saturate-500' : ''}
                              />
                              <span className='flex-1'>{item.label}</span>
                              {!isLogout && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`w-4 h-4 opacity-0 transition-all
                                  ${isActive ? 'opacity-0' : 'group-hover:opacity-100 group-hover:translate-x-1'}
                                  `}
                                  fill="none"
                                  role="img"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <title>Icono de flecha derecha</title>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </Link>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Render based on screen size
  if (isMobile) {
    return (
      <>
        <MobileMenuButton />
        <MobileSidebar />
      </>
    );
  }

  return <DesktopSidebar />;
}

export default Menu;