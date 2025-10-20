'use client';

import { useEffect } from 'react';

export default function SwRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        if (reg && reg.update) {
          // Intento de actualización al cargar
          reg.update().catch(() => {});
        }
      } catch (_) {
        // Silenciar errores de registro para no afectar UX
      }
    };

    register();
  }, []);

  return null;
}


