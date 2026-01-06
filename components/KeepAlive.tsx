'use client';

import { useEffect } from 'react';

export default function KeepAlive() {
  useEffect(() => {
    // Función para hacer ping al servidor
    const pingServer = async () => {
      try {
        const response = await fetch('/api/health', {
          method: 'GET',
          cache: 'no-store'
        });
        
        if (response.ok) {
          console.log('✅ Keep-alive ping successful');
        }
      } catch (error) {
        console.warn('⚠️ Keep-alive ping failed:', error);
      }
    };

    // Hacer ping inicial después de 1 minuto de cargar la página
    const initialTimeout = setTimeout(() => {
      pingServer();
    }, 60000); // 1 minuto

    // Luego hacer ping cada 10 minutos
    const interval = setInterval(() => {
      pingServer();
    }, 600000); // 10 minutos

    // Limpiar interval al desmontar
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Este componente no renderiza nada
  return null;
}
