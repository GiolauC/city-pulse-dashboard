import { StatsCard } from '@/components/dashboard/StatsCard';
import { Users, MessageSquare, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';

const interactionsData = [
  { month: 'Jan', value: 45 },
  { month: 'Fev', value: 67 },
  { month: 'Mar', value: 89 },
  { month: 'Abr', value: 102 },
  { month: 'Mai', value: 115 },
  { month: 'Jun', value: 134 },
];

const categoriesData = [
  { category: 'Iluminação', value: 42 },
  { category: 'Limpeza', value: 38 },
  { category: 'Segurança', value: 28 },
  { category: 'Pavimentação', value: 26 },
];

const recentDemands = [
  { title: 'Iluminação Quebrada', location: 'Rua das Flores, 123', status: 'pendente', votes: 45 },
  { title: 'Buraco na Rua', location: 'Av. Central, 450', status: 'andamento', votes: 32 },
  { title: 'Lixo Acumulado', location: 'Praça da Matriz', status: 'resolvido', votes: 28 },
];

export default function NeighborhoodDashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard do Bairro
        </h1>
        <p className="text-muted-foreground">
          {profile?.neighborhood_name} - {profile?.city_name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Usuários Ativos"
          value="156"
          trend="+15%"
          icon={Users}
          iconColor="text-info"
        />
        <StatsCard
          title="Interações (30d)"
          value="134"
          trend="+12%"
          icon={MessageSquare}
          iconColor="text-primary"
        />
        <StatsCard
          title="Tendência"
          value="Crescendo"
          icon={TrendingUp}
          iconColor="text-success"
        />
        <StatsCard
          title="Avaliação Média"
          value="4.5"
          trend="+0.2"
          icon={Star}
          iconColor="text-warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução das Interações</CardTitle>
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
            <CardTitle>Categorias por Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoriesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="category" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Denúncias Mais Comentadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDemands.map((demand, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{demand.title}</p>
                  <p className="text-sm text-muted-foreground">{demand.location}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    demand.status === 'resolvido' 
                      ? 'bg-success/10 text-success' 
                      : demand.status === 'andamento'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {demand.status === 'resolvido' ? 'Resolvido' : demand.status === 'andamento' ? 'Em Andamento' : 'Pendente'}
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
