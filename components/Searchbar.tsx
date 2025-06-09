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
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
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
      setSelectedIndex(-1);
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
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

// Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelectSubject(results[selectedIndex]);
        } else if (results.length === 1) {
          handleSelectSubject(results[0]);
        }
        break;
      
      case 'Escape':
        e.preventDefault();
        setShowDropdown(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      
      case 'Tab':
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          e.preventDefault();
          handleSelectSubject(results[selectedIndex]);
        }
        break;
    }
  };

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
    setSelectedIndex(-1);
    router.push(`/dashboard/subjectdata/${subject.id}`);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
    if (results.length > 0) {
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="relative w-full" ref={searchRef} data-search-container>
      <div className="relative flex items-center">
        <label className='input w-full focus:outline-none focus:ring-2 focus:ring-purple-500' >
        <input
          ref={inputRef}
          type="text"
          name='searchbox'
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          placeholder="Busca una asignatura..."
          className="w-full p-3 bg-white bg-opacity-10 text-purple-600 border border-purple-300 border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-200 placeholder-opacity-60"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-autocomplete='list'
          onKeyDown={handleKeyDown}
          aria-activedescendant={selectedIndex >= 0 ? `search-option-${selectedIndex}` : undefined}
          role="searchbox"
          id="searchbox"
          aria-label="Buscar asignaturas"
        />
        </label>
        <button
          onClick={handleSearchClick}
          className="absolute right-2 p-2 bg-purple-900 text-white rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-900"
          aria-label="Boton buscar"
          tabIndex={-1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" role='img' stroke="currentColor">
          <title>Icono de búsqueda</title>
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
        <div data-search-dropdown className="absolute mt-1 w-full bg-white bg-opacity-10 backdrop-blur-xl rounded-md shadow-lg max-h-60 overflow-y-auto z-10" role="listbox" aria-label="Resultados">
          <ul>
            {results.map((subject, index) => (
              <li
                key={subject.id}
                id={`search-option-${index}`}
                onClick={() => handleSelectSubject(subject)}
                className={`px-4 py-3  cursor-pointer text-black transition-colors
                  ${index === selectedIndex ? 'bg-purple-900 bg-opacity-30 text-white' : 'hover:bg-gray-400 hover:bg-opacity-20'}
                  `}
                role="option"
                tabIndex={-1}
                aria-selected={index === selectedIndex}
                aria-label={subject.name}
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

      {/* Keyboard navigation hint */}

    </div>
  );
}