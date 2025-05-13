import React from 'react';
import { notFound } from 'next/navigation';
import { 
  getSubject, 
  getSubjectHistorical, 
  getFacultyChanges, 
  getEvaluationChanges,
  getCorrelations,
  getSubjectInsights
} from '@/lib/api';
import Link from 'next/link';
import PerformanceChart from '@/components/PerformanceChart';
import FacultyChanges from '@/components/FacultyChanges';
import EvaluationMethods from '@/components/EvaluationMethods';
import InsightCard from '@/components/InsightCard';
import { Subject } from '@/types';

interface SubjectDetailsPageProps {
  params: {
    subjectId: string;
  };
}

async function SubjectDetailsPage({ params }: SubjectDetailsPageProps) {
  const { subjectId } = params;
  
  // Fetch all necessary data for this subject
  let subject;
  let historicalData;
  let facultyChanges;
  let evaluationChanges;
  let correlations;
  let insights;
  
  try {
    // Fetch subject details
    subject = await getSubject(subjectId);
    
    // If subject not found, show 404
    if (!subject) {
      return notFound();
    }
    
    // Fetch additional data in parallel
    [historicalData, facultyChanges, evaluationChanges, correlations, insights] = await Promise.all([
      getSubjectHistorical(subjectId),
      getFacultyChanges(subjectId),
      getEvaluationChanges(subjectId),
      getCorrelations(subjectId),
      getSubjectInsights(subjectId)
    ]);
  } catch (error) {
    console.error('Error fetching subject details:', error);
    return notFound();
  }

  return (
    <div>
      {/* Subject header */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 mb-6 shadow-lg border border-purple-300 border-opacity-20">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-fuchsia-950 mb-2">{subject.subject_name}</h1>
            <p className="text-purple-200">Código: {subject.subject_code}</p>
            
            <div className="flex gap-3 mt-3">
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
            href={`/dashboard/subjectdata/${subjectId}/info`}
            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition-colors"
          >
            Ver información completa
          </Link>*/}
        </div>
        
        {/* Current performance metrics */}
        {subject.performance_rate !== undefined && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white bg-opacity-5 rounded-lg p-4">
              <h3 className="text-sm font-medium text-purple-600 mb-2">Tasa de rendimiento</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-purple-900">{subject.performance_rate.toFixed(1)}%</span>
                <span className="text-sm text-purple-500 ml-2 mb-1">aprobados / matriculados</span>
              </div>
            </div>
            
            {subject.success_rate !== undefined && (
              <div className="bg-white bg-opacity-5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-purple-600 mb-2">Tasa de éxito</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-purple-900">{subject.success_rate.toFixed(1)}%</span>
                  <span className="text-sm text-purple-500 ml-2 mb-1">aprobados / presentados</span>
                </div>
              </div>
            )}
            
            {subject.absenteeism_rate !== undefined && (
              <div className="bg-white bg-opacity-5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-purple-600 mb-2">Tasa de absentismo</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-purple-900">{subject.absenteeism_rate.toFixed(1)}%</span>
                  <span className="text-sm text-purple-500 ml-2 mb-1">no presentados / matriculados</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Enrollment information */}
        {subject.total_enrolled !== undefined && (
          <div className="mt-6 p-4 bg-white bg-opacity-5 rounded-lg">
            <h3 className="text-sm font-medium text-purple-600 mb-2">Matriculación</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-xl font-bold text-purple-900">{subject.total_enrolled}</span>
                <span className="text-sm text-purple-500 ml-2">estudiantes totales</span>
              </div>
              
              {subject.first_time !== undefined && (
                <div>
                  <span className="text-xl font-bold text-purple-900">{subject.first_time}</span>
                  <span className="text-sm text-purple-500 ml-2">primera matrícula</span>
                </div>
              )}
              
              {subject.partial_dedication !== undefined && (
                <div>
                  <span className="text-xl font-bold text-purple-900">{subject.partial_dedication}</span>
                  <span className="text-sm text-purple-500 ml-2">dedicación parcial</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Historical performance trends */}
      {historicalData && historicalData.length > 0 && (
        <div className="mb-6">
          <PerformanceChart historicalData={historicalData} height={350} />
        </div>
      )}
      
      {/* Two column layout for other visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Faculty changes */}
        <FacultyChanges 
          facultyChanges={facultyChanges || []} 
          correlations={correlations || []}
          height={300}
        />
        
        {/* Evaluation methods changes */}
        <EvaluationMethods 
          evaluationChanges={evaluationChanges || []} 
          correlations={correlations || []}
          height={300}
        />
      </div>
      
      {/* Insights and recommendations */}
      {insights && insights.length > 0 && (
        <div className="mb-6">
          <InsightCard insights={insights[0]} />
        </div>
      )}
    </div>
  );
}

export default SubjectDetailsPage;