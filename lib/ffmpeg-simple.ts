import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

// Cache global de FFmpeg
let ffmpegInstance: FFmpeg | null = null;
let ffmpegLoaded = false;

export async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpegLoaded && ffmpegInstance) {
    return ffmpegInstance;
  }

  // Crear nueva instancia
  const ffmpeg = new FFmpeg();

  // Configuración local para mayor confiabilidad
  const baseURL = '/ffmpeg';

  try {
    console.log('🔄 Cargando FFmpeg (recursos locales)...');

    // Carga desde el mismo servidor para evitar problemas de CORS y red
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    // Guardar en caché
    ffmpegInstance = ffmpeg;
    ffmpegLoaded = true;

    console.log('✅ FFmpeg cargado exitosamente');
    return ffmpeg;

  } catch (error) {
    console.error('❌ Error cargando FFmpeg:', error);
    throw new Error('No se pudo cargar FFmpeg. Verifica tu conexión a internet e intenta nuevamente.');
  }
}

export function isFFmpegLoaded(): boolean {
  return ffmpegLoaded && ffmpegInstance !== null;
}

export function clearFFmpegCache(): void {
  ffmpegInstance = null;
  ffmpegLoaded = false;
}
