import { useState, useRef } from 'react';
import { getFFmpeg } from '@/lib/ffmpeg-simple';

interface UseAudioDemoReturn {
  generateDemo: (fileId: string, driveId?: string) => Promise<void>;
  isGenerating: boolean;
  progress: number;
  error: string | null;
}

export function useAudioDemo(): UseAudioDemoReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateDemo = async (fileId: string, driveId?: string) => {
    setIsGenerating(true);
    setProgress(0);
    setError(null);

    try {
      // Limpiar interval anterior si existe
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      // 1. Descargar archivo original (1% - 30%)
      setProgress(1);
      console.log('🎵 Iniciando descarga para fileId:', fileId);
      
      // Crear AbortController para timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos timeout
      
      // Progreso gradual durante la descarga
      let downloadProgress = 1;
      const downloadInterval = setInterval(() => {
        if (downloadProgress < 30) {
          downloadProgress += 1;
          setProgress(downloadProgress);
        }
      }, 100); // Cada 100ms incrementa 1%
      
      const response = await fetch(`/api/audio-demo?fileId=${fileId}${driveId ? `&driveId=${driveId}` : ''}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      clearInterval(downloadInterval);
      
      console.log('📡 Respuesta de la API:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error en la API:', errorText);
        throw new Error(`Error downloading file: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      console.log('📥 Descargando archivo...');
      const audioBuffer = await response.arrayBuffer();
      console.log('✅ Archivo descargado, tamaño:', audioBuffer.byteLength, 'bytes');
      
      const originalFilename = response.headers.get('X-Original-Filename') || `file_${fileId}`;
      console.log('📝 Nombre del archivo:', originalFilename);
      setProgress(30);

      // 2. Usar FFmpeg desde caché o inicializar (31% - 50%)
      let ffmpeg;
      
      // Progreso gradual durante la carga de FFmpeg
      let ffmpegProgress = 31;
      const ffmpegInterval = setInterval(() => {
        if (ffmpegProgress < 50) {
          ffmpegProgress += 1;
          setProgress(ffmpegProgress);
        }
      }, 150); // Cada 150ms incrementa 1%
      
      try {
        ffmpeg = await getFFmpeg();
        clearInterval(ffmpegInterval);
        setProgress(50);
      } catch (ffmpegError) {
        clearInterval(ffmpegInterval);
        console.error('❌ Error cargando FFmpeg:', ffmpegError);
        throw new Error('No se pudo cargar FFmpeg. Verifica tu conexión a internet e intenta nuevamente.');
      }

      // 3. Preparar archivo para procesamiento (51% - 60%)
      const inputFile = `input_${Date.now()}.mp3`; // Nombre único para evitar conflictos
      const outputFile = `output_${Date.now()}.mp3`;
      
      // Progreso gradual durante la preparación
      for (let i = 51; i <= 60; i++) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      await ffmpeg.writeFile(inputFile, new Uint8Array(audioBuffer));

      // 4. Procesar con FFmpeg - DEMO SEGURO (61% - 90%)
      const args = [
        '-i', inputFile,
        '-t', '60',                    // 🔒 Solo 60 segundos
        '-ss', '0',                    // Desde el inicio
        '-c:a', 'libmp3lame',         // Codec MP3
        '-b:a', '96k',                // 🔒 Bitrate bajo (96kbps)
        '-ar', '44100',               // Sample rate
        '-ac', '2',                   // Estéreo
        '-af', 'volume=0.3+0.5*sin(2*PI*t/4):eval=frame,afade=t=in:ss=0:d=5,afade=t=out:st=55:d=5,apad=pad_len=60',
        '-threads', '2',
        '-preset', 'ultrafast',
        outputFile
      ];

      // Progreso de 1% en 1% durante el procesamiento
      let currentProgress = 61;
      progressIntervalRef.current = setInterval(() => {
        if (currentProgress < 90) {
          currentProgress += 1;
          setProgress(currentProgress);
        }
      }, 300); // Cada 300ms incrementa 1%

      await ffmpeg.exec(args);
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setProgress(91);

      // 5. Leer archivo procesado (92% - 95%)
      for (let i = 92; i <= 95; i++) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const data = await ffmpeg.readFile(outputFile);
      const processedBuffer = Buffer.from(data);
      
      // 6. Descargar demo seguro (96% - 100%)
      for (let i = 96; i <= 100; i++) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      // 🔒 SEGURIDAD: Solo descargar el demo procesado
      const secureBlob = new Blob([processedBuffer], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(secureBlob);
      const a = document.createElement('a');
      
      // Crear nombre de archivo con el nombre original + "Demo"
      const baseName = originalFilename.replace(/\.[^/.]+$/, ''); // Remover extensión
      const demoFilename = `${baseName} - Demo.mp3`;
      
      a.href = url;
      a.download = demoFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('✅ Demo seguro descargado:', demoFilename);
      
    } catch (err) {
      console.error('Error in generateDemo:', err);
      
      let errorMessage = 'Unknown error';
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'La descarga tardó demasiado tiempo. Intenta con un archivo más pequeño.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setIsGenerating(false);
    }
  };

  return {
    generateDemo,
    isGenerating,
    progress,
    error
  };
}