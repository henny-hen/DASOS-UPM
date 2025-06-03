'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import Image from 'next/image';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //updateUser(formData);
    setIsEditing(false);
    setSuccessMessage('¡Perfil actualizado correctamente!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Perfil de Usuario</h1>
      
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Image and Details */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-purple-300 border-opacity-20 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500">
              <Image 
                src={user.avatar || "/avatars/default.png"} 
                alt={user.name || 'Avatar de usuario'}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-purple-800 p-2 rounded-full hover:bg-purple-500 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          
          <h2 className="text-xl font-bold text-purple-950 mb-1">{user.name}</h2>
          <p className="text-purple-800 mb-4">{user.email}</p>
          
          <div className="bg-purple-900 bg-opacity-30 px-4 py-2 rounded-full text-sm text-white mb-6">
            {user.role === 'student' ? 'Estudiante' : user.role === 'professor' ? 'Profesor' : 'Administrador'}
          </div>
          
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-purple-800 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition-colors w-full"
            disabled={isEditing}
          >
            Editar Perfil
          </button>
        </div>
        
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-purple-300 border-opacity-20">
            <h3 className="text-xl font-bold text-purple-950 mb-6">
              {isEditing ? 'Editar información' : 'Información personal'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-purple-700 text-sm font-medium mb-2">
                    Nombre completo
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-white bg-opacity-10 text-white border border-purple-300 border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  ) : (
                    <p className="text-purple-950">{user.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-purple-700 text-sm font-medium mb-2">
                    Correo electrónico
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-white bg-opacity-10 text-white border border-purple-300 border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  ) : (
                    <p className="text-purple-950">{user.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-purple-700 text-sm font-medium mb-2">
                    Rol
                  </label>
                  <p className="text-purple-950">
                    {user.role === 'student' ? 'Estudiante' : user.role === 'professor' ? 'Profesor' : 'Administrador'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-purple-700 text-sm font-medium mb-2">
                    ID de usuario
                  </label>
                  <p className="text-purple-950">{user.id}</p>
                </div>
              </div>
              
              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user.name || '',
                        email: user.email,
                      });
                    }}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Guardar cambios
                  </button>
                </div>
              )}
            </form>
          </div>
          
          {/* Additional sections could be added here */}

        </div>
      </div>
    </div>
  );
}