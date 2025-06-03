import React from 'react';
import { GlobalInsights } from '@/types';

interface RecommendationListProps {
  insights: GlobalInsights;
}

export default function RecommendationList({ insights }: RecommendationListProps) {
  // Extract insights data if available
  const insightData = insights.insights_data || tryParseJSON(insights.insights_json);

  // Get recommendations by type
  const getFacultyRecommendations = () => {
    if (insightData?.faculty_impact?.recommendations) {
      return insightData.faculty_impact.recommendations;
    }
    if (insightData?.recommendations?.faculty) {
      return insightData.recommendations.faculty;
    }
    return [];
  };

  const getEvaluationRecommendations = () => {
    if (insightData?.evaluation_impact?.recommendations) {
      return insightData.evaluation_impact.recommendations;
    }
    if (insightData?.recommendations?.evaluation) {
      return insightData.recommendations.evaluation;
    }
    return [];
  };

  const getGeneralRecommendations = () => {
    if (insightData?.recommendations?.general) {
      return insightData.recommendations.general;
    }
    return [];
  };

  // Get faculty impact insight
  const getFacultyInsight = () => {
    if (insightData?.faculty_impact?.insight) {
      return insightData.faculty_impact.insight;
    }
    return null;
  };

  // Get evaluation impact insight
  const getEvaluationInsight = () => {
    if (insightData?.evaluation_impact?.insight) {
      return insightData.evaluation_impact.insight;
    }
    return null;
  };

  const facultyRecommendations = getFacultyRecommendations();
  const evaluationRecommendations = getEvaluationRecommendations();
  const generalRecommendations = getGeneralRecommendations();
  const facultyInsight = getFacultyInsight();
  const evaluationInsight = getEvaluationInsight();

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Recomendaciones globales</h3>
      <p className="text-sm text-white opacity-80 mb-6">
        Basadas en el análisis de datos académicos realizado el {formatDate(insights.analysis_date)}
      </p>

      {/* Faculty Recommendations */}
      {facultyRecommendations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-purple-200 mb-2">Profesorado</h4>
          
          {facultyInsight && (
            <p className="text-sm text-white opacity-90 mb-3 italic border-l-2 border-purple-400 pl-3">
              {facultyInsight} 
            </p>
          )}
          
          <ul className="space-y-2">
            {facultyRecommendations.map((recommendation: string, index: number) => (
              <li key={index} className="flex items-start bg-white bg-opacity-5 p-3 rounded-lg">
                <span className="text-purple-300 mr-2">{index + 1}.</span>
                <span className="text-sm text-white">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Evaluation Recommendations */}
      {evaluationRecommendations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-purple-200 mb-2">Métodos de evaluación</h4>
          
          {evaluationInsight && (
            <p className="text-sm text-white opacity-90 mb-3 italic border-l-2 border-purple-400 pl-3">
              {evaluationInsight}
            </p>
          )}
          
          <ul className="space-y-2">
            {evaluationRecommendations.map((recommendation: string, index: number) => (
              <li key={index} className="flex items-start bg-white bg-opacity-5 p-3 rounded-lg">
                <span className="text-purple-300 mr-2">{index + 1}.</span>
                <span className="text-sm text-white">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* General Recommendations */}
      {generalRecommendations.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-purple-200 mb-2">Recomendaciones generales</h4>
          <ul className="space-y-2">
            {generalRecommendations.map((recommendation: string, index: number) => (
              <li key={index} className="flex items-start bg-white bg-opacity-5 p-3 rounded-lg">
                <span className="text-purple-300 mr-2">{index + 1}.</span>
                <span className="text-sm text-white">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* If no recommendations are found */}
      {facultyRecommendations.length === 0 && 
       evaluationRecommendations.length === 0 && 
       generalRecommendations.length === 0 && (
        <p className="text-center text-white opacity-60 py-8">
          No hay recomendaciones disponibles en este momento.
        </p>
      )}
    </div>
  );
}

// Helper function to parse JSON safely
function tryParseJSON(jsonString: string | undefined) {
  if (!jsonString) return null;
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Failed to parse JSON:', e);
    return null;
  }
}

// Helper function to format date
function formatDate(dateString: string) {
  if (!dateString) return 'fecha desconocida';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch (e) {
    return dateString;
  }
}