import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api';

interface DashboardMetrics {
  totalUsers: number;
  totalInteractions: number;
  totalOpinions: number;
  todayInteractions: number;
  todayOpinions: number;
  cityLevelInteractions: number;
  neighborhoodLevelInteractions: number;
}

interface InteractionMetrics {
  total: number;
  cityLevel: number;
  neighborhoodLevel: number;
  today: number;
}

interface OpinionMetrics {
  total: number;
  today: number;
  averageRelevance: number;
}

interface TimeSeriesData {
  month: string;
  value: number;
  obras: number;
  problemas: number;
  fotos: number;
  resolucoes: number;
  detalhes: string;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface UrgentIssue {
  id: string;
  title: string;
  risco: string;
  mencoes: number;
  fotos: number;
  status: string;
  impacto: string;
}

export const useMetrics = () => {
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics>({
    totalUsers: 0,
    totalInteractions: 0,
    totalOpinions: 0,
    todayInteractions: 0,
    todayOpinions: 0,
    cityLevelInteractions: 0,
    neighborhoodLevelInteractions: 0,
  });

  const [interactionMetrics, setInteractionMetrics] = useState<InteractionMetrics>({
    total: 0,
    cityLevel: 0,
    neighborhoodLevel: 0,
    today: 0,
  });

  const [opinionMetrics, setOpinionMetrics] = useState<OpinionMetrics>({
    total: 0,
    today: 0,
    averageRelevance: 0,
  });

  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
  const [urgentIssues, setUrgentIssues] = useState<UrgentIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardMetrics = useCallback(async () => {
    try {
      const data = await apiService.getDashboardMetrics();
      setDashboardMetrics(data);
    } catch (err) {
      console.error('Erro ao carregar métricas do dashboard:', err);
      // Fallback com dados mock
      setDashboardMetrics({
        totalUsers: 1234,
        totalInteractions: 856,
        totalOpinions: 342,
        todayInteractions: 45,
        todayOpinions: 23,
        cityLevelInteractions: 512,
        neighborhoodLevelInteractions: 344,
      });
    }
  }, []);

  const loadInteractionMetrics = useCallback(async () => {
    try {
      const data = await apiService.getInteractionMetrics();
      setInteractionMetrics(data);
    } catch (err) {
      console.error('Erro ao carregar métricas de interações:', err);
      setInteractionMetrics({
        total: 856,
        cityLevel: 512,
        neighborhoodLevel: 344,
        today: 45,
      });
    }
  }, []);

  const loadOpinionMetrics = useCallback(async () => {
    try {
      const data = await apiService.getOpinionMetrics();
      setOpinionMetrics(data);
    } catch (err) {
      console.error('Erro ao carregar métricas de opiniões:', err);
      setOpinionMetrics({
        total: 342,
        today: 23,
        averageRelevance: 4.8,
      });
    }
  }, []);

  const loadTimeSeriesData = useCallback(async () => {
    try {
      const data = await apiService.getTimeSeriesMetrics('monthly');
      setTimeSeriesData(data);
    } catch (err) {
      console.error('Erro ao carregar dados de série temporal:', err);
      // Fallback com dados mock
      setTimeSeriesData([
        {
          month: 'Jan',
          value: 400,
          obras: 12,
          problemas: 45,
          fotos: 89,
          resolucoes: 38,
          detalhes: 'Foco em iluminação pública - 15 postes reparados'
        },
        {
          month: 'Fev',
          value: 600,
          obras: 18,
          problemas: 62,
          fotos: 124,
          resolucoes: 55,
          detalhes: 'Pavimentação Rua das Flores - 2km concluídos'
        },
        {
          month: 'Mar',
          value: 800,
          obras: 25,
          problemas: 78,
          fotos: 156,
          resolucoes: 71,
          detalhes: 'Limpeza urbana intensificada - 89% das vias'
        },
        {
          month: 'Abr',
          value: 950,
          obras: 31,
          problemas: 89,
          fotos: 189,
          resolucoes: 82,
          detalhes: 'Reforma da praça central - 95% concluída'
        },
        {
          month: 'Mai',
          value: 1100,
          obras: 28,
          problemas: 95,
          fotos: 201,
          resolucoes: 88,
          detalhes: 'Sistema de drenagem - 12 bocas de lobo desobstruídas'
        },
        {
          month: 'Jun',
          value: 1234,
          obras: 35,
          problemas: 102,
          fotos: 234,
          resolucoes: 94,
          detalhes: 'Sinalização viária - 45 placas instaladas'
        },
      ]);
    }
  }, []);

  const loadCategoriesData = useCallback(async () => {
    try {
      const data = await apiService.getCategoriesMetrics();
      setCategoriesData(data);
    } catch (err) {
      console.error('Erro ao carregar dados de categorias:', err);
      setCategoriesData([
        { name: 'Iluminação', value: 75, color: '#FBB13C' },
        { name: 'Pavimentação', value: 60, color: '#CFCFD1' },
        { name: 'Limpeza', value: 45, color: '#10B981' },
        { name: 'Segurança', value: 30, color: '#3B82F6' },
      ]);
    }
  }, []);

  const loadUrgentIssues = useCallback(async () => {
    try {
      const data = await apiService.getUrgentIssues();
      setUrgentIssues(data);
    } catch (err) {
      console.error('Erro ao carregar questões urgentes:', err);
      setUrgentIssues([
        {
          id: 'URG-001',
          title: 'Buraco na Av. Principal causa acidentes',
          risco: 'Alto',
          mencoes: 127,
          fotos: 23,
          status: 'Crítico',
          impacto: 'Trânsito e segurança'
        },
        {
          id: 'URG-002',
          title: 'Falta de iluminação no Parque Municipal',
          risco: 'Médio',
          mencoes: 89,
          fotos: 15,
          status: 'Urgente',
          impacto: 'Segurança pública'
        },
        {
          id: 'URG-003',
          title: 'Vazamento de água na Rua das Palmeiras',
          risco: 'Alto',
          mencoes: 156,
          fotos: 31,
          status: 'Crítico',
          impacto: 'Desperdício e infraestrutura'
        }
      ]);
    }
  }, []);

  const loadAllMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        loadDashboardMetrics(),
        loadInteractionMetrics(),
        loadOpinionMetrics(),
        loadTimeSeriesData(),
        loadCategoriesData(),
        loadUrgentIssues(),
      ]);
    } catch (err) {
      setError('Erro ao carregar métricas');
      console.error('Erro geral ao carregar métricas:', err);
    } finally {
      setLoading(false);
    }
  }, [
    loadDashboardMetrics,
    loadInteractionMetrics,
    loadOpinionMetrics,
    loadTimeSeriesData,
    loadCategoriesData,
    loadUrgentIssues,
  ]);

  useEffect(() => {
    loadAllMetrics();
  }, [loadAllMetrics]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      loadAllMetrics();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loadAllMetrics]);

  return {
    dashboardMetrics,
    interactionMetrics,
    opinionMetrics,
    timeSeriesData,
    categoriesData,
    urgentIssues,
    loading,
    error,
    refresh: loadAllMetrics,
    refreshDashboard: loadDashboardMetrics,
    refreshInteractions: loadInteractionMetrics,
    refreshOpinions: loadOpinionMetrics,
  };
};

export default useMetrics;