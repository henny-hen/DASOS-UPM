import Searchbar from '@/components/Searchbar'
import React from 'react'
import { getApiStats, getSubjects } from '@/lib/api'
import SubjectCard from '@/components/SubjectCard'
import Link from 'next/link'
import { Subject, ApiStats } from '@/types'

// This is a server component, so we can fetch data here
async function Dashboard() {
  // Fetch API stats and some subjects for the dashboard
  let stats: ApiStats | null = null;
  let subjects: Subject[] = [];
  
  try {
    stats = await getApiStats();
    // Get subjects from the latest academic year
    if (stats && stats.academic_years && stats.academic_years.length > 0) {
      const latestYear = stats.academic_years[stats.academic_years.length - 1];
      subjects = await getSubjects(latestYear);
    } else {
      subjects = await getSubjects();
    }
    
    // Limit to 6 subjects for the dashboard
    subjects = subjects.slice(0, 6);
  } catch (error) {
    console.error('Error fetching data:', error);
    stats = null;
    subjects = [];
  }

  return (
    <div className='flex flex-col h-full w-full px-8 py-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white mb-2'>Dashboard Académico</h1>
        <p className='text-lg text-purple-200'>
          Analiza el rendimiento y tendencias de las asignaturas
        </p>
      </div>
      
      {/* Search section */}
      <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 mb-8 shadow-lg border border-purple-300 border-opacity-20'>
        <h2 className='text-xl font-bold text-fuchsia-950 mb-4'>Buscar asignatura</h2>
        <Searchbar />
      </div>
      
      {/* Stats overview */}
      {stats && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 z-auto'>
          <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-purple-300 border-opacity-20'>
            <h3 className='text-sm font-medium text-fuchsia-950 mb-1'>Total de asignaturas</h3>
            <p className='text-2xl font-bold text-purple-800'>{stats.total_subjects}</p>
          </div>
          
          <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-purple-300 border-opacity-20'>
            <h3 className='text-sm font-medium text-fuchsia-950 mb-1'>Años académicos</h3>
            <p className='text-2xl font-bold text-purple-800'>{stats.total_academic_years}</p>
          </div>
          
          <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-purple-300 border-opacity-20'>
            <h3 className='text-sm font-medium text-fuchsia-950 mb-1'>Datos históricos</h3>
            <p className='text-2xl font-bold text-purple-800'>{stats.total_historical_rates}</p>
          </div>
          
          <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-purple-300 border-opacity-20'>
            <h3 className='text-sm font-medium text-fuchsia-950 mb-1'>Análisis API</h3>
            <p className='text-2xl font-bold text-purple-800'>{stats.has_api_analysis ? 'Disponible' : 'No disponible'}</p>
          </div>
        </div>
      )}
      
      {/* Recent subjects */}
      <div className='mb-8'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold text-white'>Asignaturas recientes</h2>
          <Link href="/dashboard/subjectdata" className='text-sm text-purple-300 hover:text-white transition-colors'>
            Ver todas →
          </Link>
        </div>
        
        {subjects && subjects.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {subjects.map(subject => (
              <SubjectCard key={subject.subject_code} subject={subject} />
            ))}
          </div>
        ) : (
          <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 flex justify-center items-center'>
            <p className='text-white text-opacity-70'>No hay datos de asignaturas disponibles</p>
          </div>
        )}
      </div>
      
      {/* Quick links */}
      {/*<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Link href="/dashboard/subjectdata" className='bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-purple-300 border-opacity-20 hover:bg-opacity-20 transition-all'>
          <h3 className='text-lg font-bold text-white mb-2'>Ver datos de asignaturas</h3>
          <p className='text-sm text-purple-200'>Explora métricas detalladas de todas las asignaturas</p>
        </Link>
        

        <Link href="/dashboard/subjectdata/subjectinfo" className='bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-purple-300 border-opacity-20 hover:bg-opacity-20 transition-all'>
          <h3 className='text-lg font-bold text-white mb-2'>Información de asignatura</h3>
          <p className='text-sm text-purple-200'>Consulta información sobre profesorado y evaluación</p>
        </Link>
        
        <div className='bg-gradient-to-br from-purple-800 to-pink-600 rounded-lg p-6 shadow-lg hover:from-purple-700 hover:to-pink-500 transition-all'>
          <h3 className='text-lg font-bold text-white mb-2'>Análisis integrado</h3>
          <p className='text-sm text-white text-opacity-90'>Descubre correlaciones y obtén recomendaciones</p>
          {stats && !stats.has_api_analysis && (
            <p className='text-xs mt-2 text-white text-opacity-70'>Análisis API no disponible</p>
          )}
        </div>
      </div> */}
    </div>
  )
}

export default Dashboard