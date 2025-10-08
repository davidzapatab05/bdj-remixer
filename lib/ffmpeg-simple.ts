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
  
  // Configuración ultra-simplificada
  const version = '0.12.6';
  const baseURL = `https://unpkg.com/@ffmpeg/core@${version}/dist/umd`;

  try {
    console.log('🔄 Cargando FFmpeg (configuración simplificada)...');
    
    // Solo los archivos esenciales, sin worker
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
