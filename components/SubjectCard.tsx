import Link from 'next/link';
import { Subject } from '@/types';

interface SubjectCardProps {
  subject: Subject;
  showMetrics?: boolean;
}

export default function SubjectCard({ subject, showMetrics = true }: SubjectCardProps) {
  // Function to determine color based on performance rate
  const getPerformanceColor = (rate: number) => {
    if (rate >= 70) return 'bg-green-700';
    if (rate >= 50) return 'bg-yellow-600';
    return 'bg-red-700';
  };

  // Function to determine color based on success rate
  const getSuccessColor = (rate: number) => {
    if (rate >= 75) return 'bg-green-700';
    if (rate >= 60) return 'bg-yellow-600';
    return 'bg-red-700';
  };

  // Function to determine color based on absenteeism rate
  const getAbsenteeismColor = (rate: number) => {
    if (rate <= 5) return 'bg-green-700';
    if (rate <= 15) return 'bg-yellow-600';
    return 'bg-red-700';
  };
  return (
    <Link href={`/dashboard/subjectdata/${subject.subject_code}`}>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:bg-opacity-20 transition-all hover:scale-105 border border-purple-300 border-opacity-20">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-1 text-purple-900">{subject.subject_name}</h3>
          <p className="text-purple-300 text-sm">Código: {subject.subject_code}</p>
          <div className="flex gap-2 space-x-2 mt-2">
            <span className="text-xs px-2 py-1 rounded-full bg-purple-900 text-white">
              {subject.credits} ECTS
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-purple-900 text-white">
              {subject.semester} semestre
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-purple-900 text-white">
              {subject.academic_year}
            </span>
          </div>
        </div>

        {/* {showMetrics && subject.performance_rate !== undefined && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-purple-200 mb-2">Métricas de rendimiento</h4>
            
            <div className="space-y-2">
              // Performance Rate 
              <div className="flex items-center">
                <span className="text-xs text-black w-36">Tasa de rendimiento:</span>
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden ml-2">
                  <div 
                    className={`h-full ${getPerformanceColor(subject.performance_rate)}`}
                    style={{ width: `${subject.performance_rate}%` }}
                  ></div>
                </div>
                <span className="text-xs text-white ml-2 w-12 text-right">{subject.performance_rate.toFixed(1)}%</span>
              </div>
              
              // Success Rate 
              {subject.success_rate !== undefined && (
                <div className="flex items-center">
                  <span className="text-xs text-black w-36">Tasa de éxito:</span>
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden ml-2">
                    <div 
                      className={`h-full ${getSuccessColor(subject.success_rate)}`}
                      style={{ width: `${subject.success_rate}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-black ml-2 w-12 text-right">{subject.success_rate.toFixed(1)}%</span>
                </div>
              )}
              
              // Absenteeism Rate 
              {subject.absenteeism_rate !== undefined && (
                <div className="flex items-center">
                  <span className="text-xs text-black w-36">Tasa de absentismo:</span>
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden ml-2">
                    <div 
                      className={`h-full ${getAbsenteeismColor(subject.absenteeism_rate)}`}
                      style={{ width: `${Math.min(subject.absenteeism_rate * 2, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-black ml-2 w-12 text-right">{subject.absenteeism_rate.toFixed(1)}%</span>
                </div>
              )}
            </div>
            
            {subject.total_enrolled !== undefined && (
              <p className="text-sm text-purple-200 mt-3">
                Total matriculados: <span className="text-black font-medium">{subject.total_enrolled}</span>
                {subject.first_time !== undefined && (
                  <span className="ml-2 text-xs">
                    ({subject.first_time} primera matrícula)
                  </span>
                )}
              </p>
            )}
          </div>
        )} 
        */}
        
        <div className="mt-4 text-right">
          <button className="text-xs bg-purple-950 hover:bg-purple-500 text-white px-3 py-1 rounded-md transition-colors">
            Ver detalles
          </button>
        </div>
      </div>
    </Link>
  );
}