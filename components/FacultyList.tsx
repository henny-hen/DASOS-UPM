import React from 'react';
import { UpmProfessor } from '@/types/upm-api';

interface FacultyListProps {
  faculty: (UpmProfessor | {})[];
}

export default function FacultyList({ faculty }: FacultyListProps) {
  // Filter out empty objects and undefined values
  const validFaculty = faculty.filter((prof): prof is UpmProfessor => 
    typeof prof === 'object' && prof !== null && 'nombre' in prof && !!prof.nombre
  );

  // Find coordinator
  const coordinator = validFaculty.find(prof => prof.coordinador);

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl  drop-shadow-lg overflow-hidden shadow-lg">
      <div className="p-4 bg-purple-900 bg-opacity-50">
        <h3 className="text-2xl font-outfit font-bold text-white">Profesorado</h3>
        {coordinator && (
          <p className="text-sm text-purple-200 mt-1">
            Coordinación: {coordinator.nombre} {coordinator.apellidos}
          </p>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-900 bg-opacity-30">
              <th className="py-3 px-4 text-left text-base font-medium text-white">Nombre</th>
              <th className="py-3 px-4 text-left text-base font-medium text-white">Despacho</th>
              <th className="py-3 px-4 text-left text-base font-medium text-white">Email</th>
              <th className="py-3 px-4 text-left text-base font-medium text-white">Tutorías</th>
              <th className="py-3 px-4 text-left text-base font-medium text-white">Rol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-900 divide-opacity-30">
            {validFaculty.map((prof, index) => (
              <tr key={index} className="hover:bg-white hover:bg-opacity-5">
                <td className="py-3 px-4 font-outfit text-purple-900">{prof.nombre} {prof.apellidos}</td>
                <td className="py-3 px-4 font-outfit text-purple-700">{prof.despacho}</td>
                <td className="py-3 px-4 font-outfit text-purple-800">{prof.email}</td>
                <td className="py-3 px-4 font-outfit text-purple-700">
                  {prof.tutorias && prof.tutorias.length > 0 && (
                    <div>
                      {prof.tutorias.map((tutoria, i) => (
                        <div key={i} className="text-sm">
                          {tutoria.observaciones}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    prof.coordinador ? 'bg-green-900 text-green-200' : 'bg-blue-900 text-blue-200'
                  }`}>
                    {prof.coordinador ? 'Coordinador' : 'Profesor'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}