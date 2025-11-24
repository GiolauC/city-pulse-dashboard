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
    <div className="min-h-screen flex bg-gray-100">
      {/* Lado Esquerdo - Imagem e Texto Explicativo */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/background.jpg")'}}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <img src={logo} alt="Sofia Logo" className="h-20 mb-1" />
            <p className="text-lg tracking-wide mb-8 opacity-90">
            Gestão eficiente nasce da participação.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{backgroundColor: '#C5D201'}}>
                <span className="text-sm font-bold" style={{color: '#342055'}}>1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Monitoramento em Tempo Real</h3>
                <p className="text-sm opacity-80">
                  Acompanhe indicadores de qualidade de vida, demandas dos cidadãos e performance dos serviços públicos
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{backgroundColor: '#C5D201'}}>
                <span className="text-sm font-bold" style={{color: '#342055'}}>2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Gestão Inteligente</h3>
                <p className="text-sm opacity-80">
                  Tome decisões baseadas em dados concretos e melhore a eficiência da administração pública
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{backgroundColor: '#C5D201'}}>
                <span className="text-sm font-bold" style={{color: '#342055'}}>3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Transparência e Participação</h3>
                <p className="text-sm opacity-80">
                  Promova maior transparência e engajamento dos cidadãos na gestão municipal
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full" />
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/10 rounded-full" />
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className=" rounded-3xl p-8 w-full max-w-md ">
          <div className="text-center mb-8">
            <div className="lg:hidden mb-6">
              <img src={logo} alt="Sofia Logo" className="h-16 mx-auto" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Bem-vindo</h2>
            <p className="text-muted-foreground">Acesse sua conta para continuar</p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
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
                    placeholder="empresa@email.com"
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
        </div>
      </div>
    </div>
  );
}