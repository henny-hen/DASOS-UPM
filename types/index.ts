// Subject types
export interface Subject {
    subject_code: string;
    subject_name: string;
    credits: number;
    academic_year: string;
    semester: string;
    total_enrolled?: number;
    first_time?: number;
    partial_dedication?: number;
    performance_rate?: number;
    success_rate?: number;
    absenteeism_rate?: number;
  }
  
  // Historical data types
  export interface HistoricalRate {
    subject_code: string;
    academic_year: string;
    rate_type: string;
    value: number;
  }
  
  // Faculty changes types
  export interface FacultyChange {
    subject_code: string;
    subject_name: string;
    year1: string;
    year2: string;
    faculty_added: number;
    faculty_removed: number;
    percent_changed: number;
  }
  
  // Evaluation changes types
  export interface EvaluationChange {
    subject_code: string;
    subject_name: string;
    year1: string;
    year2: string;
    methods_added: number;
    methods_removed: number;
  }
  
  // Correlation types
  export interface PerformanceCorrelation {
    subject_code: string;
    subject_name: string;
    year1: string;
    year2: string;
    performance_change: number;
    faculty_changed: boolean;
    faculty_percent_changed: number;
    faculty_added: number;
    faculty_removed: number;
    evaluation_changed: boolean;
    evaluation_methods_added: number;
    evaluation_methods_removed: number;
  }
  
  // Global insights types
  export interface GlobalInsights {
    analysis_id: number;
    analysis_date: string;
    faculty_impact_type: string;
    faculty_change_performance: number;
    faculty_stable_performance: number;
    evaluation_impact_type: string;
    evaluation_change_performance: number;
    evaluation_stable_performance: number;
    insights_json: string;
    insights_data?: any;
  }
  
  // Subject insights types
  export interface SubjectInsights {
    subject_code: string;
    analysis_id: number;
    subject_name: string;
    avg_performance_change: number;
    trend_direction: string;
    faculty_impact_type: string;
    evaluation_impact_type: string;
    insights_json: string;
    insights_data?: any;
  }
  
  // API response for search
  export interface SearchResponse {
    results: Subject[];
  }
  
  // Chart data type
  export interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
      fill?: boolean;
    }[];
  }
  
  // Recommendation type
  export interface Recommendation {
    id: string;
    type: 'faculty' | 'evaluation' | 'general';
    text: string;
  }
  
  // API statistics
  export interface ApiStats {
    total_subjects: number;
    total_academic_years: number;
    academic_years: string[];
    total_historical_rates: number;
    has_api_analysis: boolean;
  }