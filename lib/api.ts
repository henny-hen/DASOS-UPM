import { 
    Subject, 
    HistoricalRate,
    FacultyChange,
    EvaluationChange,
    PerformanceCorrelation,
    GlobalInsights,
    SubjectInsights,
    ApiStats
  } from '@/types';
  
  // API base URL - change this to match your API server
  const API_BASE_URL = 'https://web-production-43ff5.up.railway.app/api/v1';

  // UPM API URL format

  // Helper function to handle API responses
  async function fetchApi(endpoint: string, options = {}) {
    try {
      // Mock data for development if API is not available
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        return getMockData(endpoint);
      }
  
      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }
  
  // Get all subjects
  export async function getSubjects(academicYear?: string, semester?: string): Promise<Subject[]> {
    let endpoint = '/subjects';
    const params = new URLSearchParams();
    
    if (academicYear) params.append('academic_year', academicYear);
    if (semester) params.append('semester', semester);
    
    const queryString = params.toString();
    if (queryString) endpoint += `?${queryString}`;
    
    return fetchApi(endpoint);
  }
  
  // Search subjects by name
  export async function searchSubjects(query: string): Promise<Subject[]> {
    // This will need to be implemented as a client-side filter or a custom API endpoint
    const subjects = await getSubjects();
    
    if (!query.trim()) return [];
    
    // Simple substring search
    return subjects.filter(subject => 
      subject.subject_name.toLowerCase().includes(query.toLowerCase()) ||
      subject.subject_code.includes(query)
    );
  }
  
  // Get a single subject
  export async function getSubject(subjectCode: string, academicYear?: string): Promise<Subject> {
    let endpoint = `/subjects/${subjectCode}`;
    
    if (academicYear) {
      endpoint += `?academic_year=${academicYear}`;
    }
    
    return fetchApi(endpoint);
  }
  
  // Get historical rates for a subject
  export async function getSubjectHistorical(subjectCode: string, rateType?: string): Promise<HistoricalRate[]> {
    let endpoint = `/subjects/${subjectCode}/historical`;
    
    if (rateType) {
      endpoint += `?rate_type=${rateType}`;
    }
    
    return fetchApi(endpoint);
  }
  
  // Get faculty changes
  export async function getFacultyChanges(subjectCode?: string): Promise<FacultyChange[]> {
    let endpoint = '/faculty/changes';
    
    if (subjectCode) {
      endpoint += `?subject_code=${subjectCode}`;
    }
    
    return fetchApi(endpoint);
  }
  
  // Get evaluation changes
  export async function getEvaluationChanges(subjectCode?: string): Promise<EvaluationChange[]> {
    let endpoint = '/evaluation/changes';
    
    if (subjectCode) {
      endpoint += `?subject_code=${subjectCode}`;
    }
    
    return fetchApi(endpoint);
  }
  
  // Get performance correlations
  export async function getCorrelations(subjectCode?: string): Promise<PerformanceCorrelation[]> {
    let endpoint = '/correlations';
    
    if (subjectCode) {
      endpoint += `?subject_code=${subjectCode}`;
    }
    
    return fetchApi(endpoint);
  }
  
  // Get global insights
  export async function getGlobalInsights(): Promise<GlobalInsights> {
    return fetchApi('/insights/global');
  }
  
  // Get subject insights
  export async function getSubjectInsights(subjectCode?: string, analysisId?: number): Promise<SubjectInsights[]> {
    let endpoint = '/insights/subjects';
    const params = new URLSearchParams();
    
    if (subjectCode) params.append('subject_code', subjectCode);
    if (analysisId) params.append('analysis_id', analysisId.toString());
    
    const queryString = params.toString();
    if (queryString) endpoint += `?${queryString}`;
    
    return fetchApi(endpoint);
  }
  
  // Get API stats
  export async function getApiStats(): Promise<ApiStats> {
    return fetchApi('/stats');
  }

  // Get UPM API data
  export async function getUpmApiData(subjectCode: string, academicYear: string = '2023-24', semester: string = '2S', planCode: string = '10II'): Promise<any> {
    try {
      // First check if we can fetch from mock data in development
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        return getMockUpmData(subjectCode);
      }
      
      // UPM API URL format
      const upmApiUrl = `https://www.upm.es/comun_gauss/publico/api/${academicYear}/${semester}/${planCode}_${subjectCode}.json`;
      
      const response = await fetch(upmApiUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('UPM API URL:', upmApiUrl); // Debugging line to check the URL being called
      console.log('UPM API Response:', response); // Debugging line to check the response object
      // Check if the response is ok
      
      if (!response.ok) {
        throw new Error(`UPM API request failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching UPM API data:', error);
      // Fall back to mock data if fetch fails
      return getMockUpmData(subjectCode);
    }
  }

// Mock UPM API data for development
  function getMockUpmData(subjectCode: string): any {
  // Simplified version of the UPM API response based on the JSON example
  return {
    "codigo": "105000005",
    "nombre": "CÁLCULO",
    "ects": "6",
    "anio": "2023-24",
    "semestre": "2S",
    "guia": "https://www.upm.es/comun_gauss/publico/guias/2023-24/2S/GA_10II_105000005_2S_2023-24.pdf",
    "depto": "Matemática Aplicada a las Tecnologías de la Información y las Comunicaciones",
    "plan": "Grado en Ingenieria Informatica",
    "caracter": "Básica",
    "profesores": [
      {},
      {
        "nombre": "Maria Francisca",
        "apellidos": "Martinez Serrano",
        "email": "mariafrancisca.martinez@upm.es",
        "despacho": "1319",
        "coordinador": false,
        "tutorias": [{"dia": null, "hora_inicio": null, "hora_fin": null, "observaciones": "Previa Cita"}]
      },
      {
        "nombre": "Belen",
        "apellidos": "Rios Sanchez",
        "email": "belen.rios@upm.es",
        "despacho": "1313",
        "coordinador": false,
        "tutorias": [{"dia": null, "hora_inicio": null, "hora_fin": null, "observaciones": "Previa cita"}]
      },
      {
        "nombre": "Alexandre Thomas Guillaume",
        "apellidos": "Quesney",
        "email": "alexandre.quesney@upm.es",
        "despacho": "1313",
        "coordinador": true,
        "tutorias": [{"dia": null, "hora_inicio": null, "hora_fin": null, "observaciones": "Previa cita"}]
      },
      {},
      {
        "nombre": "Maria Paloma",
        "apellidos": "Gomez Toledano",
        "email": "mariapaloma.gomez@upm.es",
        "despacho": "1304",
        "coordinador": false,
        "tutorias": [{"dia": null, "hora_inicio": null, "hora_fin": null, "observaciones": "Previa cita."}]
      },
      {
        "nombre": "Javier",
        "apellidos": "Lopez de la Cruz",
        "email": "javier.lopez.delacruz@upm.es",
        "despacho": "1312",
        "coordinador": false,
        "tutorias": [{"dia": null, "hora_inicio": null, "hora_fin": null, "observaciones": "Previa cita."}]
      },
      {
        "nombre": "Jesus",
        "apellidos": "Castro Infantes",
        "email": "jesus.castro@upm.es",
        "despacho": "1319",
        "coordinador": false,
        "tutorias": [{"dia": null, "hora_inicio": null, "hora_fin": null, "observaciones": "Previa cita."}]
      }
    ],
    "recursos_didacticos": {
      "bibliografia": [
        "COMAP, Las matemáticas en la vida cotidiana (Director del proyecto: S. Garfunkel), Addison - Wesley/Universidad Autónoma de Madrid, 1998.",
        "Castiñeira, E. E.; Martínez, M. F., Cálculo, Sucesiones y series, Fundación General de la UPM, Madrid, 2014."
      ],
      "Recursos web": [
        "http://divulgamat.ehu.es/",
        "Sitio Moodle de la asignatura",
        "Página web de la asignatura y sitio moddle de la asignatura"
      ]
    },
    "actividades_evaluacion": {
      "evaluacion_continua": {
        "1645319": {
          "SEMANA": "6",
          "DENOMINACION": "Prueba de evaluación progresiva Examen escrito abierto Parcial 1\n(Continuous assessment: written partial exam Parcial 1)",
          "DURACION": "02:00",
          "TECNICA": "EX: Técnica del tipo Examen Escrito",
          "PESO": "40",
          "NOTA_MINIMA": "3.5",
          "PRESENCIAL": "Presencial"
        },
        "1645335": {
          "SEMANA": "17",
          "DENOMINACION": "Prueba de evaluación progresiva Examen escrito abierto Parcial 2\n(Continuous assessment: written partial exam Parcial 2)",
          "DURACION": "02:00",
          "TECNICA": "EX: Técnica del tipo Examen Escrito",
          "PESO": "60",
          "NOTA_MINIMA": "3.5",
          "PRESENCIAL": "Presencial"
        }
      },
      "evaluacion_extraordinaria": {
        "1645320": {
          "SEMANA": "16",
          "DENOMINACION": "Prueba de evaluación extraordinaria\nExamen escrito abierto Examen extraordinario \n(Extraordinary Examination: written Extraordinary exam)",
          "DURACION": "03:00",
          "TECNICA": "EX: Técnica del tipo Examen Escrito",
          "PESO": "100",
          "NOTA_MINIMA": "5",
          "PRESENCIAL": "Presencial"
        }
      },
      "prueba_final": {
        "1645317": {
          "SEMANA": "17",
          "DENOMINACION": "Prueba de evaluación global Examen escrito abierto Examen global\n(Final Examination: written Final exam)",
          "DURACION": "03:30",
          "TECNICA": "EX: Técnica del tipo Examen Escrito",
          "PESO": "100",
          "NOTA_MINIMA": "5",
          "PRESENCIAL": "Presencial"
        }
      }
    },
    "criterios_evaluacion": "<h3>Convocatoria ordinaria</h3><div>Para la convocatoria ordinaria de junio se ofrecen los siguientes sistemas de evaluación:</div>"
  };
}  

  // Mock data for development
  function getMockData(endpoint: string): any {
    // Type for mock data index
    interface MockDataMap {
      [key: string]: any;
    }
  
    // Basic mock data structure
    const mockData: MockDataMap = {
      '/subjects': [
        { subject_code: '105000005', subject_name: 'Cálculo', credits: 6, academic_year: '2023-24', semester: 'Segundo' },
        { subject_code: '105000007', subject_name: 'Probabilidades y Estadística I', credits: 6, academic_year: '2023-24', semester: 'Segundo' },
        { subject_code: '105000012', subject_name: 'Sistemas Digitales', credits: 6, academic_year: '2023-24', semester: 'Segundo' },
        { subject_code: '105000015', subject_name: 'Programación II', credits: 6, academic_year: '2023-24', semester: 'Segundo' },
        { subject_code: '105000159', subject_name: 'Interacción Persona - Ordenador', credits: 6, academic_year: '2023-24', semester: 'Segundo' },
      ],
      '/subjects/105000005': {
        subject_code: '105000005',
        subject_name: 'Cálculo',
        credits: 6,
        academic_year: '2023-24',
        semester: 'Segundo',
        total_enrolled: 455,
        first_time: 248,
        partial_dedication: 0,
        performance_rate: 31.94,
        success_rate: 36.52,
        absenteeism_rate: 12.56
      },
      '/subjects/105000005/historical': [
        { subject_code: '105000005', academic_year: '2020-21', rate_type: 'rendimiento', value: 31.32 },
        { subject_code: '105000005', academic_year: '2021-22', rate_type: 'rendimiento', value: 35.12 },
        { subject_code: '105000005', academic_year: '2022-23', rate_type: 'rendimiento', value: 32.49 },
        { subject_code: '105000005', academic_year: '2023-24', rate_type: 'rendimiento', value: 31.94 },
        { subject_code: '105000005', academic_year: '2020-21', rate_type: 'éxito', value: 41.80 },
        { subject_code: '105000005', academic_year: '2021-22', rate_type: 'éxito', value: 42.30 },
        { subject_code: '105000005', academic_year: '2022-23', rate_type: 'éxito', value: 37.90 },
        { subject_code: '105000005', academic_year: '2023-24', rate_type: 'éxito', value: 36.52 },
        { subject_code: '105000005', academic_year: '2020-21', rate_type: 'absentismo', value: 25.06 },
        { subject_code: '105000005', academic_year: '2021-22', rate_type: 'absentismo', value: 16.98 },
        { subject_code: '105000005', academic_year: '2022-23', rate_type: 'absentismo', value: 14.29 },
        { subject_code: '105000005', academic_year: '2023-24', rate_type: 'absentismo', value: 12.56 }
      ],
      '/faculty/changes': [
        {
          subject_code: '105000005',
          subject_name: 'Cálculo',
          year1: '2022-23',
          year2: '2023-24',
          faculty_added: 2,
          faculty_removed: 1,
          percent_changed: 25.0
        }
      ],
      '/evaluation/changes': [
        {
          subject_code: '105000005',
          subject_name: 'Cálculo',
          year1: '2022-23',
          year2: '2023-24',
          methods_added: 1,
          methods_removed: 0
        }
      ],
      '/correlations': [
        {
          subject_code: '105000005',
          subject_name: 'Cálculo',
          year1: '2022-23',
          year2: '2023-24',
          performance_change: -0.55,
          faculty_changed: true,
          faculty_percent_changed: 25.0,
          faculty_added: 2,
          faculty_removed: 1,
          evaluation_changed: true,
          evaluation_methods_added: 1,
          evaluation_methods_removed: 0
        }
      ],
      '/insights/global': {
        analysis_id: 1,
        analysis_date: '2023-05-15',
        faculty_impact_type: 'positive',
        faculty_change_performance: 2.5,
        faculty_stable_performance: 0.7,
        evaluation_impact_type: 'neutral',
        evaluation_change_performance: 1.2,
        evaluation_stable_performance: 0.9,
        insights_json: JSON.stringify({
          faculty_impact: {
            insight: 'Los cambios en el profesorado se asocian a mejoras en el rendimiento',
            recommendations: [
              'Continuar la política de renovación estratégica del profesorado en asignaturas con bajos rendimientos',
              'Identificar y replicar las prácticas de los nuevos profesores en asignaturas de alto rendimiento'
            ]
          },
          evaluation_impact: {
            insight: 'Los métodos de evaluación tienen un impacto moderado en el rendimiento',
            recommendations: [
              'Estandarizar los métodos de evaluación más efectivos y mantener consistencia',
              'Comunicar con claridad a los estudiantes los criterios y métodos de evaluación'
            ]
          }
        })
      },
      '/insights/subjects': [
        {
          subject_code: '105000005',
          analysis_id: 1,
          subject_name: 'Cálculo',
          avg_performance_change: -0.55,
          trend_direction: 'declining',
          faculty_impact_type: 'negative',
          evaluation_impact_type: 'neutral',
          insights_json: JSON.stringify({
            performance_analysis: 'La asignatura muestra una tendencia de declive ligero en rendimiento',
            faculty_impact: 'Los cambios recientes en el profesorado no han contribuido positivamente al rendimiento',
            recommendations: [
              'Establecer mayor continuidad en el equipo docente',
              'Revisar los métodos de enseñanza y adaptarlos al perfil de los estudiantes'
            ]
          })
        }
      ],
      '/stats': {
        total_subjects: 5,
        total_academic_years: 4,
        academic_years: ['2020-21', '2021-22', '2022-23', '2023-24'],
        total_historical_rates: 60,
        has_api_analysis: true
      }
    };
  
    // Extract the base endpoint path without query parameters
    const basePath = endpoint.split('?')[0];
    
    // Check if there's a dynamic path (like subject code)
    if (basePath.includes('/subjects/') && !basePath.includes('/historical')) {
      const subjectCode = basePath.split('/subjects/')[1];
      return mockData['/subjects/105000005']; // Return the mock subject
    }
    
    return mockData[basePath] || [];
  }