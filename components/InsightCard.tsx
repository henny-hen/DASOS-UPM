import React from 'react';
import { SubjectInsights } from '@/types';

interface InsightCardProps {
  insights: SubjectInsights;
}

export default function InsightCard({ insights }: InsightCardProps) {
  // Extract insights data if available
  const insightData = insights.insights_data || tryParseJSON(insights.insights_json);
  
  // Determine trend color
  const getTrendColor = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'improving':
      case 'positive':
        return 'text-green-400';
      case 'declining':
      case 'negative':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };
  
  // Determine impact color
  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'positive':
        return 'bg-green-600';
      case 'negative':
        return 'bg-red-600';
      default:
        return 'bg-yellow-600';
    }
  };

  // Get faculty impact text - handle object values safely
  const getFacultyImpactText = () => {
    if (!insightData) return null;
    
    if (typeof insightData.faculty_impact === 'string') {
      return insightData.faculty_impact;
    }
    
    // If it's an object, check for specific string properties
    if (typeof insightData.faculty_impact === 'object' && insightData.faculty_impact) {
      if (typeof insightData.faculty_impact.insight === 'string') {
        return insightData.faculty_impact.insight;
      }
    }
    
    return null;
  };

  // Get evaluation impact text - handle object values safely
  const getEvaluationImpactText = () => {
    if (!insightData) return null;
    
    if (typeof insightData.evaluation_impact === 'string') {
      return insightData.evaluation_impact;
    }
    
    // If it's an object, check for specific string properties
    if (typeof insightData.evaluation_impact === 'object' && insightData.evaluation_impact) {
      if (typeof insightData.evaluation_impact.insight === 'string') {
        return insightData.evaluation_impact.insight;
      }
    }
    
    return null;
  };

  // Get recommendations - handle different formats safely
  const getRecommendations = () => {
    if (!insightData) return [];
    
    if (Array.isArray(insightData.periods[insightData.periods.length - 1].insights)) {
      return insightData.periods[insightData.periods.length - 1].insights;
    }
    
    return [];
  };

  // Get faculty impact and evaluation impact texts
  const facultyImpactText = getFacultyImpactText();
  const evaluationImpactText = getEvaluationImpactText();
  const recommendations = getRecommendations();
  console.log('Recommendations:', recommendations);

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-purple-300 border-opacity-20">
      <h3 className="text-xl font-bold text-purple-900 mb-4">Análisis de rendimiento</h3>
      
      {/* Trend Information */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-purple-500 font-medium">Tendencia general</h4>
          <span className={`px-3 py-1 rounded-full text-sm ${getTrendColor(insights.trend_direction)}`}>
            {insights.trend_direction === 'improving' ? 'Mejorando' : 
             insights.trend_direction === 'declining' ? 'Empeorando' : 'Estable'}
          </span>
        </div>
        
        <div className="flex items-center mb-2">
          <span className="text-sm text-purple-500 w-64">Cambio medio de rendimiento:</span>
          <span className={`text-sm font-medium ${insights.avg_performance_change >= 0 ? 'text-green-400' : 'text-black'}`}>
            {insights.avg_performance_change >= 0 ? '+' : ''}{insights.avg_performance_change.toFixed(2)}%
          </span>
        </div>
        
        {insightData?.performance_analysis && (
          <p className="text-sm text-black opacity-80 mt-2">
            {insightData.performance_analysis}
          </p>
        )}
      </div>
      
      {/* Impact Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Faculty Impact */}
        <div className="bg-white bg-opacity-5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-purple-500 font-medium">Impacto de cambios en profesorado</h4>
            <span className={`px-2 py-1 rounded-full text-xs text-white ${getImpactColor(insights.faculty_impact_type)}`}>
              {insights.faculty_impact_type === 'positive' ? 'Positivo' : 
               insights.faculty_impact_type === 'negative' ? 'Negativo' : 'Neutro'}
            </span>
          </div>
          
          {facultyImpactText && (
            <p className="text-sm text-white opacity-80">
              {facultyImpactText}
            </p>
          )}
        </div>
        
        {/* Evaluation Impact */}
        <div className="bg-white bg-opacity-5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-purple-500 font-medium">Impacto de cambios en evaluación</h4>
            <span className={`px-2 py-1 rounded-full text-xs text-white ${getImpactColor(insights.evaluation_impact_type)}`}>
              {insights.evaluation_impact_type === 'positive' ? 'Positivo' : 
               insights.evaluation_impact_type === 'negative' ? 'Negativo' : 'Neutro'}
            </span>
          </div>
          
          {evaluationImpactText && (
            <p className="text-sm text-white opacity-80">
              {evaluationImpactText}
            </p>
          )}
        </div>
      </div>
      
      {/* Recommendations */}
      
      {recommendations.length > 0 && (
        <div>
          <h4 className="text-purple-500 font-medium mb-3">Resumen</h4>
          <ul className="space-y-2">
            {recommendations.map((rec: {text: string, type: string}, index:number) => (
              <li key={index} className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span className="text-sm text-purple-600 opacity-80">Durante el último periodo: {rec.text}</span>
              </li>
            ))}
          </ul>
        </div>
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