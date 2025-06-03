import Searchbar from '@/components/Searchbar'
import React from 'react'
import { getApiStats, getSubjects } from '@/lib/api'
import SubjectCard from '@/components/SubjectCard'
import Link from 'next/link'
import { Subject, ApiStats } from '@/types'
import AnimatedSection, {AnimatedStatsCard} from '@/components/AnimatedSection'

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

    <div className='flex flex-col h-full w-full px-8 py-6 no-scrollbar overflow-hidden'>
      <div className='mb-8'>
        <AnimatedSection delay={0.1}>
        <h1 className='text-3xl font-bold font-outfit text-white mb-2'>Dashboard Académico</h1>
        </AnimatedSection>
        <p className='text-lg text-purple-200 font-inter'>
          Analiza el rendimiento y tendencias de las asignaturas
        </p>
      </div>
      
      {/* Search section */}
      <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 mb-8 shadow-lg   z-2'>
        <AnimatedSection delay={0.2}>
        <h2 className='text-xl font-bold text-fuchsia-950 font-outfit mb-4'>Buscar asignatura</h2>
        <Searchbar />
        </AnimatedSection>
      </div>
      
      {/* Stats overview */}
      {stats && (

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 z-0'>
          <AnimatedStatsCard
          title="Total de asignaturas"
          value={stats.total_subjects}
          index={0}
          />
          <AnimatedStatsCard
          title="Años académicos"
          value={stats.total_academic_years}
          index={1}
          />
          <AnimatedStatsCard
          title="Datos históricos"
          value={stats.total_historical_rates}
          index={2}
          />
          <AnimatedStatsCard
          title="Análisis API"
          value={stats.has_api_analysis ? 'Disponible' : 'No disponible'}
          index={3}
          />

          
        </div>
      )}
      
      {/* Recent subjects */}
      <div className='mb-8'>
        <div className='flex justify-between items-center mb-4'>
          <AnimatedSection delay={0.2}>
          <h2 className='pl-1.5 text-2xl font-bold text-white font-outfit'>Asignaturas recientes</h2>
          </AnimatedSection>
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
          <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 flex justify-center items-center'>
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