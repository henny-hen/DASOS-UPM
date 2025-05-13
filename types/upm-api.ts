// UPM API data types

export interface UpmSubject {
    codigo: string;
    nombre: string;
    ects: string;
    anio: string;
    semestre: string;
    guia: string;
    depto: string;
    plan: string;
    caracter: string;
    profesores: (UpmProfessor | {})[];
    recursos_didacticos: UpmResources;
    actividades_evaluacion: UpmEvaluationActivities;
    criterios_evaluacion: string;
    fecha_actualizacion?: string;
  }
  
  export interface UpmProfessor {
    nombre?: string;
    apellidos?: string;
    email?: string;
    despacho?: string;
    coordinador?: boolean;
    tutorias?: UpmTutoria[];
  }
  
  export interface UpmTutoria {
    dia: string | null;
    hora_inicio: string | null;
    hora_fin: string | null;
    observaciones: string | null;
  }
  
  export interface UpmResources {
    bibliografia: string[];
    "Recursos web"?: string[];
  }
  
  export interface UpmEvaluationActivities {
    evaluacion_continua?: {
      [key: string]: UpmEvaluationActivity;
    };
    evaluacion_extraordinaria?: {
      [key: string]: UpmEvaluationActivity;
    };
    prueba_final?: {
      [key: string]: UpmEvaluationActivity;
    };
  }
  
  export interface UpmEvaluationActivity {
    SEMANA: string;
    DENOMINACION: string;
    DURACION: string;
    TECNICA: string;
    PESO: string;
    NOTA_MINIMA: string;
    PRESENCIAL: string;
  }