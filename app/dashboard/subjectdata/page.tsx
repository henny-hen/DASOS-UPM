import React from 'react';
import { getSubjects } from '@/lib/api';
import SubjectCard from '@/components/SubjectCard';
import { Subject } from '@/types';

async function SubjectData() {
  // Fetch all subjects
  let subjects: Subject[] = [];
  
  try {
    subjects = await getSubjects();
  } catch (error) {
    console.error('Error fetching subjects:', error);
    subjects = [];
  }

  return (
    <div className="container mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Todas las asignaturas
        </h1>
        <p className="text-purple-200">
          Explora las métricas de rendimiento de todas las asignaturas disponibles
        </p>
      </header>

      {/* Filter options */}
      <section
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 mb-6 shadow-lg "
        aria-labelledby="filter-heading"
      >
        <h2 id="filter-heading" className="sr-only">
          Filtros de asignaturas
        </h2>
        <form className="flex flex-wrap gap-4 " role="search" aria-label="Filtrar asignaturas">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="anio-academico" className="block text-sm text-purple-700 mb-1">
              Año académico
            </label>
            <select
              id="anio-academico"
              className="w-full bg-white border border-purple-300 border-opacity-30 bg-opacity-10 text-gray-600  rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Año académico"
            >
              <option value="">Todos los años</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option>
              <option value="2021-22">2021-22</option>
              <option value="2020-21">2020-21</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="semestre" className="block text-sm text-purple-700 mb-1">
              Semestre
            </label>
            <select
              id="semestre"
              className="w-full bg-white border border-purple-300 border-opacity-30 bg-opacity-10 text-gray-600  rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Semestre"
            >
              <option value="">Todos los semestres</option>
              <option value="Primero">Primer semestre</option>
              <option value="Segundo">Segundo semestre</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="ordenar-por" className="block text-sm text-purple-700 mb-1">
              Ordenar por
            </label>
            <select
              id="ordenar-por"
              className="w-full bg-white border border-purple-300 border-opacity-30 bg-opacity-10 text-gray-600  rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Ordenar por"
            >
              <option value="name">Nombre</option>
              <option value="performance_high">Rendimiento (mayor primero)</option>
              <option value="performance_low">Rendimiento (menor primero)</option>
              <option value="enrolled">Matriculados (mayor primero)</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              type="submit"
              className="bg-purple-800 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors"
              aria-label="Aplicar filtros"
            >
              Aplicar filtros
            </button>
          </div>
        </form>
      </section>

      {/* Subjects grid */}
      {subjects && subjects.length > 0 ? (
        <section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Lista de asignaturas"
        >
          {subjects.map(subject => (
            <SubjectCard key={subject.subject_code} subject={subject} />
          ))}
        </section>
      ) : (
        <div
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 flex justify-center items-center"
          role="status"
          aria-live="polite"
        >
          <p className="text-white text-opacity-70">
            No hay datos de asignaturas disponibles
          </p>
        </div>
      )}
    </div>
  );
}

export default SubjectData;