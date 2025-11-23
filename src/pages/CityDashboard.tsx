import { useState } from 'react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Users, MessageSquare, CheckCircle2, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Progress } from '@/components/ui/progress';

const interactionsData = [
  { month: 'Jan', value: 400 },
  { month: 'Fev', value: 600 },
  { month: 'Mar', value: 800 },
  { month: 'Abr', value: 950 },
  { month: 'Mai', value: 1100 },
  { month: 'Jun', value: 1234 },
];

const categoriesData = [
  { name: 'Iluminação', value: 75, color: '#FBB13C' },
  { name: 'Pavimentação', value: 60, color: '#CFCFD1' },
  { name: 'Limpeza', value: 45, color: '#10B981' },
  { name: 'Segurança', value: 30, color: '#3B82F6' },
];

const topDemands = [
  { id: 'PL 123/2025', title: 'Revitalização do Centro', author: 'Maria Silva', status: 'debate', votes: 245 },
  { id: 'PL 125/2025', title: 'Transporte Escolar Seguro', author: 'Carlos Mendes', status: 'aprovado', votes: 189 },
];

export default function CityDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard da Cidade</h1>
          <p className="text-muted-foreground">Visão geral e métricas gerais</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar bairro... (ex: Jardim Cantanduva)"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Usuários Ativos"
          value="1,234"
          trend="+12%"
          icon={Users}
          iconColor="text-info"
        />
        <StatsCard
          title="Interações (30d)"
          value="856"
          trend="+8%"
          icon={MessageSquare}
          iconColor="text-primary"
        />
        <StatsCard
          title="Demandas Resolvidas"
          value="142"
          trend="de 180 total"
          icon={CheckCircle2}
          iconColor="text-success"
        />
        <StatsCard
          title="Avaliação Média"
          value="4.8"
          trend="+0.3"
          icon={Star}
          iconColor="text-warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evolução de Interações</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={interactionsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorias Mais Acionadas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoriesData.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground">{category.value}%</span>
                </div>
                <Progress value={category.value} className="h-2" style={{ '--progress-background': category.color } as any} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Demandas Mais Votadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDemands.map((demand) => (
              <div key={demand.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{demand.id}</span>
                    <span className="text-foreground">{demand.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Ver: {demand.author}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    demand.status === 'aprovado' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-warning/10 text-warning'
                  }`}>
                    {demand.status === 'aprovado' ? 'APROVADO' : 'EM DEBATE'}
                  </span>
                  <span className="text-sm text-muted-foreground">{demand.votes} votos</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
