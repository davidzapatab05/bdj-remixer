import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

// Cache global de FFmpeg para reutilizar entre descargas
let ffmpegInstance: FFmpeg | null = null;
let ffmpegLoaded = false;

export async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpegLoaded && ffmpegInstance) {
    return ffmpegInstance;
  }

  // Crear nueva instancia
  const ffmpeg = new FFmpeg();
  
  // Configuración compatible con Next.js y Turbopack
  const version = '0.12.6';
  
  // Intentar múltiples CDNs para mayor confiabilidad
  const cdnUrls = [
    `https://unpkg.com/@ffmpeg/core@${version}/dist/umd`,
    `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${version}/dist/umd`,
    `https://cdn.skypack.dev/@ffmpeg/core@${version}/dist/umd`
  ];

  let loadConfig: Record<string, string> = {};
  let lastError: Error | null = null;

  // Intentar cargar desde diferentes CDNs con timeout
  for (const baseURL of cdnUrls) {
    try {
      console.log(`🔄 Intentando cargar FFmpeg desde: ${baseURL}`);
      
      // Crear promesas con timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 15000)
      );
      
      const loadPromise = (async () => {
        loadConfig = {
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        };

         // NO cargar el worker - causa problemas con Turbopack
         console.log('ℹ️ Usando worker por defecto de FFmpeg (sin workerURL)');

        await ffmpeg.load(loadConfig);
        console.log('✅ FFmpeg cargado exitosamente');
      })();

      await Promise.race([loadPromise, timeoutPromise]);
      break; // Si llegamos aquí, la carga fue exitosa
      
    } catch (error) {
      console.warn(`❌ Error cargando desde ${baseURL}:`, error);
      lastError = error as Error;
      continue; // Intentar el siguiente CDN
    }
  }

  // Si todos los CDNs fallaron, lanzar el último error
  if (!loadConfig.coreURL) {
    throw lastError || new Error('No se pudo cargar FFmpeg desde ningún CDN');
  }

  // Guardar en caché
  ffmpegInstance = ffmpeg;
  ffmpegLoaded = true;
  
  return ffmpeg;
}

export function isFFmpegLoaded(): boolean {
  return ffmpegLoaded && ffmpegInstance !== null;
}

export function clearFFmpegCache(): void {
  ffmpegInstance = null;
  ffmpegLoaded = false;
}
