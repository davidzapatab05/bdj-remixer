'use client';

import { useEffect, useState } from 'react';
import { getFFmpeg, isFFmpegLoaded } from '@/lib/ffmpeg-simple';

interface FFmpegLoaderProps {
  children: (ffmpeg: any, loaded: boolean, error: string | null) => React.ReactNode;
}

export function FFmpegLoader({ children }: FFmpegLoaderProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ffmpeg, setFfmpeg] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    const loadFFmpeg = async () => {
      try {
        if (isFFmpegLoaded()) {
          const ffmpegInstance = await getFFmpeg();
          if (mounted) {
            setFfmpeg(ffmpegInstance);
            setLoaded(true);
          }
          return;
        }

        console.log('🔄 Cargando FFmpeg...');
        const ffmpegInstance = await getFFmpeg();
        
        if (mounted) {
          setFfmpeg(ffmpegInstance);
          setLoaded(true);
          console.log('✅ FFmpeg cargado exitosamente');
        }
      } catch (err) {
        console.error('❌ Error cargando FFmpeg:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      }
    };

    loadFFmpeg();

    return () => {
      mounted = false;
    };
  }, []);

  return <>{children(ffmpeg, loaded, error)}</>;
}
