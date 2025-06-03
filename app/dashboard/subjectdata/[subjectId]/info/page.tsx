import React from 'react';
import { notFound } from 'next/navigation';
import { getSubject, getUpmApiData } from '@/lib/api';
import Link from 'next/link';
import FacultyList from '@/components/FacultyList';
import ResourcesList from '@/components/ResourcesList';
import EvaluationDetails from '@/components/EvaluationDetails';
import { UpmSubject } from '@/types/upm-api';
import { types } from 'util';

interface SubjectInfoPageProps {
  params: {
    subjectId: string;
  };
}

type Paramms = Promise<{
  subjectId: string;}>;

async function SubjectInfoPage({ params }: { params: Paramms }) {
  const { subjectId } = await params;
  
  // Fetch subject details and UPM API data
  let subject;
  let upmData: UpmSubject | null = null;
  
  try {
    // Fetch subject details from our API
    subject = await getSubject(subjectId);
    
    // If subject not found, show 404
    if (!subject) {
      return notFound();
    }
    
    // Fetch UPM API data
    upmData = await getUpmApiData(subjectId, subject.academic_year.replace('/','-'), subject.semester.trim().toLowerCase() === 'segundo' ? '2S' : '1S');
  } catch (error) {         
    console.error('Error fetching subject details:', error);
    // Don't return notFound here since we still have the basic subject data
  }
  if (!subject) {
    return notFound();
  }
  return (
    <div>
      {/* Subject header */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex justify-between items-start">
            <div className='flex-1'>
              <h1 className="text-3xl font-bold font-outfit text-fuchsia-950 mb-2">{subject.subject_name}</h1>
              <p className="text-fuchsia-900 font-mono">{subject.subject_code}</p>
            </div>

            <div className='text-right gap-1 flex flex-col'>
              <div className="flex gap-3 mt-3 font-outfit font-medium text-lg">
                <div className=" text-right  px-3 py-1 rounded-xl  text-purple-900">
                  {subject.credits} créditos
                </div>
                <div className="px-3  py-1 rounded-xl  text-purple-900">
                  {subject.semester} semestre
                </div>
              </div>
              <span className="text-base px-3  py-1 rounded-xl  text-purple-950">
                {subject.academic_year}
              </span>
            </div>
          
          {/*<Link 
            href={`/dashboard/subjectdata/${subjectId}`}
            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition-colors"
          >
            Ver análisis de rendimiento
          </Link>*/}
        </div>
        
        {/* Additional UPM data */}
        {upmData && (
          <div className="mt-4 p-4 bg-white bg-opacity-5 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
              <div> 
                <h3 className="text-md font-medium text-fuchsia-900 mb-2">Departamento</h3>
                <p className="text-purple-950 font-outfit text-base">{upmData.depto}</p>
              </div>
              
              <div>
                <h3 className="text-md font-medium text-fuchsia-900 mb-2">Plan de estudios</h3>
                <p className="text-purple-950 font-outfit text-base">{upmData.plan}</p>
              </div>
              
              <div>
                <h3 className="text-md font-medium text-fuchsia-900 mb-2">Carácter</h3>
                <p className="text-purple-950 font-outfit text-base">{upmData.caracter}</p>
              </div>
              
              {upmData.guia && (
                <div>
                  <h3 className="text-md font-medium text-fuchsia-900 mb-2">Guía docente</h3>
                  <a 
                    href={upmData.guia} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-outfit text-purple-500 text-base hover:text-black transition-colors underline"
                  >
                    Ver guía docente completa
                  </a>
                </div>
              )}
            </div>
            
          </div>
        )}
      </div>
      
      {/* Three column grid for sections */}
      <div className="grid grid-cols-1 gap-6">
        {/* Faculty section */}
        {upmData && upmData.profesores && (
          <div className="mb-6">
            <FacultyList faculty={upmData.profesores} />
          </div>
        )}
        
        {/* Resources section */}
        {upmData && upmData.recursos_didacticos && (
          <div className="mb-6">
            <ResourcesList resources={upmData.recursos_didacticos} />
          </div>
        )}
        
        {/* Evaluation activities and criteria */}
        {upmData && upmData.actividades_evaluacion && (
          <div className="mb-6">
            <EvaluationDetails 
              evaluationActivities={upmData.actividades_evaluacion} 
              evaluationCriteria={upmData.criterios_evaluacion}
            />
          </div>
        )}
      </div>
      
      {/* Display message if UPM data not available */}
      {!upmData && (
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-purple-300 border-opacity-20 text-center">
          <svg className="w-12 h-12 mx-auto text-purple-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-white mb-2">No se pudieron cargar los datos detallados</h3>
          <p className="text-purple-200 mb-4">
            No se ha podido conectar con la API de la UPM para obtener información detallada de esta asignatura.
          </p>
          <div className="mt-4">
            <Link 
              href={`/dashboard/subjectdata/${subjectId}`}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition-colors"
            >
              Volver al análisis de rendimiento
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubjectInfoPage;