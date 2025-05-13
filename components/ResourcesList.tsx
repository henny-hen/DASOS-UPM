import React from 'react';
import { UpmResources } from '@/types/upm-api';

interface ResourcesListProps {
  resources: UpmResources;
}

export default function ResourcesList({ resources }: ResourcesListProps) {
  const { bibliografia, "Recursos web": webResources } = resources;

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-purple-300 border-opacity-20">
      <h3 className="text-xl font-bold text-purple-900 mb-4">Recursos didácticos</h3>
      
      {/* Bibliography */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-purple-800 mb-3">Bibliografía recomendada</h4>
        <ul className="space-y-2">
          {bibliografia.map((book, index) => (
            <li key={index} className="flex items-start">
              <span className="text-purple-300 mr-2">•</span>
              <span className="text-sm text-purple-500">{book}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Web resources */}
      {webResources && webResources.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-purple-800 mb-3">Recursos web</h4>
          <ul className="space-y-2">
            {webResources.map((resource, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span className="text-sm text-purple-500">
                  {resource.startsWith('http') ? (
                    <a 
                      href={resource} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-black transition-colors underline"
                    >
                      {resource}
                    </a>
                  ) : (
                    resource
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}