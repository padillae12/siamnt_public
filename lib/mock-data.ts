/**
 * ProMant - Base de datos Mock en memoria para modo Test / Demostración Pública
 * No requiere MySQL ni backend. Cada vez que se reinicia/recarga la aplicación,
 * vuelve al estado inicial de demostración.
 */

export interface MockUsuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: 'admin' | 'empleado' | 'cliente';
  estado: 'activo' | 'inactivo';
  empresa_id: number | null;
  empresa: string | null;
  telefono: string;
  ciudad?: string;
  created_at: string;
}

export interface MockEquipo {
  id: string;
  sucursal_id: string;
  nombre: string;
  tipo?: string;
  modelo?: string;
  serie?: string;
  numero_serie?: string;
  imagen_url?: string;
  activo: boolean;
  created_at?: string;
}

export interface MockSucursal {
  id: string;
  empresa_id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  activo: boolean;
  imagen_url?: string;
  equipos_count?: number;
  created_at?: string;
  equipos: MockEquipo[];
}

export interface MockEmpresa {
  id: string;
  nombre: string;
  logo_url?: string;
  sucursales_count?: number;
  created_at?: string;
  sucursales: MockSucursal[];
}

export interface MockArchivoReporte {
  id: number;
  reporte_id: number;
  tipo_archivo: 'foto' | 'video' | 'pdf' | 'audio' | 'foto_revision';
  cloudflare_url: string;
  cloudflare_key: string;
  nombre_original: string;
  tamaño: number;
  created_at: string;
}

export interface MockReporte {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  usuario_id: number;
  usuario_nombre: string;
  usuario_apellido: string;
  usuario_email: string;
  empresa_id: number | null;
  empresa: string;
  equipo_id: number | null;
  equipo_descripcion: string;
  sucursal: string;
  sucursal_id: number | null;
  created_at: string;
  updated_at: string;
  empleado_asignado_id: number | null;
  empleado_asignado_nombre: string | null;
  empleado_asignado_email: string | null;
  analisis_general?: string | null;
  precio_cotizacion?: number | null;
  moneda?: string | null;
  cotizacion_explicacion?: string | null;
  revision?: string | null;
  recomendaciones?: string | null;
  reparacion?: string | null;
  recomendaciones_adicionales?: string | null;
  materiales_refacciones?: string | null;
  trabajo_completado?: boolean | string | null;
  cerrado_por_cliente_at?: string | null;
  comentario?: string | null;
  motivo_cancelacion?: string | null;
  archivos: MockArchivoReporte[];
}

export interface MockTarea {
  id: number;
  titulo: string;
  descripcion: string;
  admin_email: string;
  admin_nombre: string;
  empleado_email: string;
  estado: 'pendiente' | 'en_proceso' | 'completada' | 'rechazada';
  created_at: string;
  updated_at: string;
}

export interface MockHerramienta {
  id: number;
  nombre: string;
  descripcion: string;
  estado: 'disponible' | 'en_uso' | 'mantenimiento';
  usuario_id: number | null;
  empleado_nombre?: string | null;
  asignacion_id?: number | null;
}

export interface MockAsignacion {
  id: number;
  usuario_id: number;
  herramienta_id: number;
  herramienta_nombre: string;
  empleado_nombre: string;
  empleado_email: string;
  estado: 'asignada' | 'devuelta' | 'perdida';
  fecha_asignacion: string;
  cantidad?: number;
  observaciones?: string;
}

export interface MockEncuesta {
  id: number;
  reporte_id: number;
  cliente_email: string;
  cliente_nombre: string;
  empleado_email: string;
  empleado_nombre: string;
  empresa: string;
  trato_equipo: number;
  equipo_tecnico: number;
  personal_administrativo: number;
  rapidez: number;
  costo_calidad: number;
  recomendacion: number;
  satisfaccion: number;
  comentarios: string;
  created_at: string;
}

// ==========================================
// DATOS INICIALES SEMILLA (DEMO DATA)
// ==========================================

const USUARIOS_INICIALES: MockUsuario[] = [
  {
    id: 1,
    nombre: 'Roberto',
    apellido: 'Sánchez',
    email: 'admin@ProMant.com',
    rol: 'admin',
    estado: 'activo',
    empresa_id: null,
    empresa: 'ProMant Central',
    telefono: '81 1234 5678',
    ciudad: 'Monterrey, N.L.',
    created_at: '2026-01-10T08:00:00.000Z',
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellido: 'Mendoza',
    email: 'carlos.tecnico@ProMant.com',
    rol: 'empleado',
    estado: 'activo',
    empresa_id: null,
    empresa: 'ProMant Servicios Técnicos',
    telefono: '81 8765 4321',
    ciudad: 'Monterrey, N.L.',
    created_at: '2026-01-15T09:00:00.000Z',
  },
  {
    id: 3,
    nombre: 'Luis',
    apellido: 'Ramírez',
    email: 'luis.mantenimiento@ProMant.com',
    rol: 'empleado',
    estado: 'activo',
    empresa_id: null,
    empresa: 'ProMant Servicios Técnicos',
    telefono: '81 2345 6789',
    ciudad: 'San Nicolás, N.L.',
    created_at: '2026-01-20T10:00:00.000Z',
  },
  {
    id: 4,
    nombre: 'Mariana',
    apellido: 'Treviño',
    email: 'contacto@femsa-demo.com',
    rol: 'cliente',
    estado: 'activo',
    empresa_id: 1,
    empresa: 'Cadena Comercial OXXO',
    telefono: '81 9876 5432',
    ciudad: 'Monterrey, N.L.',
    created_at: '2026-02-01T11:00:00.000Z',
  },
  {
    id: 5,
    nombre: 'Jorge',
    apellido: 'Villarreal',
    email: 'gerente@soriana-demo.com',
    rol: 'cliente',
    estado: 'activo',
    empresa_id: 2,
    empresa: 'Tiendas Soriana',
    telefono: '81 3456 7890',
    ciudad: 'San Pedro Garza García, N.L.',
    created_at: '2026-02-05T12:00:00.000Z',
  },
];

const EMPRESAS_INICIALES: MockEmpresa[] = [
  {
    id: '1',
    nombre: 'Cadena Comercial OXXO',
    logo_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=200',
    sucursales_count: 2,
    created_at: '2026-01-01T00:00:00.000Z',
    sucursales: [
      {
        id: '101',
        empresa_id: '1',
        nombre: 'Sucursal Garza Sada',
        direccion: 'Av. Eugenio Garza Sada #2501 Sur',
        ciudad: 'Monterrey',
        activo: true,
        imagen_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
        equipos_count: 2,
        equipos: [
          {
            id: '1001',
            sucursal_id: '101',
            nombre: 'Minisplit Inverter York 2 Ton',
            tipo: 'Climatización',
            modelo: 'YKC-24',
            serie: 'YK-2023-887',
            numero_serie: 'YK-2023-887',
            activo: true,
          },
          {
            id: '1002',
            sucursal_id: '101',
            nombre: 'Cámara Conservadora de Hielo',
            tipo: 'Refrigeración Comercial',
            modelo: 'ICE-PRO',
            serie: 'ICE-991',
            numero_serie: 'ICE-991',
            activo: true,
          },
        ],
      },
      {
        id: '102',
        empresa_id: '1',
        nombre: 'Sucursal San Pedro',
        direccion: 'Calzada del Valle #400 Ote',
        ciudad: 'San Pedro Garza García',
        activo: true,
        imagen_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
        equipos_count: 1,
        equipos: [
          {
            id: '1003',
            sucursal_id: '102',
            nombre: 'Unidad Condensadora Bizerba 3HP',
            tipo: 'Refrigeración',
            modelo: 'BZ-300',
            serie: 'BZ-7741',
            numero_serie: 'BZ-7741',
            activo: true,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    nombre: 'Tiendas Soriana',
    logo_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200',
    sucursales_count: 1,
    created_at: '2026-01-05T00:00:00.000Z',
    sucursales: [
      {
        id: '201',
        empresa_id: '2',
        nombre: 'Híper Valle Oriente',
        direccion: 'Av. Lázaro Cárdenas #1000',
        ciudad: 'San Pedro Garza García',
        activo: true,
        imagen_url: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400',
        equipos_count: 1,
        equipos: [
          {
            id: '2001',
            sucursal_id: '201',
            nombre: 'Rack Central Copeland 15HP',
            tipo: 'Refrigeración Industrial',
            modelo: 'COP-RACK-15',
            serie: 'COP-10294',
            numero_serie: 'COP-10294',
            activo: true,
          },
        ],
      },
    ],
  },
  {
    id: '3',
    nombre: 'Grupo Industrial Regio',
    logo_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200',
    sucursales_count: 1,
    created_at: '2026-01-10T00:00:00.000Z',
    sucursales: [
      {
        id: '301',
        empresa_id: '3',
        nombre: 'Planta Apodaca',
        direccion: 'Parque Industrial Huinalá Nave 4',
        ciudad: 'Apodaca',
        activo: true,
        imagen_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',
        equipos_count: 1,
        equipos: [
          {
            id: '3001',
            sucursal_id: '301',
            nombre: 'Chiller Trane Scroll 30 Ton',
            tipo: 'Climatización Industrial',
            modelo: 'CGAM-030',
            serie: 'TRN-4491',
            numero_serie: 'TRN-4491',
            activo: true,
          },
        ],
      },
    ],
  },
];

const REPORTES_INICIALES: MockReporte[] = [
  {
    id: 1,
    titulo: 'Minisplit Inverter York 2 Ton - Sucursal Garza Sada',
    descripcion: 'Modelo: YKC-24\nSerie: YK-2023-887\nSucursal: Sucursal Garza Sada\nComentario: El equipo no enfría en zona de cajas. Ventilador exterior gira lento y display muestra error E4 (fuga de gas).\nPrioridad: alta',
    estado: 'pendiente',
    prioridad: 'alta',
    usuario_id: 4,
    usuario_nombre: 'Mariana',
    usuario_apellido: 'Treviño',
    usuario_email: 'contacto@femsa-demo.com',
    empresa_id: 1,
    empresa: 'Cadena Comercial OXXO',
    equipo_id: 1001,
    equipo_descripcion: 'Minisplit Inverter York 2 Ton',
    sucursal: 'Sucursal Garza Sada',
    sucursal_id: 101,
    created_at: '2026-10-28T09:15:00.000Z',
    updated_at: '2026-10-28T09:15:00.000Z',
    empleado_asignado_id: null,
    empleado_asignado_nombre: null,
    empleado_asignado_email: null,
    archivos: [
      {
        id: 1,
        reporte_id: 1,
        tipo_archivo: 'foto',
        cloudflare_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
        cloudflare_key: 'demo-foto-1.jpg',
        nombre_original: 'evidencia-minisplit.jpg',
        tamaño: 145000,
        created_at: '2026-10-28T09:15:00.000Z',
      },
    ],
  },
  {
    id: 2,
    titulo: 'Cámara Conservadora de Hielo - Sucursal Garza Sada',
    descripcion: 'Modelo: ICE-PRO\nSerie: ICE-991\nSucursal: Sucursal Garza Sada\nComentario: Temperatura en -2°C (debe estar en -18°C). Evaporador presenta escarcha excesiva en serpentín.\nPrioridad: urgente',
    estado: 'asignado',
    prioridad: 'urgente',
    usuario_id: 4,
    usuario_nombre: 'Mariana',
    usuario_apellido: 'Treviño',
    usuario_email: 'contacto@femsa-demo.com',
    empresa_id: 1,
    empresa: 'Cadena Comercial OXXO',
    equipo_id: 1002,
    equipo_descripcion: 'Cámara Conservadora de Hielo',
    sucursal: 'Sucursal Garza Sada',
    sucursal_id: 101,
    empleado_asignado_id: 2,
    empleado_asignado_nombre: 'Carlos Mendoza',
    empleado_asignado_email: 'carlos.tecnico@ProMant.com',
    created_at: '2026-10-27T14:30:00.000Z',
    updated_at: '2026-10-27T15:00:00.000Z',
    archivos: [
      {
        id: 2,
        reporte_id: 2,
        tipo_archivo: 'foto',
        cloudflare_url: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?w=800',
        cloudflare_key: 'demo-foto-2.jpg',
        nombre_original: 'evaporador-escarcha.jpg',
        tamaño: 182000,
        created_at: '2026-10-27T14:30:00.000Z',
      },
    ],
  },
  {
    id: 3,
    titulo: 'Rack Central Copeland 15HP - Híper Valle Oriente',
    descripcion: 'Modelo: COP-RACK-15\nSerie: COP-10294\nSucursal: Híper Valle Oriente\nComentario: Mantenimiento correctivo por caída de presión en línea de succión.\nPrioridad: alta',
    estado: 'en_proceso',
    prioridad: 'alta',
    usuario_id: 5,
    usuario_nombre: 'Jorge',
    usuario_apellido: 'Villarreal',
    usuario_email: 'gerente@soriana-demo.com',
    empresa_id: 2,
    empresa: 'Tiendas Soriana',
    equipo_id: 2001,
    equipo_descripcion: 'Rack Central Copeland 15HP',
    sucursal: 'Híper Valle Oriente',
    sucursal_id: 201,
    empleado_asignado_id: 2,
    empleado_asignado_nombre: 'Carlos Mendoza',
    empleado_asignado_email: 'carlos.tecnico@ProMant.com',
    analisis_general: 'Se detectó obstrucción severa en filtro deshidratador y microfuga en válvula de servicio. Se requiere cambio de piedra deshidratadora D-48 y recarga de 4kg gas R404A.',
    precio_cotizacion: 6850.0,
    moneda: 'MXN',
    cotizacion_explicacion: 'Refacciones originales Danfoss, gas ecológico R404A, vacío profundo a 250 micrones y prueba de hermeticidad con nitrógeno seco.',
    revision: 'Presión baja: 22 PSI (anormal). Presión alta: 260 PSI. Corriente compresor: 21A.',
    recomendaciones: 'Realizar cambio antes de que se dañe el devanado eléctrico del compresor.',
    reparacion: 'Reemplazo de filtro deshidratador y recarga de refrigerante.',
    materiales_refacciones: '1x Filtro deshidratador Danfoss D-48, 4kg gas R404A Dupont, 1x Válvula de acceso 1/4',
    created_at: '2026-10-26T11:00:00.000Z',
    updated_at: '2026-10-27T16:20:00.000Z',
    archivos: [
      {
        id: 3,
        reporte_id: 3,
        tipo_archivo: 'foto',
        cloudflare_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
        cloudflare_key: 'demo-foto-3.jpg',
        nombre_original: 'compresor-copeland.jpg',
        tamaño: 210000,
        created_at: '2026-10-26T11:00:00.000Z',
      },
    ],
  },
  {
    id: 4,
    titulo: 'Chiller Trane Scroll 30 Ton - Planta Apodaca',
    descripcion: 'Modelo: CGAM-030\nSerie: TRN-4491\nSucursal: Planta Apodaca\nComentario: Ruido anormal en condensador ventilador #2.\nPrioridad: media',
    estado: 'finalizado',
    prioridad: 'media',
    usuario_id: 4,
    usuario_nombre: 'Mariana',
    usuario_apellido: 'Treviño',
    usuario_email: 'contacto@femsa-demo.com',
    empresa_id: 1,
    empresa: 'Cadena Comercial OXXO',
    equipo_id: 3001,
    equipo_descripcion: 'Chiller Trane Scroll 30 Ton',
    sucursal: 'Planta Apodaca',
    sucursal_id: 301,
    empleado_asignado_id: 3,
    empleado_asignado_nombre: 'Luis Ramírez',
    empleado_asignado_email: 'luis.mantenimiento@ProMant.com',
    analisis_general: 'Baleros del motor del ventilador axial desgastados por vibración. Se instaló motor nuevo trifásico 1.5HP marca Weg.',
    precio_cotizacion: 12400.0,
    moneda: 'MXN',
    cotizacion_explicacion: 'Motor 1.5HP 220/440V, aspa balanceada dinámicamente y mano de obra certificada.',
    trabajo_completado: true,
    created_at: '2026-10-24T08:00:00.000Z',
    updated_at: '2026-10-25T18:00:00.000Z',
    archivos: [
      {
        id: 4,
        reporte_id: 4,
        tipo_archivo: 'foto',
        cloudflare_url: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800',
        cloudflare_key: 'demo-foto-4.jpg',
        nombre_original: 'tablero-chiller.jpg',
        tamaño: 195000,
        created_at: '2026-10-24T08:00:00.000Z',
      },
    ],
  },
  {
    id: 5,
    titulo: 'Unidad Condensadora Bizerba 3HP - Sucursal San Pedro',
    descripcion: 'Modelo: BZ-300\nSerie: BZ-7741\nSucursal: Sucursal San Pedro\nComentario: Calibración de presostatos y mantenimiento preventivo trimestral.\nPrioridad: baja',
    estado: 'cerrado_por_cliente',
    prioridad: 'baja',
    usuario_id: 4,
    usuario_nombre: 'Mariana',
    usuario_apellido: 'Treviño',
    usuario_email: 'contacto@femsa-demo.com',
    empresa_id: 1,
    empresa: 'Cadena Comercial OXXO',
    equipo_id: 1003,
    equipo_descripcion: 'Unidad Condensadora Bizerba 3HP',
    sucursal: 'Sucursal San Pedro',
    sucursal_id: 102,
    empleado_asignado_id: 2,
    empleado_asignado_nombre: 'Carlos Mendoza',
    empleado_asignado_email: 'carlos.tecnico@ProMant.com',
    analisis_general: 'Limpieza química de serpentines con desengrasante biodegradable. Calibración de presostatos Danfoss y reapriete de bornes eléctricos.',
    precio_cotizacion: 3200.0,
    moneda: 'MXN',
    trabajo_completado: true,
    cerrado_por_cliente_at: '2026-10-23T17:00:00.000Z',
    created_at: '2026-10-22T10:00:00.000Z',
    updated_at: '2026-10-23T17:00:00.000Z',
    archivos: [
      {
        id: 5,
        reporte_id: 5,
        tipo_archivo: 'foto',
        cloudflare_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
        cloudflare_key: 'demo-foto-5.jpg',
        nombre_original: 'mantenimiento-bizerba.jpg',
        tamaño: 220000,
        created_at: '2026-10-22T10:00:00.000Z',
      },
    ],
  },
];

const TAREAS_INICIALES: MockTarea[] = [
  {
    id: 1,
    titulo: 'Inspección de presiones en OXXO San Pedro',
    descripcion: 'Verificar presiones de alta y baja en todas las condensadoras y registrar en bitácora.',
    admin_email: 'admin@ProMant.com',
    admin_nombre: 'Roberto Sánchez',
    empleado_email: 'carlos.tecnico@ProMant.com',
    estado: 'pendiente',
    created_at: '2026-10-28T10:00:00.000Z',
    updated_at: '2026-10-28T10:00:00.000Z',
  },
  {
    id: 2,
    titulo: 'Calibración de sensores de temperatura en Cámara Fría',
    descripcion: 'Usar termómetro patrón para calibrar los sensores PT100 del controlador Dixell en OXXO Garza Sada.',
    admin_email: 'admin@ProMant.com',
    admin_nombre: 'Roberto Sánchez',
    empleado_email: 'carlos.tecnico@ProMant.com',
    estado: 'en_proceso',
    created_at: '2026-10-27T11:00:00.000Z',
    updated_at: '2026-10-28T08:30:00.000Z',
  },
  {
    id: 3,
    titulo: 'Cambio de filtros y limpieza de condensadores',
    descripcion: 'Lavado a presión de condensadores con producto Foaming Clean en Planta Apodaca.',
    admin_email: 'admin@ProMant.com',
    admin_nombre: 'Roberto Sánchez',
    empleado_email: 'luis.mantenimiento@ProMant.com',
    estado: 'completada',
    created_at: '2026-10-25T09:00:00.000Z',
    updated_at: '2026-10-26T16:00:00.000Z',
  },
];

const HERRAMIENTAS_INICIALES: MockHerramienta[] = [
  {
    id: 1,
    nombre: 'Manómetro Digital Testo 550s (Bluetooth)',
    descripcion: 'Set con mangueras de 60 pulgadas y sondas de pinza para temperatura',
    estado: 'en_uso',
    usuario_id: 2,
    empleado_nombre: 'Carlos Mendoza',
    asignacion_id: 1,
  },
  {
    id: 2,
    nombre: 'Bomba de Vacío Robinair 8 CFM Doble Etapa',
    descripcion: 'Bomba con vacuómetro analógico integrado y solenoide de retención',
    estado: 'en_uso',
    usuario_id: 2,
    empleado_nombre: 'Carlos Mendoza',
    asignacion_id: 2,
  },
  {
    id: 3,
    nombre: 'Detector de Fugas Infrarrojo D-TEK Select',
    descripcion: 'Sensibilidad a todos los refrigerantes HFC, CFC y mezclas ecológicas',
    estado: 'disponible',
    usuario_id: null,
    empleado_nombre: null,
    asignacion_id: null,
  },
  {
    id: 4,
    nombre: 'Multímetro / Amperímetro Fluke 116/323 HVAC',
    descripcion: 'Medición de capacitancia, microamperios de llama y temperatura',
    estado: 'en_uso',
    usuario_id: 3,
    empleado_nombre: 'Luis Ramírez',
    asignacion_id: 3,
  },
  {
    id: 5,
    nombre: 'Recuperadora de Gas Refrigerante Appion G5Twin',
    descripcion: 'Compresor de doble cilindro libre de aceite para recuperación rápida',
    estado: 'disponible',
    usuario_id: null,
    empleado_nombre: null,
    asignacion_id: null,
  },
];

const ASIGNACIONES_INICIALES: MockAsignacion[] = [
  {
    id: 1,
    usuario_id: 2,
    herramienta_id: 1,
    herramienta_nombre: 'Manómetro Digital Testo 550s (Bluetooth)',
    empleado_nombre: 'Carlos Mendoza',
    empleado_email: 'carlos.tecnico@ProMant.com',
    estado: 'asignada',
    fecha_asignacion: '2026-10-20',
    cantidad: 1,
    observaciones: 'Entregado en maletín rígido con accesorios completos.',
  },
  {
    id: 2,
    usuario_id: 2,
    herramienta_id: 2,
    herramienta_nombre: 'Bomba de Vacío Robinair 8 CFM Doble Etapa',
    empleado_nombre: 'Carlos Mendoza',
    empleado_email: 'carlos.tecnico@ProMant.com',
    estado: 'asignada',
    fecha_asignacion: '2026-10-20',
    cantidad: 1,
    observaciones: 'Aceite de vacío nuevo recién cambiado.',
  },
  {
    id: 3,
    usuario_id: 3,
    herramienta_id: 4,
    herramienta_nombre: 'Multímetro / Amperímetro Fluke 116/323 HVAC',
    empleado_nombre: 'Luis Ramírez',
    empleado_email: 'luis.mantenimiento@ProMant.com',
    estado: 'asignada',
    fecha_asignacion: '2026-10-22',
    cantidad: 1,
    observaciones: 'Calibración vigente hasta 2027.',
  },
];

const ENCUESTAS_INICIALES: MockEncuesta[] = [
  {
    id: 1,
    reporte_id: 5,
    cliente_email: 'contacto@femsa-demo.com',
    cliente_nombre: 'Mariana Treviño',
    empleado_email: 'carlos.tecnico@ProMant.com',
    empleado_nombre: 'Carlos Mendoza',
    empresa: 'Cadena Comercial OXXO',
    trato_equipo: 5,
    equipo_tecnico: 5,
    personal_administrativo: 5,
    rapidez: 5,
    costo_calidad: 5,
    recomendacion: 5,
    satisfaccion: 5,
    comentarios: 'Excelente servicio por parte de Carlos Mendoza. Llegó puntualmente y la condensadora quedó operando al 100%.',
    created_at: '2026-10-23T17:30:00.000Z',
  },
];

// ==========================================
// STORE EN MEMORIA
// ==========================================

class MockStore {
  private usuarios: MockUsuario[] = [];
  private empresas: MockEmpresa[] = [];
  private reportes: MockReporte[] = [];
  private tareas: MockTarea[] = [];
  private herramientas: MockHerramienta[] = [];
  private asignaciones: MockAsignacion[] = [];
  private encuestas: MockEncuesta[] = [];
  private currentUser: MockUsuario | null = null;

  constructor() {
    this.reset();
  }

  public reset() {
    this.usuarios = JSON.parse(JSON.stringify(USUARIOS_INICIALES));
    this.empresas = JSON.parse(JSON.stringify(EMPRESAS_INICIALES));
    this.reportes = JSON.parse(JSON.stringify(REPORTES_INICIALES));
    this.tareas = JSON.parse(JSON.stringify(TAREAS_INICIALES));
    this.herramientas = JSON.parse(JSON.stringify(HERRAMIENTAS_INICIALES));
    this.asignaciones = JSON.parse(JSON.stringify(ASIGNACIONES_INICIALES));
    this.encuestas = JSON.parse(JSON.stringify(ENCUESTAS_INICIALES));
    this.currentUser = this.usuarios[0];
  }

  // --- Auth / Sesión ---
  public setCurrentUser(user: MockUsuario | null) {
    this.currentUser = user;
  }

  public getCurrentUser(): MockUsuario {
    return this.currentUser || this.usuarios[0];
  }

  public getUserByEmail(email: string): MockUsuario | undefined {
    return this.usuarios.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());
  }

  public getUserById(id: number | string): MockUsuario | undefined {
    return this.usuarios.find(u => String(u.id) === String(id));
  }

  public loginAsRole(role: 'admin' | 'empleado' | 'cliente'): MockUsuario {
    const user = this.usuarios.find(u => u.rol === role) || this.usuarios[0];
    this.currentUser = user;
    return user;
  }

  // --- Usuarios ---
  public getUsuarios(): MockUsuario[] {
    return [...this.usuarios];
  }

  public updateUsuario(id: number | string, data: Partial<MockUsuario>): MockUsuario | undefined {
    const user = this.getUserById(id);
    if (user) {
      Object.assign(user, data);
    }
    return user;
  }

  public createUsuario(data: Partial<MockUsuario>): MockUsuario {
    const nextId = Math.max(0, ...this.usuarios.map(u => u.id)) + 1;
    const nuevo: MockUsuario = {
      id: nextId,
      nombre: data.nombre || 'Usuario',
      apellido: data.apellido || '',
      email: data.email || `usuario${nextId}@demo.com`,
      rol: data.rol || 'cliente',
      estado: data.estado || 'activo',
      empresa_id: data.empresa_id || null,
      empresa: data.empresa || 'Empresa Demo',
      telefono: data.telefono || '',
      ciudad: data.ciudad || 'Monterrey',
      created_at: new Date().toISOString(),
    };
    this.usuarios.unshift(nuevo);
    return nuevo;
  }

  public deleteUsuario(id: number | string): boolean {
    const idx = this.usuarios.findIndex(u => String(u.id) === String(id));
    if (idx !== -1) {
      this.usuarios.splice(idx, 1);
      return true;
    }
    return false;
  }

  // --- Empresas y Sucursales ---
  public getEmpresas(): MockEmpresa[] {
    return [...this.empresas];
  }

  public getEmpresaById(id: string): MockEmpresa | undefined {
    return this.empresas.find(e => String(e.id) === String(id));
  }

  public createEmpresa(nombre: string): MockEmpresa {
    const nextId = String(Date.now());
    const nueva: MockEmpresa = {
      id: nextId,
      nombre,
      logo_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200',
      sucursales_count: 0,
      created_at: new Date().toISOString(),
      sucursales: [],
    };
    this.empresas.unshift(nueva);
    return nueva;
  }

  public updateEmpresa(id: string, data: Partial<MockEmpresa>): MockEmpresa | undefined {
    const empresa = this.getEmpresaById(id);
    if (empresa) {
      Object.assign(empresa, data);
    }
    return empresa;
  }

  public deleteEmpresa(id: string): boolean {
    const idx = this.empresas.findIndex(e => String(e.id) === String(id));
    if (idx !== -1) {
      this.empresas.splice(idx, 1);
      return true;
    }
    return false;
  }

  public getSucursalesByEmpresa(empresaId: string): MockSucursal[] {
    const emp = this.getEmpresaById(empresaId);
    return emp ? emp.sucursales : [];
  }

  public createSucursal(empresaId: string, data: Partial<MockSucursal>): MockSucursal {
    const emp = this.getEmpresaById(empresaId);
    const nextId = String(Date.now());
    const nueva: MockSucursal = {
      id: nextId,
      empresa_id: empresaId,
      nombre: data.nombre || 'Nueva Sucursal',
      direccion: data.direccion || '',
      ciudad: data.ciudad || 'Monterrey',
      activo: data.activo ?? true,
      imagen_url: data.imagen_url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      equipos_count: 0,
      created_at: new Date().toISOString(),
      equipos: [],
    };
    if (emp) {
      emp.sucursales.push(nueva);
      emp.sucursales_count = emp.sucursales.length;
    }
    return nueva;
  }

  public getEquiposBySucursal(sucursalId: string): MockEquipo[] {
    for (const emp of this.empresas) {
      const suc = emp.sucursales.find(s => String(s.id) === String(sucursalId));
      if (suc) {
        return suc.equipos;
      }
    }
    return [];
  }

  public createEquipo(sucursalId: string, data: Partial<MockEquipo>): MockEquipo {
    const nextId = String(Date.now());
    const nuevo: MockEquipo = {
      id: nextId,
      sucursal_id: sucursalId,
      nombre: data.nombre || 'Nuevo Equipo',
      tipo: data.tipo || 'General',
      modelo: data.modelo || 'N/A',
      serie: data.serie || data.numero_serie || 'N/A',
      numero_serie: data.serie || data.numero_serie || 'N/A',
      imagen_url: data.imagen_url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',
      activo: true,
      created_at: new Date().toISOString(),
    };

    for (const emp of this.empresas) {
      const suc = emp.sucursales.find(s => String(s.id) === String(sucursalId));
      if (suc) {
        suc.equipos.push(nuevo);
        suc.equipos_count = suc.equipos.length;
        break;
      }
    }
    return nuevo;
  }

  // --- Reportes ---
  public getReportes(): MockReporte[] {
    return [...this.reportes];
  }

  public getReporteById(id: number | string): MockReporte | undefined {
    return this.reportes.find(r => String(r.id) === String(id));
  }

  public createReporte(datos: any): MockReporte {
    const nextId = Math.max(0, ...this.reportes.map(r => r.id)) + 1;
    const user = this.currentUser || this.usuarios[3]; // Mariana por defecto si no hay usuario

    let sucursalNombre = datos.sucursal || 'Sucursal Garza Sada';
    let equipoDescripcion = datos.equipo_descripcion || 'Equipo en revisión';
    let empresaNombre = user.empresa || 'Cadena Comercial OXXO';
    let empresaId = user.empresa_id || 1;

    const nuevo: MockReporte = {
      id: nextId,
      titulo: datos.titulo || `${equipoDescripcion} - ${sucursalNombre}`,
      descripcion: datos.descripcion || 'Sin descripción',
      estado: datos.estado || 'pendiente',
      prioridad: datos.prioridad || 'media',
      usuario_id: user.id,
      usuario_nombre: user.nombre,
      usuario_apellido: user.apellido,
      usuario_email: user.email,
      empresa_id: empresaId,
      empresa: empresaNombre,
      equipo_id: datos.equipo_id || null,
      equipo_descripcion: equipoDescripcion,
      sucursal: sucursalNombre,
      sucursal_id: datos.sucursal_id || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      empleado_asignado_id: null,
      empleado_asignado_nombre: null,
      empleado_asignado_email: null,
      archivos: [],
    };

    this.reportes.unshift(nuevo);
    return nuevo;
  }

  public updateReporte(id: number | string, data: any): MockReporte | undefined {
    const reporte = this.getReporteById(id);
    if (reporte) {
      Object.assign(reporte, data);
      reporte.updated_at = new Date().toISOString();
      if (data.estado === 'cerrado_por_cliente' && !reporte.cerrado_por_cliente_at) {
        reporte.cerrado_por_cliente_at = new Date().toISOString();
      }
    }
    return reporte;
  }

  public deleteReporte(id: number | string): boolean {
    const idx = this.reportes.findIndex(r => String(r.id) === String(id));
    if (idx !== -1) {
      this.reportes.splice(idx, 1);
      return true;
    }
    return false;
  }

  public addArchivoToReporte(reporteId: number | string, archivoData: any): MockArchivoReporte {
    const reporte = this.getReporteById(reporteId);
    const nextId = Date.now();
    const nuevoArchivo: MockArchivoReporte = {
      id: nextId,
      reporte_id: Number(reporteId),
      tipo_archivo: archivoData.tipo_archivo || 'foto',
      cloudflare_url: archivoData.cloudflare_url || archivoData.url || '',
      cloudflare_key: archivoData.cloudflare_key || archivoData.key || `key-${nextId}`,
      nombre_original: archivoData.nombre_original || 'archivo.jpg',
      tamaño: archivoData.tamaño || 100000,
      created_at: new Date().toISOString(),
    };

    if (reporte) {
      if (!reporte.archivos) reporte.archivos = [];
      reporte.archivos.push(nuevoArchivo);
    }
    return nuevoArchivo;
  }

  public getArchivosReporte(reporteId: number | string): MockArchivoReporte[] {
    const reporte = this.getReporteById(reporteId);
    return reporte ? (reporte.archivos || []) : [];
  }

  public deleteArchivoReporte(archivoId: number | string): boolean {
    for (const rep of this.reportes) {
      if (rep.archivos) {
        const idx = rep.archivos.findIndex(a => String(a.id) === String(archivoId));
        if (idx !== -1) {
          rep.archivos.splice(idx, 1);
          return true;
        }
      }
    }
    return false;
  }

  // --- Tareas ---
  public getTareas(): MockTarea[] {
    return [...this.tareas];
  }

  public getTareaById(id: number | string): MockTarea | undefined {
    return this.tareas.find(t => String(t.id) === String(id));
  }

  public createTarea(data: any): MockTarea {
    const nextId = Math.max(0, ...this.tareas.map(t => t.id)) + 1;
    const nueva: MockTarea = {
      id: nextId,
      titulo: data.titulo || (data.descripcion ? data.descripcion.slice(0, 50) : 'Nueva Tarea'),
      descripcion: data.descripcion || '',
      admin_email: data.admin_email || 'admin@ProMant.com',
      admin_nombre: data.admin_nombre || 'Roberto Sánchez',
      empleado_email: data.empleado_email || 'carlos.tecnico@ProMant.com',
      estado: data.estado || 'pendiente',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.tareas.unshift(nueva);
    return nueva;
  }

  public updateTarea(id: number | string, data: Partial<MockTarea>): MockTarea | undefined {
    const tarea = this.getTareaById(id);
    if (tarea) {
      Object.assign(tarea, data);
      tarea.updated_at = new Date().toISOString();
    }
    return tarea;
  }

  public deleteTarea(id: number | string): boolean {
    const idx = this.tareas.findIndex(t => String(t.id) === String(id));
    if (idx !== -1) {
      this.tareas.splice(idx, 1);
      return true;
    }
    return false;
  }

  // --- Inventario y Asignaciones ---
  public getHerramientas(): MockHerramienta[] {
    return [...this.herramientas];
  }

  public getAsignaciones(): MockAsignacion[] {
    return [...this.asignaciones];
  }

  public createHerramienta(data: Partial<MockHerramienta>): MockHerramienta {
    const nextId = Math.max(0, ...this.herramientas.map(h => h.id)) + 1;
    const nueva: MockHerramienta = {
      id: nextId,
      nombre: data.nombre || 'Herramienta Demo',
      descripcion: data.descripcion || '',
      estado: data.estado || 'disponible',
      usuario_id: null,
      empleado_nombre: null,
      asignacion_id: null,
    };
    this.herramientas.unshift(nueva);
    return nueva;
  }

  public asignarHerramienta(usuarioId: number, herramientaNombre: string): MockAsignacion {
    const user = this.getUserById(usuarioId);
    const herramienta = this.herramientas.find(h => h.nombre.toLowerCase() === herramientaNombre.toLowerCase()) || this.herramientas[0];
    const nextId = Math.max(0, ...this.asignaciones.map(a => a.id)) + 1;

    const nuevaAsignacion: MockAsignacion = {
      id: nextId,
      usuario_id: usuarioId,
      herramienta_id: herramienta ? herramienta.id : 1,
      herramienta_nombre: herramientaNombre,
      empleado_nombre: user ? `${user.nombre} ${user.apellido}`.trim() : 'Técnico',
      empleado_email: user ? user.email : 'carlos.tecnico@ProMant.com',
      estado: 'asignada',
      fecha_asignacion: new Date().toISOString().split('T')[0],
      cantidad: 1,
    };

    if (herramienta) {
      herramienta.estado = 'en_uso';
      herramienta.usuario_id = usuarioId;
      herramienta.empleado_nombre = nuevaAsignacion.empleado_nombre;
      herramienta.asignacion_id = nextId;
    }

    this.asignaciones.unshift(nuevaAsignacion);
    return nuevaAsignacion;
  }

  public desasignarHerramienta(asignacionId: number | string): boolean {
    const idx = this.asignaciones.findIndex(a => String(a.id) === String(asignacionId));
    if (idx !== -1) {
      const asig = this.asignaciones[idx];
      const herr = this.herramientas.find(h => h.id === asig.herramienta_id);
      if (herr) {
        herr.estado = 'disponible';
        herr.usuario_id = null;
        herr.empleado_nombre = null;
        herr.asignacion_id = null;
      }
      this.asignaciones.splice(idx, 1);
      return true;
    }
    return false;
  }

  public updateAsignacionEstado(asignacionId: number | string, nuevoEstado: 'devuelta' | 'perdida', obs?: string): boolean {
    const asig = this.asignaciones.find(a => String(a.id) === String(asignacionId));
    if (asig) {
      asig.estado = nuevoEstado;
      if (obs) asig.observaciones = obs;
      const herr = this.herramientas.find(h => h.id === asig.herramienta_id);
      if (herr) {
        herr.estado = nuevoEstado === 'devuelta' ? 'disponible' : 'mantenimiento';
        herr.usuario_id = null;
        herr.empleado_nombre = null;
      }
      return true;
    }
    return false;
  }

  // --- Encuestas ---
  public getEncuestas(): MockEncuesta[] {
    return [...this.encuestas];
  }

  public createEncuesta(data: any): MockEncuesta {
    const nextId = Math.max(0, ...this.encuestas.map(e => e.id)) + 1;
    const nueva: MockEncuesta = {
      id: nextId,
      reporte_id: Number(data.reporte_id),
      cliente_email: data.cliente_email || 'cliente@demo.com',
      cliente_nombre: data.cliente_nombre || 'Cliente Demo',
      empleado_email: data.empleado_email || 'carlos.tecnico@ProMant.com',
      empleado_nombre: data.empleado_nombre || 'Carlos Mendoza',
      empresa: data.empresa || 'Empresa Demo',
      trato_equipo: Number(data.trato_equipo) || 5,
      equipo_tecnico: Number(data.equipo_tecnico) || 5,
      personal_administrativo: Number(data.personal_administrativo) || 5,
      rapidez: Number(data.rapidez) || 5,
      costo_calidad: Number(data.costo_calidad) || 5,
      recomendacion: Number(data.recomendacion) || 5,
      satisfaccion: Number(data.satisfaccion) || 5,
      comentarios: data.comentarios || '',
      created_at: new Date().toISOString(),
    };
    this.encuestas.unshift(nueva);
    return nueva;
  }
}

// Instancia única (singleton) en memoria para la sesión activa
export const mockStore = new MockStore();
