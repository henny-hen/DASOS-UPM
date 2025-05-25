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

  return (
    <div>
      {/* Subject header */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 mb-6 shadow-lg border border-purple-300 border-opacity-20">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-fuchsia-950 mb-2">{subject.subject_name}</h1>
            <p className="text-purple-200">Código: {subject.subject_code}</p>
            
            <div className="flex gap-3 space-x-3 mt-3">
              <span className="text-sm px-3 py-1 rounded-full bg-purple-900 text-white">
                {subject.credits} créditos
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-purple-900 text-white">
                {subject.semester} semestre
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-purple-900 text-white">
                {subject.academic_year}
              </span>
            </div>
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
          <div className="mt-4 p-4 bg-white bg-opacity-5 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
              <div> 
                <h3 className="text-sm font-medium text-purple-600">Departamento</h3>
                <p className="text-purple-950">{upmData.depto}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-purple-600">Plan de estudios</h3>
                <p className="text-purple-950">{upmData.plan}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-purple-600">Carácter</h3>
                <p className="text-purple-950">{upmData.caracter}</p>
              </div>
              
              {upmData.guia && (
                <div>
                  <h3 className="text-sm font-medium text-purple-600">Guía docente</h3>
                  <a 
                    href={upmData.guia} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:text-black transition-colors underline text-sm"
                  >
                    Ver guía docente completa
                  </a>
                </div>
              )}
            </div>
            
            {upmData.fecha_actualizacion && (
              <p className="text-right text-xs text-purple-200 mt-4">
                Actualizado: {upmData.fecha_actualizacion}
              </p>
            )}
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
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-purple-300 border-opacity-20 text-center">
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