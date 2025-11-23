import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import logo from '@/assets/logo.svg';
import type { UserRole } from '@/contexts/AuthContext';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('city');
  const [cityName, setCityName] = useState('');
  const [neighborhoodName, setNeighborhoodName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast.error('Erro ao fazer login: ' + error.message);
    } else {
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    }

    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (role === 'city' && !cityName) {
      toast.error('Por favor, informe o nome da cidade');
      return;
    }
    
    if (role === 'neighborhood' && (!cityName || !neighborhoodName)) {
      toast.error('Por favor, informe o nome da cidade e do bairro');
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, role, cityName, neighborhoodName);

    if (error) {
      toast.error('Erro ao criar conta: ' + error.message);
    } else {
      toast.success('Conta criada com sucesso!');
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <img src={logo} alt="Sofia Logo" className="h-16" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">Gestão Municipal</CardTitle>
            <CardDescription>Acesse o sistema de gestão da sua cidade</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar Conta</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Senha</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Senha</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Tipo de Acesso</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="city" id="city" />
                      <Label htmlFor="city" className="cursor-pointer">Gestão da Cidade</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="neighborhood" id="neighborhood" />
                      <Label htmlFor="neighborhood" className="cursor-pointer">Gestão do Bairro</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city-name">Nome da Cidade</Label>
                  <Input
                    id="city-name"
                    type="text"
                    placeholder="Ex: São Paulo"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    required
                  />
                </div>

                {role === 'neighborhood' && (
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood-name">Nome do Bairro</Label>
                    <Input
                      id="neighborhood-name"
                      type="text"
                      placeholder="Ex: Jardim Cantanduva"
                      value={neighborhoodName}
                      onChange={(e) => setNeighborhoodName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Criando conta...' : 'Criar Conta'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
