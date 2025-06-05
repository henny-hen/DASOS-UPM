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
    <div className='flex flex-col h-full w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 no-scrollbar overflow-hidden'>
      {/* Header Section */}
      <div className='mb-6 sm:mb-8 mt-12 lg:mt-0'>
        <AnimatedSection delay={0.1}>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold font-outfit text-white mb-2'>
            Dashboard Académico
          </h1>
        </AnimatedSection>
        <p className='text-base sm:text-lg text-purple-200 font-inter'>
          Analiza el rendimiento y tendencias de las asignaturas
        </p>
      </div>
      
      {/* Search section */}
      <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg z-2'>
        <AnimatedSection delay={0.2}>
          <h2 className='text-lg sm:text-xl font-bold text-fuchsia-950 font-outfit mb-3 sm:mb-4'>
            Buscar asignatura
          </h2>
          <Searchbar />
        </AnimatedSection>
      </div>
      
      {/* Stats overview */}
      {stats && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 z-0'>
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
      <div className='mb-6 sm:mb-8 flex-1'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3 sm:gap-0'>
          <AnimatedSection delay={0.2}>
            <h2 className='pl-1.5 text-xl sm:text-2xl font-bold text-white font-outfit'>
              Asignaturas recientes
            </h2>
          </AnimatedSection>
          <Link 
            href="/dashboard/subjectdata" 
            className='text-sm text-purple-300 hover:text-white transition-colors self-start sm:self-auto'
          >
            Ver todas →
          </Link>
        </div>
        
        {subjects && subjects.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
            {subjects.map(subject => (
              <SubjectCard key={subject.subject_code} subject={subject} />
            ))}
          </div>
        ) : (
          <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 sm:p-8 flex justify-center items-center'>
            <p className='text-white text-opacity-70 text-center'>
              No hay datos de asignaturas disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard