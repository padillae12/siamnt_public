import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockStore, MockUsuario } from './mock-data';

// URL simbólica para modo Demo local
const API_URL = 'https://mantpro-demo.local/api';

export const getApiBaseUrl = () => API_URL;

export interface ApiResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
  token?: string;
  user?: any;
  message?: string;
  reporteId?: number;
  tareaId?: number;
  [key: string]: any;
}

/**
 * Enrutador de llamadas Mock en memoria.
 * Responde instantáneamente a cualquier petición HTTP de la app sin requerir backend ni MySQL.
 */
export async function apiCall<T = any>(
  endpoint: string,
  methodOrOptions: 'GET' | 'POST' | 'PUT' | 'DELETE' | { method?: string; body?: any } = 'GET',
  bodyPayload?: any
): Promise<ApiResponse<T>> {
  try {
    let method: string = 'GET';
    let body: any = null;

    if (typeof methodOrOptions === 'object' && methodOrOptions !== null) {
      method = (methodOrOptions.method || 'GET').toUpperCase();
      body = methodOrOptions.body
        ? typeof methodOrOptions.body === 'string'
          ? JSON.parse(methodOrOptions.body)
          : methodOrOptions.body
        : null;
    } else {
      method = (methodOrOptions || 'GET').toUpperCase();
      body = bodyPayload
        ? typeof bodyPayload === 'string'
          ? JSON.parse(bodyPayload)
          : bodyPayload
        : null;
    }

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    console.log(`[MOCK-API] ${method} ${cleanEndpoint}`);

    // ====================================================
    // 1. AUTENTICACIÓN
    // ====================================================
    if (cleanEndpoint.startsWith('/auth/login')) {
      const email = body?.email || '';
      const user = mockStore.getUserByEmail(email) || mockStore.getUsuarios()[0];
      mockStore.setCurrentUser(user);
      return {
        success: true,
        token: `mock-token-${user.id}-${Date.now()}`,
        user: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          rol: user.rol,
          estado: user.estado,
          empresa: user.empresa,
        },
      } as any;
    }

    if (cleanEndpoint.startsWith('/auth/me')) {
      const currentUser = mockStore.getCurrentUser();
      return {
        success: true,
        user: currentUser,
      } as any;
    }

    if (cleanEndpoint.startsWith('/auth/change-password')) {
      return {
        success: true,
        message: 'Contraseña actualizada exitosamente (Modo Demo)',
      } as any;
    }

    // ====================================================
    // 2. REPORTES
    // ====================================================
    // Archivos de reporte (eliminar)
    if (cleanEndpoint.startsWith('/reportes/archivos/') && method === 'DELETE') {
      const fileId = cleanEndpoint.split('/reportes/archivos/')[1];
      mockStore.deleteArchivoReporte(fileId);
      return { success: true } as any;
    }

    // Guardar archivo en reporte
    if (cleanEndpoint === '/reportes/archivos' && method === 'POST') {
      const archivo = mockStore.addArchivoToReporte(body?.reporte_id, body);
      return { success: true, data: archivo } as any;
    }

    // Encuestas
    if (cleanEndpoint === '/reportes/encuestas/guardar' && method === 'POST') {
      const encuesta = mockStore.createEncuesta(body);
      return { success: true, data: encuesta } as any;
    }

    if (cleanEndpoint === '/reportes/encuestas/todas') {
      return { success: true, data: mockStore.getEncuestas() } as any;
    }

    if (cleanEndpoint.startsWith('/reportes/encuestas/reporte/')) {
      const repId = cleanEndpoint.split('/reportes/encuestas/reporte/')[1];
      const found = mockStore.getEncuestas().filter(e => String(e.reporte_id) === String(repId));
      return { success: true, data: found } as any;
    }

    if (cleanEndpoint.startsWith('/reportes/encuestas/cliente/')) {
      const email = decodeURIComponent(cleanEndpoint.split('/reportes/encuestas/cliente/')[1]);
      const found = mockStore.getEncuestas().filter(e => e.cliente_email.toLowerCase() === email.toLowerCase());
      return { success: true, data: found } as any;
    }

    if (cleanEndpoint.startsWith('/reportes/encuestas/empleado/')) {
      const email = decodeURIComponent(cleanEndpoint.split('/reportes/encuestas/empleado/')[1]);
      const found = mockStore.getEncuestas().filter(e => e.empleado_email.toLowerCase() === email.toLowerCase());
      return { success: true, data: found } as any;
    }

    // Cotizaciones
    if (cleanEndpoint.includes('/cotizacion') && method === 'POST') {
      const repId = cleanEndpoint.split('/reportes/')[1].split('/')[0];
      const updated = mockStore.updateReporte(repId, {
        analisis_general: body?.analisis_general,
        precio_cotizacion: body?.precio_cotizacion,
        estado: 'con_cotizacion',
      });
      return { success: true, data: updated } as any;
    }

    if (cleanEndpoint.startsWith('/reportes/cotizaciones/cliente/')) {
      const email = decodeURIComponent(cleanEndpoint.split('/reportes/cotizaciones/cliente/')[1]);
      const reps = mockStore.getReportes().filter(r => r.precio_cotizacion && r.precio_cotizacion > 0);
      return { success: true, data: reps } as any;
    }

    // Archivos de un reporte
    if (cleanEndpoint.match(/\/reportes\/[^\/]+\/archivos/) && method === 'GET') {
      const repId = cleanEndpoint.split('/reportes/')[1].split('/')[0];
      const files = mockStore.getArchivosReporte(repId);
      return { success: true, data: files } as any;
    }

    // Asignar reporte a técnico
    if (cleanEndpoint.match(/\/reportes\/[^\/]+\/asignar/) && method === 'PUT') {
      const repId = cleanEndpoint.split('/reportes/')[1].split('/')[0];
      const empId = body?.empleado_id;
      const emp = mockStore.getUserById(empId);
      const updated = mockStore.updateReporte(repId, {
        empleado_asignado_id: empId,
        empleado_asignado_nombre: emp ? `${emp.nombre} ${emp.apellido}`.trim() : 'Carlos Mendoza',
        empleado_asignado_email: emp ? emp.email : 'carlos.mendoza@mantpro.com',
        estado: 'asignado',
      });
      return { success: true, data: updated } as any;
    }

    // Rechazar asignación
    if (cleanEndpoint.match(/\/reportes\/[^\/]+\/rechazar-asignacion/) && method === 'PUT') {
      const repId = cleanEndpoint.split('/reportes/')[1].split('/')[0];
      const updated = mockStore.updateReporte(repId, {
        empleado_asignado_id: null,
        empleado_asignado_nombre: null,
        empleado_asignado_email: null,
        estado: 'pendiente',
        motivo_cancelacion: body?.motivo || 'Asignación rechazada por técnico',
      });
      return { success: true, data: updated } as any;
    }

    // Actualizar estado / fase 2
    if (cleanEndpoint.match(/\/reportes\/[^\/]+\/estado/) && method === 'PUT') {
      const repId = cleanEndpoint.split('/reportes/')[1].split('/')[0];
      const updated = mockStore.updateReporte(repId, body);
      return { success: true, data: updated } as any;
    }

    // Filtros de reportes
    if (cleanEndpoint.startsWith('/reportes/empleado')) {
      const allReps = mockStore.getReportes();
      const currentUser = mockStore.getCurrentUser();
      const filtered = allReps.filter(
        r => r.empleado_asignado_email === currentUser.email || r.empleado_asignado_id === currentUser.id || !r.empleado_asignado_id
      );
      return { success: true, data: filtered.length > 0 ? filtered : allReps } as any;
    }

    if (cleanEndpoint.startsWith('/reportes/cliente')) {
      const allReps = mockStore.getReportes();
      return { success: true, data: allReps } as any;
    }

    if (cleanEndpoint.startsWith('/reportes/por-usuario/')) {
      const allReps = mockStore.getReportes();
      return { success: true, data: allReps } as any;
    }

    // Operaciones CRUD de Reportes
    if (cleanEndpoint === '/reportes' || cleanEndpoint === '/reportes/todos/admin/list') {
      if (method === 'GET') {
        return { success: true, data: mockStore.getReportes() } as any;
      }
      if (method === 'POST') {
        const nuevo = mockStore.createReporte(body);
        return { success: true, data: nuevo, id: nuevo.id, reporteId: nuevo.id } as any;
      }
    }

    if (cleanEndpoint.startsWith('/reportes/')) {
      const repId = cleanEndpoint.split('/reportes/')[1];
      if (method === 'GET') {
        const rep = mockStore.getReporteById(repId);
        return { success: true, data: rep } as any;
      }
      if (method === 'PUT') {
        const updated = mockStore.updateReporte(repId, body);
        return { success: true, data: updated } as any;
      }
      if (method === 'DELETE') {
        mockStore.deleteReporte(repId);
        return { success: true } as any;
      }
    }

    // ====================================================
    // 3. TAREAS
    // ====================================================
    if (cleanEndpoint === '/tareas/crear' && method === 'POST') {
      const nueva = mockStore.createTarea(body);
      return { success: true, data: nueva, tareaId: nueva.id } as any;
    }

    if (cleanEndpoint.startsWith('/tareas/empleado-email/')) {
      const email = decodeURIComponent(cleanEndpoint.split('/tareas/empleado-email/')[1]);
      const tasks = mockStore.getTareas().filter(t => t.empleado_email.toLowerCase() === email.toLowerCase());
      return { success: true, data: tasks } as any;
    }

    if (cleanEndpoint.match(/\/tareas\/[^\/]+\/estado/) && method === 'PUT') {
      const id = cleanEndpoint.split('/tareas/')[1].split('/')[0];
      const updated = mockStore.updateTarea(id, { estado: body?.estado });
      return { success: true, data: updated } as any;
    }

    if (cleanEndpoint === '/tareas' || cleanEndpoint === '/tareas/todas') {
      return { success: true, data: mockStore.getTareas() } as any;
    }

    if (cleanEndpoint.startsWith('/tareas/')) {
      const id = cleanEndpoint.split('/tareas/')[1];
      if (method === 'DELETE') {
        mockStore.deleteTarea(id);
        return { success: true } as any;
      }
      if (method === 'PUT') {
        const updated = mockStore.updateTarea(id, body);
        return { success: true, data: updated } as any;
      }
    }

    // ====================================================
    // 4. INVENTARIO
    // ====================================================
    if (cleanEndpoint === '/inventario/herramientas') {
      if (method === 'GET') {
        return { success: true, data: mockStore.getHerramientas() } as any;
      }
      if (method === 'POST') {
        const nueva = mockStore.createHerramienta(body);
        return { success: true, data: nueva } as any;
      }
    }

    if (cleanEndpoint === '/inventario/asignaciones') {
      return { success: true, data: mockStore.getAsignaciones() } as any;
    }

    if (cleanEndpoint === '/inventario/asignar' || cleanEndpoint === '/inventario/asignar-manual') {
      const asig = mockStore.asignarHerramienta(body?.usuario_id || 2, body?.herramienta_nombre || 'Herramienta');
      return { success: true, data: asig } as any;
    }

    if (cleanEndpoint.startsWith('/inventario/asignaciones/') && method === 'DELETE') {
      const id = cleanEndpoint.split('/inventario/asignaciones/')[1];
      mockStore.desasignarHerramienta(id);
      return { success: true } as any;
    }

    if (cleanEndpoint.includes('/devuelta') && method === 'PUT') {
      const id = cleanEndpoint.split('/asignaciones/')[1].split('/')[0];
      mockStore.updateAsignacionEstado(id, 'devuelta', body?.observaciones);
      return { success: true } as any;
    }

    if (cleanEndpoint.includes('/perdida') && method === 'PUT') {
      const id = cleanEndpoint.split('/asignaciones/')[1].split('/')[0];
      mockStore.updateAsignacionEstado(id, 'perdida', body?.observaciones);
      return { success: true } as any;
    }

    if (cleanEndpoint.startsWith('/inventario/empleado/')) {
      return { success: true, data: mockStore.getAsignaciones() } as any;
    }

    // ====================================================
    // 5. EMPRESAS, SUCURSALES Y EQUIPOS
    // ====================================================
    if (cleanEndpoint === '/empresas') {
      if (method === 'GET') {
        return { success: true, data: mockStore.getEmpresas() } as any;
      }
      if (method === 'POST') {
        const nueva = mockStore.createEmpresa(body?.nombre || 'Nueva Empresa');
        return { success: true, data: nueva } as any;
      }
    }

    if (cleanEndpoint === '/empresas/crear' && method === 'POST') {
      const sucursal = mockStore.createSucursal(body?.empresa_id || '1', body);
      return { success: true, data: sucursal } as any;
    }

    if (cleanEndpoint.startsWith('/empresas/empresa/')) {
      const empId = cleanEndpoint.split('/empresas/empresa/')[1];
      return { success: true, data: mockStore.getSucursalesByEmpresa(empId) } as any;
    }

    if (cleanEndpoint.match(/\/empresas\/sucursal\/[^\/]+\/equipos/)) {
      const sucId = cleanEndpoint.split('/empresas/sucursal/')[1].split('/')[0];
      if (method === 'GET') {
        return { success: true, data: mockStore.getEquiposBySucursal(sucId) } as any;
      }
      if (method === 'POST') {
        const equipo = mockStore.createEquipo(sucId, body);
        return { success: true, data: equipo } as any;
      }
    }

    if (cleanEndpoint.startsWith('/empresas/equipos/') && cleanEndpoint.includes('/historial')) {
      return { success: true, data: mockStore.getReportes() } as any;
    }

    if (cleanEndpoint.startsWith('/empresas/equipos/')) {
      return { success: true } as any;
    }

    if (cleanEndpoint.startsWith('/empresas/')) {
      const empId = cleanEndpoint.split('/empresas/')[1];
      if (method === 'PUT') {
        const updated = mockStore.updateEmpresa(empId, body);
        return { success: true, data: updated } as any;
      }
      if (method === 'DELETE') {
        mockStore.deleteEmpresa(empId);
        return { success: true } as any;
      }
    }

    // ====================================================
    // 6. USUARIOS
    // ====================================================
    if (cleanEndpoint.startsWith('/usuarios/sucursales')) {
      const emp = mockStore.getEmpresas()[0];
      return { success: true, data: emp ? emp.sucursales : [] } as any;
    }

    if (cleanEndpoint === '/usuarios') {
      if (method === 'GET') {
        return { success: true, data: mockStore.getUsuarios() } as any;
      }
      if (method === 'POST') {
        const nuevo = mockStore.createUsuario(body);
        return { success: true, data: nuevo } as any;
      }
    }

    if (cleanEndpoint.startsWith('/usuarios/')) {
      const userId = cleanEndpoint.split('/usuarios/')[1].split('/')[0];
      if (cleanEndpoint.includes('/role')) {
        const updated = mockStore.updateUsuario(userId, { rol: body?.rol });
        return { success: true, data: updated } as any;
      }
      if (cleanEndpoint.includes('/status')) {
        const updated = mockStore.updateUsuario(userId, { estado: body?.estado });
        return { success: true, data: updated } as any;
      }
      if (method === 'GET') {
        return { success: true, data: mockStore.getUserById(userId) } as any;
      }
      if (method === 'PUT') {
        const updated = mockStore.updateUsuario(userId, body);
        return { success: true, data: updated } as any;
      }
      if (method === 'DELETE') {
        mockStore.deleteUsuario(userId);
        return { success: true } as any;
      }
    }

    // Default fallback
    return { success: true, data: [] } as any;
  } catch (error: any) {
    console.error(`[MOCK-API] Error en ${endpoint}:`, error);
    return {
      success: false,
      error: error.message || 'Error en la solicitud local',
    };
  }
}

// ==================== FUNCIONES DE AUTENTICACIÓN ====================

export async function loginBackend(email: string, contraseña?: string) {
  const result = await apiCall('/auth/login', 'POST', { email, contraseña });

  if (result.success && result.token) {
    await AsyncStorage.setItem('token', result.token);
    await AsyncStorage.setItem('user', JSON.stringify(result.user));
  }

  return result;
}

export async function loginAsRole(role: 'admin' | 'empleado' | 'cliente') {
  const user = mockStore.loginAsRole(role);
  const token = `mock-token-${role}-${Date.now()}`;
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('user', JSON.stringify(user));
  return { success: true, token, user };
}

export async function registerBackend(datos: any) {
  return apiCall('/auth/register', 'POST', datos);
}

export async function getCurrentUser() {
  return apiCall('/auth/me', 'GET');
}

export async function logoutBackend() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
  return { success: true };
}

// ==================== FUNCIONES DE REPORTES ====================

export async function obtenerReportesBackend() {
  return apiCall('/reportes', 'GET');
}

export async function crearReporteBackend(datos: any) {
  return apiCall('/reportes', 'POST', datos);
}

export async function actualizarReporteBackend(id: string, datos: any) {
  return apiCall(`/reportes/${id}`, 'PUT', datos);
}

export async function eliminarReporteBackend(id: string) {
  return apiCall(`/reportes/${id}`, 'DELETE');
}

export async function asignarReporteAEmpleadoBackend(reporteId: string, empleadoId: string) {
  return apiCall(`/reportes/${reporteId}/asignar`, 'PUT', { empleado_id: empleadoId });
}

export async function rechazarAsignacionBackend(reporteId: string, motivo: string) {
  return apiCall(`/reportes/${reporteId}/rechazar-asignacion`, 'PUT', { motivo });
}

export async function obtenerArchivosReporteBackend(reporteId: string) {
  return apiCall(`/reportes/${reporteId}/archivos`, 'GET');
}

export async function obtenerReportesAsignados(empleadoEmail: string) {
  return apiCall(`/reportes/empleado?email=${encodeURIComponent(empleadoEmail)}`, 'GET');
}

export async function actualizarEstadoReporteAsignado(
  reporteId: string,
  nuevoEstado: string,
  descripcionTrabajo?: string,
  precioCotizacion?: number,
  moneda?: string,
  fase2Data?: any
) {
  const datos: any = { estado: nuevoEstado };
  if (descripcionTrabajo) datos.descripcionTrabajo = descripcionTrabajo;
  if (precioCotizacion) datos.precioCotizacion = precioCotizacion;
  if (moneda) datos.moneda = moneda;

  if (fase2Data) {
    if (fase2Data.revision) datos.revision = fase2Data.revision;
    if (fase2Data.recomendaciones) datos.recomendaciones = fase2Data.recomendaciones;
    if (fase2Data.reparacion) datos.reparacion = fase2Data.reparacion;
    if (fase2Data.recomendaciones_adicionales) datos.recomendaciones_adicionales = fase2Data.recomendaciones_adicionales;
    if (fase2Data.materiales_refacciones) datos.materiales_refacciones = fase2Data.materiales_refacciones;
  }

  return apiCall(`/reportes/${reporteId}/estado`, 'PUT', datos);
}

export async function obtenerReportesCliente(clienteEmail: string) {
  return apiCall(`/reportes/cliente?email=${encodeURIComponent(clienteEmail)}`, 'GET');
}

// ==================== FUNCIONES DE TAREAS ====================

export async function obtenerTareasBackend() {
  return apiCall('/tareas', 'GET');
}

export async function obtenerTareasEmpleadoBackend(empleadoId: string) {
  return apiCall(`/tareas/empleado-email/${empleadoId}`, 'GET');
}

export async function crearTareaBackend(datos: any) {
  return apiCall('/tareas/crear', 'POST', datos);
}

export async function actualizarEstadoTareaBackend(id: string, estado: string) {
  return apiCall(`/tareas/${id}/estado`, 'PUT', { estado });
}

export async function eliminarTareaBackend(id: string) {
  return apiCall(`/tareas/${id}`, 'DELETE');
}

// ==================== FUNCIONES DE INVENTARIO ====================

export async function obtenerHerramientasBackend() {
  return apiCall('/inventario/herramientas', 'GET');
}

export async function crearHerramientaBackend(datos: any) {
  return apiCall('/inventario/herramientas', 'POST', datos);
}

export async function obtenerAsignacionesBackend() {
  return apiCall('/inventario/asignaciones', 'GET');
}

export async function asignarHerramientaBackend(usuario_id: number, herramienta_nombre: string) {
  return apiCall('/inventario/asignar', 'POST', { usuario_id, herramienta_nombre });
}

export async function desasignarHerramientaBackend(asignacionId: string) {
  return apiCall(`/inventario/asignaciones/${asignacionId}`, 'DELETE');
}

export async function obtenerInventarioEmpleadoBackend(empleadoId: string) {
  return apiCall(`/inventario/empleado/${empleadoId}`, 'GET');
}

export async function asignarHerramientaAEmpleadoManualBackend(datos: any) {
  return apiCall('/inventario/asignar-manual', 'POST', datos);
}

export async function marcarHerramientaComoDevueltaBackend(asignacionId: string, observaciones?: string) {
  return apiCall(`/inventario/asignaciones/${asignacionId}/devuelta`, 'PUT', { observaciones });
}

export async function marcarHerramientaComoPerdidaBackend(asignacionId: string, observaciones?: string) {
  return apiCall(`/inventario/asignaciones/${asignacionId}/perdida`, 'PUT', { observaciones });
}

export async function editarAsignacionBackend(asignacionId: string, datos: { herramienta_nombre?: string; cantidad?: number; observaciones?: string }) {
  return apiCall(`/inventario/asignaciones/${asignacionId}`, 'PUT', datos);
}

// ==================== FUNCIONES DE USUARIOS ====================

export async function obtenerUsuariosBackend() {
  return apiCall('/usuarios', 'GET');
}

export async function obtenerUsuarioBackend(id: string) {
  return apiCall(`/usuarios/${id}`, 'GET');
}

export async function actualizarUsuarioBackend(id: string, datos: any) {
  return apiCall(`/usuarios/${id}`, 'PUT', datos);
}

export async function cambiarRolUsuarioBackend(id: string, rol: string) {
  return apiCall(`/usuarios/${id}/role`, 'PUT', { rol });
}

export async function cambiarEstadoUsuarioBackend(id: string, estado: string) {
  return apiCall(`/usuarios/${id}/status`, 'PUT', { estado });
}

export async function eliminarUsuarioBackend(id: string) {
  return apiCall(`/usuarios/${id}`, 'DELETE');
}

// ==================== SUCURSALES Y ENCUESTAS ====================

export async function obtenerSucursalesCliente(email: string) {
  return apiCall(`/usuarios/sucursales?email=${encodeURIComponent(email)}`, 'GET');
}

export async function verificarEncuestaExiste(reporteId: string) {
  return apiCall(`/reportes/encuestas/reporte/${reporteId}`, 'GET');
}
