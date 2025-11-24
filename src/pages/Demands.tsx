import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MapPin, Calendar, User, Image, Phone, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { apiService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useMetrics } from "@/hooks/useMetrics";

interface UserInteraction {
  id: number;
  name: string;
  whatsappNumber: string;
  age: number;
  interactionDate: string;
  localizacao: string;
  estado: string;
  cidade: string;
  bairro: string;
}

const Demands = () => {
  const { profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [interactions, setInteractions] = useState<UserInteraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  const { interactionMetrics } = useMetrics();
  const cityName = profile?.city_name || 'São Paulo';

  useEffect(() => {
    loadInteractions();
  }, []);

  const loadInteractions = async () => {
    try {
      const data = await apiService.getUserInteractions();
      setInteractions(data);
    } catch (error) {
      console.error('Erro ao carregar interações:', error);
      // Mock data for demonstration
      setInteractions([
        {
          id: 1,
          name: "João Silva",
          whatsappNumber: "+5511999999999",
          age: 35,
          interactionDate: "2024-01-15T10:30:00",
          localizacao: "BAIRRO",
          estado: "SP",
          cidade: "São Paulo",
          bairro: "Centro"
        },
        {
          id: 2,
          name: "Maria Santos",
          whatsappNumber: "+5511888888888",
          age: 42,
          interactionDate: "2024-01-14T14:20:00",
          localizacao: "CIDADE",
          estado: "SP",
          cidade: "São Paulo",
          bairro: "Jardim Paulista"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getLocationColor = (localizacao: string) => {
    switch (localizacao) {
      case "CIDADE": return "bg-blue-100 text-blue-800";
      case "BAIRRO": return "bg-green-100 text-green-800";
      case "ESTADO": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredInteractions = interactions.filter(interaction =>
    interaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interaction.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interaction.bairro?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mockImages = [
    { id: 1, url: "/placeholder.svg", location: "Centro - Buraco na rua", date: "2024-01-15" },
    { id: 2, url: "/placeholder.svg", location: "Jardim - Iluminação", date: "2024-01-14" },
    { id: 3, url: "/placeholder.svg", location: "Vila - Limpeza", date: "2024-01-13" }
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-64">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Demandas dos Cidadãos</h1>
          <p className="text-muted-foreground">
            Interações via WhatsApp, mapa de ocorrências e evidências fotográficas
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Interações</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interactionMetrics.total.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nível Cidade</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {interactionMetrics.cityLevel.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nível Bairro</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {interactionMetrics.neighborhoodLevel.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {interactionMetrics.today.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Interações</CardTitle>
              <CardDescription>
                Interações via WhatsApp por localização
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filtros e Busca */}
              <div className="flex gap-2 items-center mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>

              {/* Lista de Interações */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredInteractions.map((interaction) => (
                  <div key={interaction.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-1">
                        <div className="font-medium text-sm flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {interaction.name}
                        </div>
                        <div className="text-xs text-muted-foreground">Idade: {interaction.age} anos</div>
                      </div>
                      <Badge className={getLocationColor(interaction.localizacao)} variant="outline">
                        {interaction.localizacao}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{interaction.whatsappNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{interaction.cidade}, {interaction.estado}</span>
                        {interaction.bairro && <span> - {interaction.bairro}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(interaction.interactionDate).toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mapa de Ocorrências - {cityName}</CardTitle>
              <CardDescription>
                Clique nos marcadores para ver fotos e mensagens do local
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 rounded-lg relative overflow-hidden">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=-46.8,-23.7,-46.4,-23.4&layer=mapnik&marker=-23.55,-46.63`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  className="rounded-lg"
                ></iframe>
                
                {/* Overlay markers for neighborhoods */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/3 cursor-pointer group pointer-events-auto" onClick={() => setSelectedLocation('centro')}>
                    <div className="w-8 h-8 bg-red-500 rounded-full border-3 border-white shadow-lg animate-pulse group-hover:scale-125 transition-transform flex items-center justify-center">
                      <span className="text-white text-xs font-bold">12</span>
                    </div>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Centro - 12 reports
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 right-1/4 cursor-pointer group pointer-events-auto" onClick={() => setSelectedLocation('jardim')}>
                    <div className="w-8 h-8 bg-orange-500 rounded-full border-3 border-white shadow-lg animate-pulse group-hover:scale-125 transition-transform flex items-center justify-center">
                      <span className="text-white text-xs font-bold">8</span>
                    </div>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Jardim - 8 reports
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1/4 left-1/2 cursor-pointer group pointer-events-auto" onClick={() => setSelectedLocation('vila')}>
                    <div className="w-8 h-8 bg-yellow-500 rounded-full border-3 border-white shadow-lg animate-pulse group-hover:scale-125 transition-transform flex items-center justify-center">
                      <span className="text-white text-xs font-bold">5</span>
                    </div>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Vila - 5 reports
                    </div>
                  </div>
                  
                  <div className="absolute top-3/4 right-1/3 cursor-pointer group pointer-events-auto" onClick={() => setSelectedLocation('industrial')}>
                    <div className="w-8 h-8 bg-purple-500 rounded-full border-3 border-white shadow-lg animate-pulse group-hover:scale-125 transition-transform flex items-center justify-center">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Industrial - 3 reports
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedLocation && (
                <div className="mt-4 p-4 border rounded-lg bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold">
                      {selectedLocation === 'centro' && `Centro de ${cityName} - Av. Principal`}
                      {selectedLocation === 'jardim' && `Jardim das Flores - ${cityName}`}
                      {selectedLocation === 'vila' && `Vila Nova - ${cityName}`}
                      {selectedLocation === 'industrial' && `Distrito Industrial - ${cityName}`}
                    </h4>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedLocation(null)}>×</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Image className="h-4 w-4" />
                        Fotos ({selectedLocation === 'centro' ? '12' : selectedLocation === 'jardim' ? '8' : selectedLocation === 'vila' ? '5' : '3'})
                      </h5>
                      <div className="grid grid-cols-3 gap-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="aspect-square bg-gray-200 rounded border flex items-center justify-center">
                            <Image className="h-6 w-6 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Mensagens Recentes
                      </h5>
                      <div className="space-y-2 text-sm">
                        {selectedLocation === 'centro' && (
                          <>
                            <p className="p-2 bg-gray-50 rounded">"Buraco grande na pista, cuidado!" - João</p>
                            <p className="p-2 bg-gray-50 rounded">"Já é a terceira vez que reporto" - Maria</p>
                          </>
                        )}
                        {selectedLocation === 'jardim' && (
                          <>
                            <p className="p-2 bg-gray-50 rounded">"Sem iluminação à noite" - Pedro</p>
                            <p className="p-2 bg-gray-50 rounded">"Muito perigoso passar aqui" - Ana</p>
                          </>
                        )}
                        {selectedLocation === 'vila' && (
                          <>
                            <p className="p-2 bg-gray-50 rounded">"Lixo acumulado há dias" - Carlos</p>
                            <p className="p-2 bg-gray-50 rounded">"Precisa de limpeza urgente" - Lúcia</p>
                          </>
                        )}
                        {selectedLocation === 'industrial' && (
                          <>
                            <p className="p-2 bg-gray-50 rounded">"Poluição do ar aumentou" - Roberto</p>
                            <p className="p-2 bg-gray-50 rounded">"Trânsito de caminhões" - Sandra</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Demands;