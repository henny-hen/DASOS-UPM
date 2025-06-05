import React from 'react';
import { UpmEvaluationActivities } from '@/types/upm-api';

interface EvaluationDetailsProps {
  evaluationActivities: UpmEvaluationActivities;
  evaluationCriteria: string;
}

export default function EvaluationDetails({ 
  evaluationActivities, 
  evaluationCriteria 
}: EvaluationDetailsProps) {
  // Helper function to get all activities from a section
  const getActivitiesFromSection = (sectionKey: keyof UpmEvaluationActivities) => {
    const section = evaluationActivities[sectionKey];
    if (!section) return [];
    
    return Object.entries(section).map(([id, activity]) => ({
      id,
      ...activity
    }));
  };

  // Get activities for each evaluation section
  const continuousActivities = getActivitiesFromSection('evaluacion_continua');
  const finalActivities = getActivitiesFromSection('prueba_final');
  const extraordinaryActivities = getActivitiesFromSection('evaluacion_extraordinaria');

  return (
    <div>
      {/* Evaluation Activities */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl bg-opacity-10  drop-shadow-lg overflow-hidden shadow-lg mb-6">
        <div className="p-4 bg-purple-900 bg-opacity-50">
          <h3 className="text-2xl font-outfit font-bold text-white">Actividades de evaluación</h3>
        </div>
        
        {/* Continuous evaluation */}
        {continuousActivities.length > 0 && (
          <div className="p-4 border-b border-purple-900 border-opacity-30">
            <h4 className="text-lg font-semibold font-outfit text-purple-900 mb-3">Evaluación continua</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900 bg-opacity-30">
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Denominación</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Semana</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Duración</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Técnica</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Peso (%)</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Nota mínima</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Presencial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900 font-outfit divide-opacity-30">
                  {continuousActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-white hover:bg-opacity-5">
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.DENOMINACION}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.SEMANA}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.DURACION}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.TECNICA}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.PESO}%</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.NOTA_MINIMA}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.PRESENCIAL}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Final exam */}
        {finalActivities.length > 0 && (
          <div className="p-4 border-b border-purple-900 border-opacity-30">
            <h4 className="text-lg font-semibold font-outfit text-purple-900 mb-3">Evaluación global</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900 bg-opacity-30">
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Denominación</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Semana</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Duración</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Técnica</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Peso (%)</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Nota mínima</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Presencial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900 divide-opacity-30">
                  {finalActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-white font-outfit hover:bg-opacity-5">
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.DENOMINACION}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.SEMANA}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.DURACION}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.TECNICA}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.PESO}%</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.NOTA_MINIMA}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.PRESENCIAL}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Extraordinary evaluation */}
        {extraordinaryActivities.length > 0 && (
          <div className="p-4">
            <h4 className="text-lg font-semibold font-outfit text-purple-900 mb-3">Evaluación extraordinaria</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900 bg-opacity-30">
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Denominación</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Semana</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Duración</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Técnica</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Peso (%)</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Nota mínima</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-white">Presencial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900 divide-opacity-30">
                  {extraordinaryActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-white font-outfit hover:bg-opacity-5">
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.DENOMINACION}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.SEMANA}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.DURACION}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.TECNICA}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.PESO}%</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.NOTA_MINIMA}</td>
                      <td className="py-2 px-3 text-sm text-purple-950">{activity.PRESENCIAL}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      {/* Evaluation Criteria */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 shadow-lg bg-opacity-10  drop-shadow-lg">
        <h3 className="text-2xl font-bold font-outfit text-purple-900 mb-4">Criterios de evaluación</h3>
        
        <div 
          className="prose prose-invert prose-purple max-w-none text-black"
          dangerouslySetInnerHTML={{ __html: evaluationCriteria }}
        />
      </div>
    </div>
  );
}