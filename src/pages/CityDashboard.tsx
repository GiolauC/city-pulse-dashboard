import { useState, useEffect } from 'react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Users, MessageSquare, CheckCircle2, Star, Download, Eye, FileText, ExternalLink, Image, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { apiService } from '@/services/api';
import { useMetrics } from '@/hooks/useMetrics';

const interactionsData = [
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
];

const categoriesData = [
  { name: 'Iluminação', value: 75, color: '#FBB13C' },
  { name: 'Pavimentação', value: 60, color: '#CFCFD1' },
  { name: 'Limpeza', value: 45, color: '#10B981' },
  { name: 'Segurança', value: 30, color: '#3B82F6' },
];

const businessData = {
  empresasAtivas: 2847,
  crescimentoMensal: 8.5,
  consultasLegais: 156,
  licencasEmitidas: 89,
  tempoMedioLicenca: '12 dias',
  empresasPublicas: 23,
  empresasPrivadas: 2824,
  setoresPrincipais: [
    { nome: 'Comércio', quantidade: 1245, crescimento: 12 },
    { nome: 'Serviços', quantidade: 892, crescimento: 15 },
    { nome: 'Indústria', quantidade: 456, crescimento: 5 },
    { nome: 'Tecnologia', quantidade: 254, crescimento: 28 }
  ],
  demandasEmpresas: [
    { tipo: 'Licenças e Alvarás', quantidade: 89, urgencia: 'Alta' },
    { tipo: 'Questões Tributárias', quantidade: 67, urgencia: 'Média' },
    { tipo: 'Regulamentações', quantidade: 45, urgencia: 'Média' },
    { tipo: 'Infraestrutura', quantidade: 34, urgencia: 'Alta' }
  ]
};

const demographicData = {
  totalPopulacao: 45678,
  faixasEtarias: [
    { 
      faixa: '0-17 anos', 
      quantidade: 8234, 
      percentual: 18, 
      principais_demandas: ['Educação', 'Saúde infantil', 'Espaços recreativos'],
      prioridades: ['Creches', 'Escolas', 'Parques infantis'],
      buscas_mais_frequentes: ['Vagas em creches', 'Pediatras', 'Atividades esportivas'],
      horarios_pico_interacao: ['07:00-09:00', '17:00-19:00'],
      canais_preferidos: ['WhatsApp dos pais', 'Presencial', 'Telefone'],
      satisfacao_servicos: 7.2,
      tempo_resposta_esperado: '24 horas'
    },
    { 
      faixa: '18-29 anos', 
      quantidade: 12456, 
      percentual: 27, 
      principais_demandas: ['Emprego', 'Capacitação', 'Transporte'],
      prioridades: ['Cursos profissionalizantes', 'Empreendedorismo', 'Mobilidade urbana'],
      buscas_mais_frequentes: ['Oportunidades de emprego', 'Cursos gratuitos', 'Licenças para negócios'],
      horarios_pico_interacao: ['08:00-10:00', '20:00-22:00'],
      canais_preferidos: ['App móvel', 'Redes sociais', 'Site'],
      satisfacao_servicos: 6.8,
      tempo_resposta_esperado: '2 horas'
    },
    { 
      faixa: '30-49 anos', 
      quantidade: 15234, 
      percentual: 33, 
      principais_demandas: ['Moradia', 'Saúde', 'Segurança'],
      prioridades: ['Habitação popular', 'UBS', 'Policiamento'],
      buscas_mais_frequentes: ['Programas habitacionais', 'Consultas médicas', 'Segurança escolar'],
      horarios_pico_interacao: ['12:00-14:00', '18:00-20:00'],
      canais_preferidos: ['Presencial', 'WhatsApp', 'Telefone'],
      satisfacao_servicos: 7.5,
      tempo_resposta_esperado: '4 horas'
    },
    { 
      faixa: '50-64 anos', 
      quantidade: 7123, 
      percentual: 16, 
      principais_demandas: ['Saúde', 'Trabalho', 'Lazer'],
      prioridades: ['Especialidades médicas', 'Recolocação profissional', 'Centros culturais'],
      buscas_mais_frequentes: ['Especialistas', 'Programas para 50+', 'Atividades culturais'],
      horarios_pico_interacao: ['09:00-11:00', '14:00-16:00'],
      canais_preferidos: ['Presencial', 'Telefone', 'WhatsApp'],
      satisfacao_servicos: 8.1,
      tempo_resposta_esperado: '1 dia'
    },
    { 
      faixa: '65+ anos', 
      quantidade: 2631, 
      percentual: 6, 
      principais_demandas: ['Saúde', 'Acessibilidade', 'Assistência social'],
      prioridades: ['Geriatria', 'Rampas de acesso', 'Centro do idoso'],
      buscas_mais_frequentes: ['Consultas geriátricas', 'Benefícios sociais', 'Transporte adaptado'],
      horarios_pico_interacao: ['08:00-10:00', '14:00-16:00'],
      canais_preferidos: ['Presencial', 'Telefone', 'Acompanhante'],
      satisfacao_servicos: 8.7,
      tempo_resposta_esperado: '1 dia'
    }
  ],
  demandasPorIdade: [
    { tipo: 'Educação Infantil', faixa: '0-17', urgencia: 'Alta', quantidade: 89 },
    { tipo: 'Primeiro Emprego', faixa: '18-29', urgencia: 'Alta', quantidade: 156 },
    { tipo: 'Habitação Popular', faixa: '30-49', urgencia: 'Crítica', quantidade: 234 },
    { tipo: 'Saúde Preventiva', faixa: '50-64', urgencia: 'Média', quantidade: 78 },
    { tipo: 'Cuidados Geriátricos', faixa: '65+', urgencia: 'Alta', quantidade: 45 }
  ],
  insights_comportamentais: {
    tendencias_gerais: [
      'Jovens preferem canais digitais e respostas rápidas',
      'Adultos valorizam atendimento presencial e qualidade',
      'Idosos precisam de mais tempo e suporte personalizado'
    ],
    recomendacoes_gestao: [
      'Implementar chatbot para jovens (18-29 anos)',
      'Ampliar horários de atendimento presencial',
      'Criar programa de acompanhamento para idosos',
      'Desenvolver app com foco em famílias (30-49 anos)'
    ]
  }
};

const urgentIssues = [
  { 
    id: 'URG-001', 
    title: 'Buraco na Av. Principal causa acidentes', 
    risco: 'Alto', 
    mencoes: 127,
    fotos: 23,
    status: 'Crítico',
    impacto: 'Trânsito e segurança',
    imagens: [
      { id: 1, url: '/placeholder.svg', descricao: 'Buraco de aproximadamente 2m de diâmetro', data: '2024-01-15' },
      { id: 2, url: '/placeholder.svg', descricao: 'Veículo danificado pelo buraco', data: '2024-01-16' },
      { id: 3, url: '/placeholder.svg', descricao: 'Sinalização temporária instalada', data: '2024-01-17' }
    ],
    coordenadas: '-23.5505, -46.6333',
    orgaoResponsavel: 'Secretaria de Obras e Infraestrutura'
  },
  { 
    id: 'URG-002', 
    title: 'Falta de iluminação no Parque Municipal', 
    risco: 'Médio', 
    mencoes: 89,
    fotos: 15,
    status: 'Urgente',
    impacto: 'Segurança pública',
    imagens: [
      { id: 1, url: '/placeholder.svg', descricao: 'Trilha escura sem iluminação', data: '2024-01-12' },
      { id: 2, url: '/placeholder.svg', descricao: 'Postes antigos danificados', data: '2024-01-13' }
    ],
    coordenadas: '-23.5489, -46.6388',
    orgaoResponsavel: 'Secretaria de Serviços Urbanos'
  },
  { 
    id: 'URG-003', 
    title: 'Vazamento de água na Rua das Palmeiras', 
    risco: 'Alto', 
    mencoes: 156,
    fotos: 31,
    status: 'Crítico',
    impacto: 'Desperdício e infraestrutura',
    imagens: [
      { id: 1, url: '/placeholder.svg', descricao: 'Vazamento na calçada', data: '2024-01-10' },
      { id: 2, url: '/placeholder.svg', descricao: 'Alagamento na rua', data: '2024-01-11' },
      { id: 3, url: '/placeholder.svg', descricao: 'Danos no asfalto', data: '2024-01-14' }
    ],
    coordenadas: '-23.5512, -46.6298',
    orgaoResponsavel: 'Companhia de Saneamento'
  },
  {
    id: 'URG-004',
    title: 'Demora na emissão de alvarás prejudica abertura de empresas',
    risco: 'Médio',
    mencoes: 78,
    fotos: 12,
    status: 'Urgente',
    impacto: 'Desenvolvimento econômico',
    imagens: [
      { id: 1, url: '/placeholder.svg', descricao: 'Fila de empreendedores na prefeitura', data: '2024-01-18' },
      { id: 2, url: '/placeholder.svg', descricao: 'Documentos acumulados para análise', data: '2024-01-19' }
    ],
    coordenadas: '-23.5501, -46.6320',
    orgaoResponsavel: 'Secretaria de Desenvolvimento Econômico'
  },
  {
    id: 'URG-005',
    title: 'Falta de orientação jurídica para pequenas empresas',
    risco: 'Médio',
    mencoes: 92,
    fotos: 8,
    status: 'Urgente',
    impacto: 'Conformidade legal e crescimento',
    imagens: [
      { id: 1, url: '/placeholder.svg', descricao: 'Reunião com empresarios locais', data: '2024-01-20' }
    ],
    coordenadas: '-23.5495, -46.6310',
    orgaoResponsavel: 'Procuradoria Geral do Município'
  },
];

const neighborhoods = [
  { id: 'all', name: 'Todos os Bairros' },
  { id: 'centro', name: 'Centro' },
  { id: 'jardim-flores', name: 'Jardim das Flores' },
  { id: 'vila-nova', name: 'Vila Nova' },
  { id: 'jardim-cantanduva', name: 'Jardim Cantanduva' },
  { id: 'vila-esperanca', name: 'Vila Esperança' },
  { id: 'parque-industrial', name: 'Parque Industrial' }
];

const neighborhoodData = {
  'centro': {
    cidadaosAtivos: 342,
    interacoes: 245,
    demandasResolvidas: 45,
    avaliacaoMedia: 4.9,
    principaisProblemas: ['Trânsito', 'Ruído', 'Limpeza'],
    empresasAtivas: 892
  },
  'jardim-flores': {
    cidadaosAtivos: 289,
    interacoes: 198,
    demandasResolvidas: 38,
    avaliacaoMedia: 4.7,
    principaisProblemas: ['Iluminação', 'Pavimentação', 'Segurança'],
    empresasAtivas: 234
  },
  'vila-nova': {
    cidadaosAtivos: 234,
    interacoes: 167,
    demandasResolvidas: 29,
    avaliacaoMedia: 4.6,
    principaisProblemas: ['Saneamento', 'Transporte', 'Saúde'],
    empresasAtivas: 156
  },
  'jardim-cantanduva': {
    cidadaosAtivos: 156,
    interacoes: 112,
    demandasResolvidas: 18,
    avaliacaoMedia: 4.8,
    principaisProblemas: ['Educação', 'Lazer', 'Meio ambiente'],
    empresasAtivas: 89
  },
  'vila-esperanca': {
    cidadaosAtivos: 123,
    interacoes: 89,
    demandasResolvidas: 15,
    avaliacaoMedia: 4.5,
    principaisProblemas: ['Habitação', 'Emprego', 'Infraestrutura'],
    empresasAtivas: 67
  },
  'parque-industrial': {
    cidadaosAtivos: 90,
    interacoes: 45,
    demandasResolvidas: 12,
    avaliacaoMedia: 4.4,
    principaisProblemas: ['Poluição', 'Trânsito pesado', 'Segurança'],
    empresasAtivas: 1409
  }
};

export default function CityDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [contextData, setContextData] = useState(null);
  
  const { 
    dashboardMetrics, 
    timeSeriesData, 
    categoriesData, 
    urgentIssues, 
    loading 
  } = useMetrics();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Buscando dados da API...');
        const [contextData, interactionsData, opinionsData] = await Promise.all([
          apiService.getContext(),
          apiService.getUserInteractions(),
          apiService.getOpinions()
        ]);
        console.log('✅ Dados recebidos:', { contextData, interactionsData, opinionsData });
        setContextData({ contextData, interactionsData, opinionsData });
      } catch (error) {
        console.error('❌ Erro ao buscar dados:', error);
        setContextData({ contextData: [], interactionsData: [], opinionsData: [] });
      }
    };
    fetchData();
  }, []);

  const getFilteredData = () => {
    if (selectedNeighborhood === 'all') {
      return {
        cidadaosAtivos: 1234,
        interacoes: 856,
        demandasResolvidas: 142,
        avaliacaoMedia: 4.8,
        empresasAtivas: businessData.empresasAtivas
      };
    }
    return {
      ...neighborhoodData[selectedNeighborhood],
      empresasAtivas: neighborhoodData[selectedNeighborhood].empresasAtivas
    };
  };

  const filteredData = getFilteredData();
  const selectedNeighborhoodName = neighborhoods.find(n => n.id === selectedNeighborhood)?.name || 'Todos os Bairros';

  const generatePDFReport = () => {
    const reportData = {
      title: 'Relatório Municipal - City Pulse Dashboard',
      date: new Date().toLocaleDateString('pt-BR'),
      metrics: {
        cidadaosAtivos: '1,234 (+12%)',
        interacoes: '856 (+18%)',
        demandasResolvidas: '142 (+8%)',
        avaliacaoMedia: '4.8 (+0.3)'
      },
      categorias: categoriesData,
      questoesUrgentes: urgentIssues,
      atividade: interactionsData
    };
    
    // Simular geração de PDF
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-municipal-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateIssuePDF = (issue) => {
    const issueReport = {
      titulo: `Relatório de Questão Urgente - ${issue.id}`,
      data: new Date().toLocaleDateString('pt-BR'),
      questao: issue.title,
      status: issue.status,
      risco: issue.risco,
      orgaoResponsavel: issue.orgaoResponsavel,
      coordenadas: issue.coordenadas,
      estatisticas: {
        mencoes: issue.mencoes,
        fotos: issue.fotos,
        impacto: issue.impacto
      },
      imagens: issue.imagens,
      recomendacoes: 'Documento oficial para encaminhamento aos órgãos competentes'
    };
    
    const blob = new Blob([JSON.stringify(issueReport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `questao-urgente-${issue.id}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openActivityDetails = () => {
    window.open('/activity-details', '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-foreground mb-2">Painel da Cidade</h1>
          <p className="text-muted-foreground text-sm">Acompanhe os principais indicadores</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por bairro" />
              </SelectTrigger>
              <SelectContent>
                {neighborhoods.map((neighborhood) => (
                  <SelectItem key={neighborhood.id} value={neighborhood.id}>
                    {neighborhood.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generatePDFReport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <div className="p-4 rounded-lg border border-border/50 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-semibold text-foreground">{demographicData.totalPopulacao.toLocaleString()}</div>
                <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">+2.1%</div>
              </div>
              <div className="text-sm text-muted-foreground">População total</div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Detalhes - Demografia por Idade</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-5 gap-4">
                {demographicData.faixasEtarias.map((faixa) => (
                  <div key={faixa.faixa} className="p-3 bg-blue-50 rounded text-center">
                    <div className="text-lg font-semibold">{faixa.quantidade.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{faixa.faixa}</div>
                    <div className="text-xs text-blue-600">{faixa.percentual}%</div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Análise Comportamental por Faixa Etária:</h4>
                {demographicData.faixasEtarias.map((faixa) => (
                  <div key={faixa.faixa} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-medium">{faixa.faixa} ({faixa.quantidade.toLocaleString()} pessoas)</h5>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{faixa.percentual}% da pop.</span>
                        <span className="text-sm font-medium text-green-600">Satisfação: {faixa.satisfacao_servicos}/10</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground font-medium">Buscas mais frequentes:</span>
                        <ul className="list-disc list-inside text-xs mt-1">
                          {faixa.buscas_mais_frequentes.map((busca, idx) => (
                            <li key={idx}>{busca}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-medium">Canais preferidos:</span>
                        <ul className="list-disc list-inside text-xs mt-1">
                          {faixa.canais_preferidos.map((canal, idx) => (
                            <li key={idx}>{canal}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-medium">Horários de pico:</span>
                        <ul className="list-disc list-inside text-xs mt-1">
                          {faixa.horarios_pico_interacao.map((horario, idx) => (
                            <li key={idx}>{horario}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded">
                      <span>Tempo de resposta esperado: <strong>{faixa.tempo_resposta_esperado}</strong></span>
                      <span>Principais demandas: <strong>{faixa.principais_demandas.join(', ')}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Insights para Tomada de Decisão:</h4>
                <div className="bg-blue-50 p-3 rounded">
                  <h5 className="font-medium text-sm mb-2">Tendências Comportamentais:</h5>
                  <ul className="text-xs space-y-1">
                    {demographicData.insights_comportamentais.tendencias_gerais.map((tendencia, idx) => (
                      <li key={idx}>• {tendencia}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <h5 className="font-medium text-sm mb-2">Recomendações de Gestão:</h5>
                  <ul className="text-xs space-y-1">
                    {demographicData.insights_comportamentais.recomendacoes_gestao.map((recomendacao, idx) => (
                      <li key={idx}>• {recomendacao}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Demandas Urgentes por Idade:</h4>
                {demographicData.demandasPorIdade.map((demanda) => (
                  <div key={demanda.tipo} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium text-sm">{demanda.tipo}</span>
                      <span className="text-xs text-muted-foreground ml-2">({demanda.faixa} anos)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{demanda.quantidade} casos</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        demanda.urgencia === 'Crítica' ? 'bg-red-100 text-red-700' :
                        demanda.urgencia === 'Alta' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {demanda.urgencia}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <div className="p-4 rounded-lg border border-border/50 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-semibold text-foreground">{businessData.empresasAtivas}</div>
                <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+{businessData.crescimentoMensal}%</div>
              </div>
              <div className="text-sm text-muted-foreground">Empresas ativas</div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Detalhes - Empresas Ativas</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="text-lg font-semibold">{businessData.empresasAtivas}</div>
                  <div className="text-sm text-muted-foreground">Total ativas</div>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <div className="text-lg font-semibold">{businessData.empresasPrivadas}</div>
                  <div className="text-sm text-muted-foreground">Empresas privadas</div>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <div className="text-lg font-semibold">{businessData.empresasPublicas}</div>
                  <div className="text-sm text-muted-foreground">Empresas públicas</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Setores Principais:</h4>
                {businessData.setoresPrincipais.map((setor) => (
                  <div key={setor.nome} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{setor.nome}</span>
                      <div className="text-sm text-muted-foreground">{setor.quantidade} empresas</div>
                    </div>
                    <div className="text-sm text-green-600">+{setor.crescimento}%</div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Principais Demandas Empresariais:</h4>
                {businessData.demandasEmpresas.map((demanda) => (
                  <div key={demanda.tipo} className="flex justify-between items-center">
                    <span className="text-sm">{demanda.tipo}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{demanda.quantidade} solicitações</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        demanda.urgencia === 'Alta' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {demanda.urgencia}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <div className="p-4 rounded-lg border border-border/50 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-semibold text-foreground">{filteredData.cidadaosAtivos.toLocaleString()}</div>
                <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+12%</div>
              </div>
              <div className="text-sm text-muted-foreground">Cidadãos ativos{selectedNeighborhood !== 'all' ? ` - ${selectedNeighborhoodName}` : ''}</div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes - Cidadãos Ativos</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="text-lg font-semibold">1,234</div>
                  <div className="text-sm text-muted-foreground">Total atual</div>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <div className="text-lg font-semibold">+132</div>
                  <div className="text-sm text-muted-foreground">Novos este mês</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Distribuição por bairro:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>Centro</span><span>342 usuários</span></div>
                  <div className="flex justify-between"><span>Jardim das Flores</span><span>289 usuários</span></div>
                  <div className="flex justify-between"><span>Vila Nova</span><span>234 usuários</span></div>
                  <div className="flex justify-between"><span>Outros</span><span>369 usuários</span></div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Dados atualizados em tempo real. Crescimento de 12% comparado ao mês anterior.
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <div className="p-4 rounded-lg border border-border/50 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-semibold text-foreground">{filteredData.interacoes}</div>
                <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+18%</div>
              </div>
              <div className="text-sm text-muted-foreground">Interações este mês{selectedNeighborhood !== 'all' ? ` - ${selectedNeighborhoodName}` : ''}</div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes - Interações</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="text-lg font-semibold">456</div>
                  <div className="text-sm text-muted-foreground">Reportes</div>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <div className="text-lg font-semibold">234</div>
                  <div className="text-sm text-muted-foreground">Avaliações</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded">
                  <div className="text-lg font-semibold">166</div>
                  <div className="text-sm text-muted-foreground">Sugestões</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Tipos de interação mais comuns:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>Problemas de infraestrutura</span><span>45%</span></div>
                  <div className="flex justify-between"><span>Serviços públicos</span><span>28%</span></div>
                  <div className="flex justify-between"><span>Segurança</span><span>18%</span></div>
                  <div className="flex justify-between"><span>Outros</span><span>9%</span></div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <div className="p-4 rounded-lg border border-border/50 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-semibold text-foreground">{filteredData.demandasResolvidas}</div>
                <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+8%</div>
              </div>
              <div className="text-sm text-muted-foreground">Demandas resolvidas{selectedNeighborhood !== 'all' ? ` - ${selectedNeighborhoodName}` : ''}</div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes - Demandas Resolvidas</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 rounded">
                  <div className="text-lg font-semibold">142</div>
                  <div className="text-sm text-muted-foreground">Resolvidas</div>
                </div>
                <div className="p-3 bg-orange-50 rounded">
                  <div className="text-lg font-semibold">38</div>
                  <div className="text-sm text-muted-foreground">Em andamento</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Tempo médio de resolução:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>Iluminação</span><span>3.2 dias</span></div>
                  <div className="flex justify-between"><span>Limpeza urbana</span><span>1.8 dias</span></div>
                  <div className="flex justify-between"><span>Pavimentação</span><span>12.5 dias</span></div>
                  <div className="flex justify-between"><span>Segurança</span><span>5.7 dias</span></div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <div className="p-4 rounded-lg border border-border/50 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-semibold text-foreground">{filteredData.avaliacaoMedia}</div>
                <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+0.3</div>
              </div>
              <div className="text-sm text-muted-foreground">Avaliação média{selectedNeighborhood !== 'all' ? ` - ${selectedNeighborhoodName}` : ''}</div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes - Avaliação dos Serviços</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-2">
                {[5,4,3,2,1].map(star => (
                  <div key={star} className="p-2 bg-gray-50 rounded text-center">
                    <div className="font-semibold">{star === 5 ? '67%' : star === 4 ? '23%' : star === 3 ? '7%' : star === 2 ? '2%' : '1%'}</div>
                    <div className="text-xs">{star} estrela{star > 1 ? 's' : ''}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Avaliação por categoria:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>Atendimento</span><span>4.9/5</span></div>
                  <div className="flex justify-between"><span>Tempo de resposta</span><span>4.7/5</span></div>
                  <div className="flex justify-between"><span>Qualidade da solução</span><span>4.8/5</span></div>
                  <div className="flex justify-between"><span>Comunicação</span><span>4.6/5</span></div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {selectedNeighborhood !== 'all' && (
        <div className="p-6 rounded-lg border border-border/50 bg-blue-50/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-lg">Detalhes do Bairro: {selectedNeighborhoodName}</h3>
            <div className="text-sm text-muted-foreground">Dados específicos da região</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium mb-2">Principais Problemas</h4>
              <div className="space-y-1">
                {neighborhoodData[selectedNeighborhood]?.principaisProblemas.map((problema, index) => (
                  <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    {problema}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium mb-2">Empresas Ativas</h4>
              <div className="text-2xl font-semibold text-green-600">
                {neighborhoodData[selectedNeighborhood]?.empresasAtivas}
              </div>
              <div className="text-sm text-muted-foreground">Estabelecimentos registrados</div>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium mb-2">Engajamento</h4>
              <div className="text-2xl font-semibold text-blue-600">
                {Math.round((filteredData.interacoes / filteredData.cidadaosAtivos) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Taxa de participação</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Atividade dos últimos meses</h3>
            <Button onClick={openActivityDetails} size="sm" variant="outline" className="flex items-center gap-2">
              <ExternalLink className="h-3 w-3" />
              Ver Detalhes
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={interactionsData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis hide />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border rounded-lg shadow-lg text-xs">
                        <p className="font-medium mb-2">{label} - {data.value} interações</p>
                        <div className="space-y-1 text-muted-foreground">
                          <p>• {data.obras} obras iniciadas</p>
                          <p>• {data.problemas} problemas reportados</p>
                          <p>• {data.fotos} fotos enviadas</p>
                          <p>• {data.resolucoes} resoluções</p>
                          <p className="text-foreground font-medium mt-2">{data.detalhes}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <div className="p-6 rounded-lg border border-border/50 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Principais categorias</h3>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm text-blue-900">Iluminação</span>
                  <span className="text-sm text-blue-700">75% das mencoes</span>
                </div>
                <p className="text-xs text-blue-700">Categoria mais comentada. Principais reclamações sobre lâmpadas queimadas e postes com defeito no centro da cidade.</p>
              </div>
              
              <div className="space-y-3">
                {categoriesData.slice(1).map((category) => (
                  <div key={category.name} className="flex justify-between items-center">
                    <span className="text-sm">{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Detalhes das Categorias</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {categoriesData.map((category) => (
                <div key={category.name} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">{category.name}</h4>
                    <span className="text-lg font-semibold">{category.value}%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Menções este mês:</span>
                      <div className="font-semibold">{Math.floor(category.value * 8.5)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tempo médio resolução:</span>
                      <div className="font-semibold">
                        {category.name === 'Iluminação' && '3.2 dias'}
                        {category.name === 'Pavimentação' && '12.5 dias'}
                        {category.name === 'Limpeza' && '1.8 dias'}
                        {category.name === 'Segurança' && '5.7 dias'}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Taxa de resolução:</span>
                      <div className="font-semibold">
                        {category.name === 'Iluminação' && '89%'}
                        {category.name === 'Pavimentação' && '67%'}
                        {category.name === 'Limpeza' && '94%'}
                        {category.name === 'Segurança' && '78%'}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {category.name === 'Iluminação' && 'Principais problemas: lâmpadas queimadas (45%), postes danificados (30%), falta de iluminação (25%)'}
                    {category.name === 'Pavimentação' && 'Principais problemas: buracos (60%), rachaduras (25%), desnivel (15%)'}
                    {category.name === 'Limpeza' && 'Principais problemas: lixo acumulado (50%), entulho (30%), poda necessária (20%)'}
                    {category.name === 'Segurança' && 'Principais problemas: falta de policiamento (40%), iluminação deficiente (35%), vandalismo (25%)'}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border border-border/50">
          <h3 className="font-medium mb-2">Políticas por Idade</h3>
          <p className="text-xs text-muted-foreground mb-4">Ações direcionadas por faixa etária</p>
          
          <div className="space-y-3">
            <div className="p-2 bg-green-50 rounded">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Jovens (18-29)</span>
                <span className="text-xs text-green-700">27% pop.</span>
              </div>
              <p className="text-xs text-muted-foreground">156 demandas de emprego</p>
            </div>
            
            <div className="p-2 bg-blue-50 rounded">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Adultos (30-49)</span>
                <span className="text-xs text-blue-700">33% pop.</span>
              </div>
              <p className="text-xs text-muted-foreground">234 demandas de habitação</p>
            </div>
            
            <div className="p-2 bg-purple-50 rounded">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Idosos (65+)</span>
                <span className="text-xs text-purple-700">6% pop.</span>
              </div>
              <p className="text-xs text-muted-foreground">45 demandas de saúde</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2 text-sm">Ações Prioritárias:</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• Programa Jovem Aprendiz (18-29 anos)</p>
              <p>• Minha Casa Minha Vida (30-49 anos)</p>
              <p>• Centro de Convivência do Idoso (65+)</p>
              <p>• Creches e pré-escolas (0-17 anos)</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border border-border/50">
          <h3 className="font-medium mb-2">Apoio Empresarial</h3>
          <p className="text-xs text-muted-foreground mb-4">Suporte à gestão e desenvolvimento de negócios</p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded">
                <div className="text-lg font-semibold">{businessData.consultasLegais}</div>
                <div className="text-sm text-muted-foreground">Consultas legais</div>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <div className="text-lg font-semibold">{businessData.licencasEmitidas}</div>
                <div className="text-sm text-muted-foreground">Licenças emitidas</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Tempo médio para licenças:</span>
                <span className="font-semibold">{businessData.tempoMedioLicenca}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Empresas públicas vs privadas:</span>
                <span className="font-semibold">{businessData.empresasPublicas}/{businessData.empresasPrivadas}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2 text-sm">Ações de Apoio:</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>• Simplificação de processos burocráticos</p>
                <p>• Orientação jurídica especializada</p>
                <p>• Aceleração de licenças e alvarás</p>
                <p>• Suporte para startups e PMEs</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border border-border/50">
          <h3 className="font-medium mb-2">Questões Urgentes</h3>
          <p className="text-xs text-muted-foreground mb-4">Identificadas por IA com base em frequência e impacto</p>
          <div className="space-y-3">
            {urgentIssues.map((issue) => (
              <Dialog key={issue.id}>
                <DialogTrigger asChild>
                  <div className="py-3 border-b border-border/30 last:border-0 cursor-pointer hover:bg-gray-100 rounded px-2 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium text-sm">{issue.title}</div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        issue.status === 'Crítico' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {issue.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{issue.mencoes} menções</span>
                      <span>{issue.fotos} fotos</span>
                      <span>Risco: {issue.risco}</span>
                      <Eye className="h-3 w-3 ml-auto" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Impacto: {issue.impacto}</div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center justify-between pr-8">
                      <DialogTitle className="flex-1 pr-4">{issue.title}</DialogTitle>
                      <Button onClick={() => generateIssuePDF(issue)} size="sm" className="flex items-center gap-2 flex-shrink-0">
                        <Download className="h-4 w-4" />
                        Gerar PDF
                      </Button>
                    </div>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-3 bg-red-50 rounded">
                        <div className="text-lg font-semibold">{issue.mencoes}</div>
                        <div className="text-sm text-muted-foreground">Menções</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded">
                        <div className="text-lg font-semibold">{issue.fotos}</div>
                        <div className="text-sm text-muted-foreground">Fotos enviadas</div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded">
                        <div className="text-lg font-semibold">{issue.risco}</div>
                        <div className="text-sm text-muted-foreground">Nível de risco</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded">
                        <div className="text-lg font-semibold">72h</div>
                        <div className="text-sm text-muted-foreground">Tempo estimado</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Image className="h-4 w-4" />
                            Galeria de Imagens ({issue.imagens.length})
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {issue.imagens.map((img) => (
                              <div key={img.id} className="border rounded-lg overflow-hidden">
                                <img src={img.url} alt={img.descricao} className="w-full h-24 object-cover" />
                                <div className="p-2">
                                  <p className="text-xs text-muted-foreground">{img.descricao}</p>
                                  <p className="text-xs text-muted-foreground">{img.data}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Informações Técnicas:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Coordenadas:</span>
                              <span className="font-mono">{issue.coordenadas}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Órgão Responsável:</span>
                              <span>{issue.orgaoResponsavel}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>ID da Questão:</span>
                              <span className="font-mono">{issue.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Análise da IA:</h4>
                          <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                            {issue.id === 'URG-001' && 'Problema identificado como crítico devido ao alto número de menções e potencial para acidentes. Recomenda-se ação imediata para evitar danos maiores e responsabilidade civil.'}
                            {issue.id === 'URG-002' && 'Questão de segurança pública com impacto na qualidade de vida. Frequência de menções indica preocupação crescente da população.'}
                            {issue.id === 'URG-003' && 'Desperdício de recursos públicos identificado. Alto volume de menções sugere problema visível e persistente que afeta a percepção da gestão.'}
                            {issue.id === 'URG-004' && 'Gargalo burocrático impactando o ambiente de negócios. Demora na emissão de alvarás pode desencorajar novos investimentos e prejudicar o crescimento econômico local.'}
                            {issue.id === 'URG-005' && 'Lacuna no suporte jurídico para pequenos empreendedores. Falta de orientação pode resultar em não conformidade legal e limitar o crescimento empresarial.'}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Localização mais mencionada:</h4>
                          <p className="text-sm">
                            {issue.id === 'URG-001' && 'Av. Principal, altura do número 1250 - próximo ao mercado central'}
                            {issue.id === 'URG-002' && 'Entrada principal do Parque Municipal - trilha dos eucaliptos'}
                            {issue.id === 'URG-003' && 'Rua das Palmeiras, esquina com Rua das Acácias'}
                            {issue.id === 'URG-004' && 'Secretaria de Desenvolvimento Econômico - Centro Administrativo'}
                            {issue.id === 'URG-005' && 'Associação Comercial Local - Rua do Comércio, 456'}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Ações recomendadas:</h4>
                          <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                            {issue.id === 'URG-001' && (
                              <>
                                <li>Sinalização temporária de alerta</li>
                                <li>Reparo emergencial em 24h</li>
                                <li>Comunicação à população sobre cronograma</li>
                              </>
                            )}
                            {issue.id === 'URG-002' && (
                              <>
                                <li>Instalação de iluminação LED</li>
                                <li>Reforço do patrulhamento noturno</li>
                                <li>Campanha de conscientização sobre segurança</li>
                              </>
                            )}
                            {issue.id === 'URG-003' && (
                              <>
                                <li>Reparo imediato do vazamento</li>
                                <li>Inspeção da rede na região</li>
                                <li>Monitoramento preventivo</li>
                              </>
                            )}
                            {issue.id === 'URG-004' && (
                              <>
                                <li>Digitalização do processo de alvarás</li>
                                <li>Capacitação da equipe técnica</li>
                                <li>Implementação de prazos máximos</li>
                              </>
                            )}
                            {issue.id === 'URG-005' && (
                              <>
                                <li>Criação de balcão de orientação jurídica</li>
                                <li>Parcerias com OAB e universidades</li>
                                <li>Workshops sobre legislação empresarial</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}