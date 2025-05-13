"use client";

import { useEffect, useRef } from 'react';
import { EvaluationChange, PerformanceCorrelation } from '@/types';
import { 
  Chart, 
  ChartData, 
  ChartOptions, 
  BarController, 
  BarElement, 
  LineElement,
  PointElement,
  LinearScale, 
  CategoryScale, 
  Tooltip, 
  Legend, 
  ChartTypeRegistry 
} from 'chart.js';

Chart.register(
  BarController, 
  BarElement, 
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

interface EvaluationMethodsProps {
  evaluationChanges: EvaluationChange[];
  correlations?: PerformanceCorrelation[];
  title?: string;
  height?: number;
}

export default function EvaluationMethods({ 
  evaluationChanges, 
  correlations,
  title = "Cambios en Métodos de Evaluación",
  height = 300 
}: EvaluationMethodsProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Skip if no data or canvas
    if (!evaluationChanges.length || !chartRef.current) return;

    // Dynamically import Chart.js to avoid SSR issues
    const loadChart = async () => {
      try {
        // Register required components for both bar and line charts
        Chart.register(
          BarController, 
          BarElement, 
          LineElement,   // Add LineElement for line charts
          PointElement,  // Add PointElement for line charts
          LinearScale, 
          CategoryScale, 
          Tooltip, 
          Legend
        );
        
        // Sort evaluation changes by year pairs
        const sortedChanges = [...evaluationChanges].sort((a, b) => 
          a.year1.localeCompare(b.year1) || a.year2.localeCompare(b.year2)
        );
        
        // Prepare data for the chart
        const labels = sortedChanges.map(change => `${change.year1} → ${change.year2}`);
        const addedData = sortedChanges.map(change => change.methods_added);
        const removedData = sortedChanges.map(change => -change.methods_removed);
        
        // Add performance changes if correlations are provided
        let performanceData: number[] = [];
        if (correlations && correlations.length > 0) {
          performanceData = sortedChanges
            .map(change => {
              const correlation = correlations.find(
                c => c.year1 === change.year1 && c.year2 === change.year2
              );
              return correlation ? correlation.performance_change : null;
            })
            .filter((value): value is number => value !== null); // Filter out null values
        }
        
        // Destroy previous chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        
        // Create the chart
        const ctx = chartRef.current?.getContext('2d');
        if (ctx) {
          // Define datasets with proper types
          const datasets: any[] = [
            {
              label: 'Métodos Añadidos',
              data: addedData,
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Métodos Eliminados',
              data: removedData,
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ];
          
          // Add performance line dataset if data exists
          if (performanceData.length) {
            datasets.push({
              label: 'Cambio en Rendimiento (%)',
              data: performanceData,
              backgroundColor: 'rgba(255, 159, 64, 0)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 2,
              type: 'line',  // This specifies it's a line chart
              yAxisID: 'y1'
            });
          }
          
          // Create chart data with proper type assertion
          const chartData = {
            labels,
            datasets
          } as ChartData;
          
          const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'Número de Métodos',
                  color: 'rgba(255, 255, 255, 0.7)'
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              },
              ...(performanceData.length ? {
                y1: {
                  position: 'right',
                  title: {
                    display: true,
                    text: 'Cambio en Rendimiento (%)',
                    color: 'rgba(255, 159, 64, 1)'
                  },
                  grid: {
                    drawOnChartArea: false
                  },
                  ticks: {
                    color: 'rgba(255, 159, 64, 1)'
                  }
                }
              } : {}),
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: 'rgba(0, 0, 0, 0.7)'
                }
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
              }
            }
          } as ChartOptions;
          
          // Create the chart with explicit typing
          chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions
          });
        }
      } catch (error) {
        console.error('Error creating chart:', error);
      }
    };

    loadChart();

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [evaluationChanges, correlations]);

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-purple-300 border-opacity-20">
      <h3 className="text-lg font-medium text-purple-900 mb-4">{title}</h3>
      <div style={{ height: `${height}px` }}>
        <canvas ref={chartRef}></canvas>
      </div>
      {evaluationChanges.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p className="text-black text-opacity-70">No hay datos de cambios en métodos de evaluación disponibles</p>
        </div>
      )}
    </div>
  );
}