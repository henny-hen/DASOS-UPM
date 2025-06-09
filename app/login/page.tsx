'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth';
import Image from 'next/image';

export default function Login() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    await login(email, password);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2c015e] via-[#470296] to-[#2c015e]"
      role="main"
      aria-label="Página de inicio de sesión"
    >
      <div
        className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-xl  w-full max-w-md"
        role="region"
        aria-labelledby="login-header"
      >
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-20 h-20 bg-white rounded-full p-4 mb-4 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-16 h-16 relative">
              <Image
                src="/upm-logo.png"
                alt="Logo de la Universidad Politécnica de Madrid"
                width={64}
                height={64}
                className="rounded"
                priority
              />
            </div>
          </div>
          <h1
            id="login-header"
            className="text-3xl font-bold font-outfit text-fuchsia-950"
            tabIndex={-1}
          >
            DASOS UPM
          </h1>
          <p className="text-purple-600 mt-2 text-center">
            Inicia sesión para acceder a tu información académica
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className="bg-red-900 bg-opacity-40 text-red-200 p-3 rounded-lg mb-6 text-sm"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} aria-describedby={error ? 'login-error' : undefined}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-purple-700 text-sm font-medium mb-2"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 bg-white bg-opacity-10 text-gray-500 border border-purple-300 border-opacity-30 rounded-md focus:outline-dashed focus:ring-2 focus:ring-purple-500"
              placeholder="correo@upm.es"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              aria-required="true"
              aria-label="Correo electrónico"
              aria-live='polite'
            />
            <p className="text-xs text-purple-700 mt-1" id="email-help">
              Demo: student@example.com
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-purple-700 text-sm font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-3 bg-white bg-opacity-10 text-gray-500 border border-purple-300 border-opacity-30 rounded-md focus:outline-dashed focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              aria-required="true"
              aria-label="Contraseña"
              aria-live='polite'
            />
            <p className="text-xs text-purple-700 mt-1" id="password-help">
              Demo: cualquier contraseña vale
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-900 hover:bg-purple-700 text-white p-2.5 rounded-xl transition-colors focus:outline-dashed focus:ring-2 focus:ring-purple-500 font-outfit font-medium text-lg flex items-center justify-center"
            disabled={loading}
            aria-live='polite'
            aria-busy={loading}
            aria-label={loading ? 'Iniciando sesión' : 'Iniciar sesión'}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}