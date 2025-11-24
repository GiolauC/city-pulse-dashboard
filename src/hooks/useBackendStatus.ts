import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

export const useBackendStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkConnection = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const status = await apiService.healthCheck();
      setIsConnected(status);
    } catch (err) {
      setIsConnected(false);
      setError(err instanceof Error ? err.message : 'Erro de conexão');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    isConnected,
    isLoading,
    error,
    checkConnection
  };
};