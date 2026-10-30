/**
 * Módulo de gestión de archivos e imágenes para Modo Demo / Caché Local
 * Se elimina la dependencia de Cloudflare R2 / S3. Las imágenes se manejan
 * en memoria local con URLs de archivo / base64 y se conservan durante la sesión.
 */

export interface UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

/**
 * Retorna la URL para mostrar en la interfaz.
 * En modo demo/caché local, simplemente retorna la URL original sin transformar a proxy externo.
 */
export function getProxyUrl(url: string): string {
  if (!url) return '';
  // Si ya es una URL HTTP o data: o blob: o local, la retornamos directamente
  return url;
}

/**
 * Simula la subida de un archivo a almacenamiento en modo local/caché.
 * Devuelve la URI local inmediatamente para previsualización instantánea.
 */
export async function uploadToCloudflare(
  fileUri: string,
  fileName: string,
  fileType: 'foto' | 'video' | 'pdf' | 'audio' | 'foto_revision'
): Promise<UploadResult> {
  try {
    console.log(`[MOCK-UPLOAD] Archivo procesado localmente en caché: ${fileName}`);
    const key = `demo-${Date.now()}-${(fileName || 'archivo').replace(/\s+/g, '-')}`;

    return {
      success: true,
      url: fileUri,
      key,
    };
  } catch (error: any) {
    console.error('[MOCK-UPLOAD] Error al procesar archivo local:', error);
    return {
      success: false,
      error: error.message || 'Error al procesar archivo en caché',
    };
  }
}

/**
 * Simula la eliminación de un archivo de caché.
 */
export async function deleteFromCloudflare(key: string): Promise<UploadResult> {
  console.log(`[MOCK-UPLOAD] Archivo eliminado de caché local: ${key}`);
  return {
    success: true,
  };
}
