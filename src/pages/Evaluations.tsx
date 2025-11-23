import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

const categories = [
  { name: 'Segurança', rating: 4.2, reviews: 234 },
  { name: 'Mobilidade', rating: 3.8, reviews: 189 },
  { name: 'Saúde', rating: 4.5, reviews: 312 },
  { name: 'Educação', rating: 4.7, reviews: 267 },
  { name: 'Infraestrutura', rating: 3.5, reviews: 198 },
  { name: 'Limpeza', rating: 4.1, reviews: 245 },
];

const recentComments = [
  {
    author: 'Maria Silva',
    date: '2025-03-20',
    category: 'Segurança',
    rating: 5,
    comment: 'Melhorou muito com a instalação de câmeras de segurança.'
  },
  {
    author: 'João Santos',
    date: '2025-03-19',
    category: 'Mobilidade',
    rating: 3,
    comment: 'Ainda precisamos de mais linhas de ônibus no horário de pico.'
  },
  {
    author: 'Ana Costa',
    date: '2025-03-18',
    category: 'Saúde',
    rating: 5,
    comment: 'Atendimento rápido e eficiente no posto de saúde.'
  },
];

export default function Evaluations() {
  const { profile } = useAuth();
  
  const overallRating = (categories.reduce((acc, cat) => acc + cat.rating, 0) / categories.length).toFixed(1);
  const totalReviews = categories.reduce((acc, cat) => acc + cat.reviews, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Avaliações</h1>
        <p className="text-muted-foreground">
          {profile?.role === 'city' ? 'Avaliação geral da cidade' : `Avaliação do bairro ${profile?.neighborhood_name}`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Nota Geral</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-6xl font-bold text-primary">{overallRating}</div>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${
                    star <= Math.round(parseFloat(overallRating))
                      ? 'fill-warning text-warning'
                      : 'text-muted'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{totalReviews} avaliações</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Avaliação por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-foreground w-32">{category.name}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="font-semibold text-foreground">{category.rating}</span>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{category.reviews} avaliações</span>
                  </div>
                  <Progress value={(category.rating / 5) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comentários Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentComments.map((comment, index) => (
              <div key={index} className="p-4 rounded-lg border border-border space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{comment.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(comment.date).toLocaleDateString('pt-BR')} • {comment.category}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= comment.rating
                            ? 'fill-warning text-warning'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground">{comment.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
