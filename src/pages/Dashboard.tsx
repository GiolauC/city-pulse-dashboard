import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, BarChart3, TrendingUp, MapPin, Calendar, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useMetrics } from "@/hooks/useMetrics";

const Dashboard = () => {
  const { profile } = useAuth();
  const { 
    dashboardMetrics, 
    loading, 
    error, 
    refresh 
  } = useMetrics();
  
  const cityName = profile?.city_name || 'São Paulo';

  if (loading) {
    return <div className="flex justify-center items-center h-64">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard - {cityName}</h1>
          <p className="text-muted-foreground">
            Visão geral das interações e métricas municipais
          </p>
        </div>
        <div className="flex items-center gap-2">
          {error && (
            <span className="text-sm text-red-600">Erro ao carregar dados</span>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{dashboardMetrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Cidadãos cadastrados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interações Totais</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{dashboardMetrics.totalInteractions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Via WhatsApp
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opiniões Coletadas</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{dashboardMetrics.totalOpinions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Avaliações dos cidadãos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atividade Hoje</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {(dashboardMetrics.todayInteractions + dashboardMetrics.todayOpinions).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Interações + Opiniões
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Métricas por Localização */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Nível</CardTitle>
            <CardDescription>
              Interações organizadas por abrangência geográfica
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Nível Cidade</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {dashboardMetrics.cityLevelInteractions.toLocaleString()}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Nível Bairro</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {dashboardMetrics.neighborhoodLevelInteractions.toLocaleString()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Atividade Diária</CardTitle>
            <CardDescription>
              Interações e opiniões registradas hoje
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Interações Hoje</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {dashboardMetrics.todayInteractions.toLocaleString()}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Opiniões Hoje</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  {dashboardMetrics.todayOpinions.toLocaleString()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo Executivo */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Executivo</CardTitle>
          <CardDescription>
            Principais insights baseados nos dados coletados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Engajamento</h4>
              <p className="text-xs text-muted-foreground">
                {dashboardMetrics.totalUsers > 0 
                  ? `${Math.round((dashboardMetrics.totalInteractions / dashboardMetrics.totalUsers) * 100) / 100} interações por usuário em média`
                  : 'Aguardando dados de usuários'
                }
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Cobertura</h4>
              <p className="text-xs text-muted-foreground">
                {dashboardMetrics.cityLevelInteractions > dashboardMetrics.neighborhoodLevelInteractions
                  ? 'Maior engajamento em nível municipal'
                  : 'Maior engajamento em nível de bairro'
                }
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Tendência</h4>
              <p className="text-xs text-muted-foreground">
                {(dashboardMetrics.todayInteractions + dashboardMetrics.todayOpinions) > 0
                  ? 'Atividade registrada hoje'
                  : 'Aguardando novas interações'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;