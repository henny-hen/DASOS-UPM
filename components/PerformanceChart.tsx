"use client";

import { useEffect, useRef } from 'react';
import { HistoricalRate } from '@/types';
import { Chart, ChartData, ChartOptions, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, ChartTypeRegistry } from 'chart.js';

interface PerformanceChartProps {
  historicalData: HistoricalRate[];
  title?: string;
  height?: number;
}

export default function PerformanceChart({ 
  historicalData, 
  title = "Histórico de Rendimiento",
  height = 300 
}: PerformanceChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Skip if no data or canvas
    if (!historicalData.length || !chartRef.current) return;

    // Dynamically import Chart.js to avoid SSR issues
    const loadChart = async () => {
      try {
        // Register required components
        Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);
        
        // Group data by rate type
        const groupedData: { [key: string]: { year: string; value: number }[] } = {};
        
        historicalData.forEach(item => {
          if (!groupedData[item.rate_type]) {
            groupedData[item.rate_type] = [];
          }
          groupedData[item.rate_type].push({
            year: item.academic_year,
            value: item.value
          });
        });
        
        // Sort data by year
        Object.keys(groupedData).forEach(key => {
          groupedData[key].sort((a, b) => a.year.localeCompare(b.year));
        });
        
        // Get unique years
        const years = Array.from(new Set(historicalData.map(item => item.academic_year))).sort();
        
        // Create datasets for the chart
        const datasets = Object.keys(groupedData).map((rateType, index) => {
          // Define colors for each rate type
          const colors: { [key: string]: string } = {
            'rendimiento': 'rgba(75, 192, 192, 1)',
            'éxito': 'rgba(54, 162, 235, 1)',
            'absentismo': 'rgba(255, 99, 132, 1)'
          };
          
          const backgroundColor = colors[rateType] || `hsl(${index * 137.5}, 70%, 60%)`;
          
          // Create a full dataset with values for each year
          const data = years.map(year => {
            const dataPoint = groupedData[rateType].find(item => item.year === year);
            return dataPoint ? dataPoint.value : null;
          });
          
          // Translate rate types to Spanish
          const rateLabels: { [key: string]: string } = {
            'rendimiento': 'Rendimiento',
            'éxito': 'Éxito',
            'absentismo': 'Absentismo'
          };
          
          return {
            label: rateLabels[rateType] || rateType,
            data,
            backgroundColor,
            borderColor: backgroundColor,
            borderWidth: 2,
            tension: 0.3,
            fill: false
          };
        });
        
        // Destroy previous chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        
        // Create the chart
        const ctx = chartRef.current?.getContext('2d');
        if (ctx) {
          const chartData: ChartData = {
            labels: years,
            datasets
          };
          
          const chartOptions: ChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: 'rgba(0, 0, 0, 0.7)'
                }
              },
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: 'rgba(0, 0, 0, 0.7)'
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
          };
          
          chartInstance.current = new Chart(ctx, {
            type: 'line',
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
  }, [historicalData]);

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-purple-300 border-opacity-20">
      <h3 className="text-lg font-medium text-purple-900 mb-4">{title}</h3>
      <div style={{ height: `${height}px` }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}