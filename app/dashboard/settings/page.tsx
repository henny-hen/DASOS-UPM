'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth';

interface SettingsTab {
  id: string;
  label: string;
}

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    updates: true,
    news: false
  });
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('es');
  const [successMessage, setSuccessMessage] = useState('');
  
  const tabs: SettingsTab[] = [
    { id: 'general', label: 'General' },
    { id: 'notifications', label: 'Notificaciones' },
    { id: 'privacy', label: 'Privacidad y seguridad' },
    { id: 'appearance', label: 'Apariencia' },
  ];
  
  const handleSaveSettings = () => {
    // In a real app, you would save settings to your backend
    setSuccessMessage('Configuración guardada correctamente');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  if (!user) return null;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 font-outfit">Configuración</h1>
      
      {/* Success message */}
      {successMessage && (
        <div className="bg-green-900 bg-opacity-30 text-green-200 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs navigation */}
        <div className="md:w-1/4">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg">
            <ul>
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 transition-colors rounded-md ${
                      activeTab === tab.id 
                        ? 'bg-purple-950 text-white font-medium' 
                        : 'text-purple-950 hover:bg-purple-900 hover:text-white hover:bg-opacity-10'
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="md:w-3/4">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-xl ">
            {/* General settings */}
            {activeTab === 'general' && (
              <div>
                <h2 className="text-xl font-bold text-purple-950 font-outfit mb-6">Configuración general</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-purple-900 text-sm font-medium mb-2">
                      Idioma
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full p-3 bg-white bg-opacity-10 text-gray-600 border border-purple-300 border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-purple-900 text-sm font-medium mb-2 mt-3">
                      Zona horaria
                    </label>
                    <select
                      className="w-full p-3 bg-white bg-opacity-10 text-gray-600 border border-purple-300 border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Europe/Madrid">Europe/Madrid (UTC+01:00)</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York (UTC-05:00)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notifications settings */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold text-purple-950 font-outfit mb-6">Configuración de notificaciones</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-purple-950 font-medium">Notificaciones por correo</h3>
                      <p className="text-purple-800 text-sm">Recibir notificaciones por correo electrónico</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="email-notifications"
                        checked={notifications.email}
                        onChange={() => handleToggleNotification('email')}
                        className="sr-only"
                      />
                      <label 
                        htmlFor="email-notifications"
                        className={`block w-14 h-7 rounded-full flex items-center transition-colors ${notifications.email ? 'bg-purple-700' : 'bg-gray-600'}`}
                      >
                        <span 
                          className={`block w-5 h-5 ml-1 bg-white rounded-full transition-transform ${notifications.email ? 'transform translate-x-7' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <h3 className="text-purple-950 font-medium">Notificaciones del navegador</h3>
                      <p className="text-purple-800 text-sm">Recibir notificaciones en el navegador</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="browser-notifications"
                        checked={notifications.browser}
                        onChange={() => handleToggleNotification('browser')}
                        className="sr-only"
                      />
                      <label 
                        htmlFor="browser-notifications"
                        className={`block w-14 h-7 rounded-full flex items-center transition-colors ${notifications.browser ? 'bg-purple-700' : 'bg-gray-600'}`}
                      >
                        <span 
                          className={`block w-5 h-5 ml-1 bg-white rounded-full transition-transform ${notifications.browser ? 'transform translate-x-7' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <h3 className="text-purple-950 font-medium">Actualizaciones del sistema</h3>
                      <p className="text-purple-800 text-sm">Recibir notificaciones sobre actualizaciones</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="updates-notifications"
                        checked={notifications.updates}
                        onChange={() => handleToggleNotification('updates')}
                        className="sr-only"
                      />
                      <label 
                        htmlFor="updates-notifications"
                        className={`block w-14 h-7 rounded-full flex items-center transition-colors ${notifications.updates ? 'bg-purple-700' : 'bg-gray-600'}`}
                      >
                        <span 
                          className={`block w-5 h-5 ml-1 bg-white rounded-full transition-transform ${notifications.updates ? 'transform translate-x-7' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <h3 className="text-purple-950 font-medium">Noticias y eventos</h3>
                      <p className="text-purple-800 text-sm">Recibir notificaciones sobre noticias y eventos</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="news-notifications"
                        checked={notifications.news}
                        onChange={() => handleToggleNotification('news')}
                        className="sr-only"
                      />
                      <label 
                        htmlFor="news-notifications"
                        className={`block w-14 h-7 rounded-full flex items-center transition-colors ${notifications.news ? 'bg-purple-700' : 'bg-gray-600'}`}
                      >
                        <span 
                          className={`block w-5 h-5  ml-1 bg-white rounded-full transition-transform ${notifications.news ? 'transform translate-x-7' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Privacy and security settings */}
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-xl font-bold text-purple-950 font-outfit mb-6">Privacidad y seguridad</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-purple-900 font-medium mb-2">Cambiar contraseña</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-purple-800 text-sm font-medium mb-2">
                          Contraseña actual
                        </label>
                        <input
                          type="password"
                          className="w-full p-3 bg-white bg-opacity-10 text-gray-400 border border-purple-300 border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-purple-800 text-sm mt-4 font-medium mb-2">
                          Nueva contraseña
                        </label>
                        <input
                          type="password"
                          className="w-full p-3 bg-white bg-opacity-10 text-gray-400 border border-purple-300 border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-purple-800 text-sm mt-4 font-medium mb-2">
                          Confirmar nueva contraseña
                        </label>
                        <input
                          type="password"
                          className="w-full p-3 bg-white bg-opacity-10 text-gray-400 border border-purple-300 border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <button
                          className="bg-purple-950 hover:bg-purple-700 font-outfit text-white mt-6 mb-8 px-4 py-2 rounded-xl transition-colors"
                        >
                          Cambiar contraseña
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-purple-800 pt-6">
                    <h3 className="text-purple-950 font-medium mb-2">Sesiones activas</h3>
                    <p className="text-purple-800 text-sm mb-2">Estas son tus sesiones activas actualmente.</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-white bg-opacity-5 p-3 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-green-600 rounded-full w-2 h-2 mr-2"></div>
                          <div>
                            <p className="text-purple-800 text-sm">Madrid, España (Actual)</p>
                            <p className="text-purple-800 text-xs">Última actividad: Hace 1 minuto</p>
                          </div>
                        </div>
                        <button className="text-purple-600 hover:text-red-300 text-sm">
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Appearance settings */}
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-xl font-bold text-purple-950 font-outfit mb-6">Apariencia</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-purple-900 text-sm font-medium mb-2">
                      Tema
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div 
                        className={`cursor-pointer p-4 rounded-xl flex flex-col items-center ${
                          theme === 'dark' ? 'bg-purple-900 text-white' : 'bg-white text-purple-900 bg-opacity-5'
                        }`}
                        onClick={() => setTheme('dark')}
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-800 mb-2 flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                        </div>
                        <span className="text-sm">Oscuro</span>
                      </div>
                      
                      <div 
                        className={`cursor-pointer p-4 rounded-xl flex flex-col items-center ${
                          theme === 'light' ? 'bg-purple-900 text-white' : 'bg-white text-purple-900 bg-opacity-5'
                        }`}
                        onClick={() => setTheme('light')}
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-200 mb-2 flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <span className="text-sm">Claro</span>
                      </div>
                      
                      <div 
                        className={`cursor-pointer p-4 rounded-xl flex flex-col items-center ${
                          theme === 'system' ? 'bg-purple-900 text-white' : 'bg-white text-purple-900 bg-opacity-5'
                        }`}
                        onClick={() => setTheme('system')}
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-800 mb-2 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-sm">Sistema</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Save button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveSettings}
                className="bg-purple-950 hover:bg-purple-500 text-white font-outfit px-6 py-2 rounded-xl transition-colors"
              >
                Guardar configuración
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}