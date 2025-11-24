import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { apiService } from '@/services/api';

interface ConnectionStatusProps {
  className?: string;
}

export const ConnectionStatus = ({ className = '' }: ConnectionStatusProps) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const healthy = await apiService.healthCheck();
      setIsConnected(healthy);
      setLastCheck(new Date());
    } catch (error) {
      setIsConnected(false);
      setLastCheck(new Date());
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusInfo = () => {
    if (isConnected === null) {
      return {
        icon: AlertCircle,
        text: 'Verificando...',
        variant: 'secondary' as const,
        color: 'text-gray-600'
      };
    }
    
    if (isConnected) {
      return {
        icon: Wifi,
        text: 'Conectado',
        variant: 'default' as const,
        color: 'text-green-600'
      };
    }
    
    return {
      icon: WifiOff,
      text: 'Desconectado',
      variant: 'destructive' as const,
      color: 'text-red-600'
    };
  };

  const { icon: StatusIcon, text, variant, color } = getStatusInfo();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge variant={variant} className="flex items-center gap-1">
        <StatusIcon className="h-3 w-3" />
        {text}
      </Badge>
      
      {lastCheck && (
        <span className="text-xs text-muted-foreground">
          {lastCheck.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      )}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={checkConnection}
        disabled={isChecking}
        className="h-6 w-6 p-0"
      >
        <RefreshCw className={`h-3 w-3 ${isChecking ? 'animate-spin' : ''}`} />
      </Button>
      
      {!isConnected && isConnected !== null && (
        <div className="text-xs text-red-600">
          Verifique se o backend está rodando
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;