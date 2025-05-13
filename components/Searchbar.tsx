"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Subject {
  id: string;
  name: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Function to fetch subjects from your API
  const fetchSubjects = async (searchQuery: string): Promise<void> => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/subjects?query=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch subjects');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSubjects(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && event.target instanceof Node && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);
  };

  const handleSearchClick = (): void => {
    if (query.trim()) {
      fetchSubjects(query);
    }
  };

  const handleSelectSubject = (subject: Subject): void => {
    setQuery(subject.name);
    setShowDropdown(false);
    router.push(`/dashboard/subjectdata/${subject.id}`);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          placeholder="Busca una asignatura..."
          className="w-full p-3 bg-white bg-opacity-10 text-purple-600 border border-purple-300 border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-200 placeholder-opacity-60"
        />

        <button
          onClick={handleSearchClick}
          className="absolute right-2 p-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {isLoading && (
          <div className="absolute right-14 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {showDropdown && results.length > 0 && (
        <div className="absolute mt-1 w-full bg-white bg-opacity-10 backdrop-blur-xl border border-purple-300 border-opacity-30 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          <ul>
            {results.map((subject) => (
              <li
                key={subject.id}
                onClick={() => handleSelectSubject(subject)}
                className="px-4 py-3 hover:bg-white hover:bg-opacity-20 cursor-pointer text-black transition-colors"
              >
                {subject.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showDropdown && query && results.length === 0 && !isLoading && (
        <div className="absolute mt-1 w-full bg-white bg-opacity-10 backdrop-blur-xl border border-purple-400 border-opacity-30 rounded-md shadow-lg p-4 z-10 text-white text-center">
          No se encontraron asignaturas
        </div>
      )}
    </div>
  );
}