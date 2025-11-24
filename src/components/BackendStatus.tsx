import { useBackendStatus } from '@/hooks/useBackendStatus';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Server, AlertCircle } from 'lucide-react';

export const BackendStatus = () => {
  const { isConnected, isLoading, error, checkConnection } = useBackendStatus();

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg border bg-card">
      <Server className="h-4 w-4" />
      <span className="text-sm font-medium">Backend:</span>
      
      {isLoading ? (
        <Badge variant="secondary">
          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          Verificando...
        </Badge>
      ) : isConnected ? (
        <Badge variant="default" className="bg-green-500">
          Conectado
        </Badge>
      ) : (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Desconectado
        </Badge>
      )}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={checkConnection}
        disabled={isLoading}
      >
        <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
      </Button>
      
      {error && (
        <span className="text-xs text-muted-foreground max-w-[200px] truncate">
          {error}
        </span>
      )}
    </div>
  );
};