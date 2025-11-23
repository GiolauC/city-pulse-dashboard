import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, ThumbsUp, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const mockDemands = [
  {
    id: 'PL 123/2025',
    title: 'Revitalização do Centro Histórico',
    description: 'Projeto para restauração e modernização das vias e praças do centro histórico da cidade.',
    neighborhood: 'Centro',
    city: 'São Paulo',
    category: 'Infraestrutura',
    status: 'debate',
    votes: 245,
    date: '2025-03-15',
    image: true
  },
  {
    id: 'PL 124/2025',
    title: 'Iluminação LED nas Ruas',
    description: 'Substituição de toda iluminação pública por LED para economia de energia.',
    neighborhood: 'Jardim Cantanduva',
    city: 'São Paulo',
    category: 'Iluminação',
    status: 'analise',
    votes: 189,
    date: '2025-03-20',
    image: false
  },
  {
    id: 'PL 125/2025',
    title: 'Transporte Escolar Seguro',
    description: 'Implementação de novos ônibus escolares com sistema de rastreamento.',
    neighborhood: 'Vila Nova',
    city: 'São Paulo',
    category: 'Educação',
    status: 'aprovado',
    votes: 312,
    date: '2025-02-10',
    image: true
  },
  {
    id: 'PL 126/2025',
    title: 'Coleta Seletiva Porta a Porta',
    description: 'Expansão do programa de coleta seletiva para todos os bairros.',
    neighborhood: 'Jardim Paulista',
    city: 'São Paulo',
    category: 'Limpeza',
    status: 'resolvido',
    votes: 156,
    date: '2025-01-05',
    image: false
  },
];

const statusLabels = {
  novo: 'Novo',
  analise: 'Em Análise',
  debate: 'Em Debate',
  aprovado: 'Aprovado',
  resolvido: 'Resolvido',
};

const statusColors = {
  novo: 'bg-info/10 text-info',
  analise: 'bg-warning/10 text-warning',
  debate: 'bg-warning/10 text-warning',
  aprovado: 'bg-success/10 text-success',
  resolvido: 'bg-success/10 text-success',
};

export default function Demands() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { profile } = useAuth();

  const filteredDemands = mockDemands.filter((demand) => {
    const matchesSearch = demand.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         demand.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || demand.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || demand.category === categoryFilter;
    const matchesRole = profile?.role === 'city' || demand.neighborhood === profile?.neighborhood_name;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Demandas</h1>
          <p className="text-muted-foreground">Gerencie e acompanhe as demandas da comunidade</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Demanda
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por lei, tema ou palavra-chave..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="analise">Em Análise</SelectItem>
                <SelectItem value="debate">Em Debate</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="resolvido">Resolvido</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                <SelectItem value="Iluminação">Iluminação</SelectItem>
                <SelectItem value="Educação">Educação</SelectItem>
                <SelectItem value="Limpeza">Limpeza</SelectItem>
                <SelectItem value="Segurança">Segurança</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredDemands.map((demand) => (
          <Card key={demand.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {demand.image && (
                  <div className="w-full md:w-32 h-32 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Foto</span>
                  </div>
                )}
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">{demand.id}</span>
                        <Badge className={statusColors[demand.status as keyof typeof statusColors]}>
                          {statusLabels[demand.status as keyof typeof statusLabels]}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{demand.title}</h3>
                      <p className="text-sm text-muted-foreground">{demand.description}</p>
                    </div>
                    
                    <Button variant="outline" size="sm" className="gap-2 shrink-0">
                      <ThumbsUp className="h-4 w-4" />
                      {demand.votes}
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{demand.city} → {demand.neighborhood}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(demand.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <Badge variant="outline">{demand.category}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
