import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, MessageCircle, BarChart3, FileText, Lightbulb } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { apiService } from "@/services/api";
import { useMetrics } from "@/hooks/useMetrics";

interface Opinion {
  id: number;
  opinionText: string;
  createdAt: string;
  relevancia: number;
  user: {
    name: string;
    cidade: string;
    bairro?: string;
  };
  context?: {
    id: number;
    title: string;
  };
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const Evaluations = () => {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);
  const { opinionMetrics } = useMetrics();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Olá! Sou a Sofia, sua assistente de gestão municipal. Posso ajudar você a entender questões governamentais, leis municipais e analisar as demandas dos cidadãos. Como posso ajudar?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await loadOpinions();
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadOpinions = async () => {
    try {
      const data = await apiService.getOpinions();
      setOpinions(data);
    } catch (error) {
      console.error('Erro ao carregar opiniões:', error);
      // Mock data for demonstration
      setOpinions([
        {
          id: 1,
          opinionText: "Precisamos de mais transparência nos gastos públicos. A população tem direito de saber como seus impostos são utilizados.",
          createdAt: "2024-01-15T10:30:00",
          relevancia: 8,
          user: {
            name: "João Silva",
            cidade: "São Paulo",
            bairro: "Centro"
          },
          context: {
            id: 1,
            title: "Transparência Pública"
          }
        },
        {
          id: 2,
          opinionText: "O transporte público precisa melhorar. Muitos ônibus estão em péssimo estado e os horários não são respeitados.",
          createdAt: "2024-01-14T14:20:00",
          relevancia: 7,
          user: {
            name: "Maria Santos",
            cidade: "São Paulo",
            bairro: "Jardim Paulista"
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(newMessage);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('lei') || input.includes('legislação')) {
      return 'Sobre legislação municipal: As leis municipais são criadas pela Câmara de Vereadores e sancionadas pelo prefeito. Elas regulamentam questões locais como zoneamento, tributos municipais, e serviços públicos. Posso ajudar com alguma lei específica?';
    }
    
    if (input.includes('imposto') || input.includes('tributo')) {
      return 'Os principais tributos municipais são: IPTU (Imposto Predial e Territorial Urbano), ISS (Imposto sobre Serviços), e ITBI (Imposto sobre Transmissão de Bens Imóveis). Cada um tem suas regras específicas de cobrança e isenções.';
    }
    
    if (input.includes('transporte') || input.includes('ônibus')) {
      return 'Baseado nas demandas recebidas, o transporte público é uma das principais preocupações dos cidadãos. Sugestões incluem: melhorar a frota, aumentar a frequência, e implementar sistemas de monitoramento em tempo real.';
    }
    
    if (input.includes('saúde') || input.includes('sus')) {
      return 'O SUS municipal é responsável pela atenção básica à saúde. Isso inclui UBS (Unidades Básicas de Saúde), programas de vacinação, e atenção especializada. A gestão deve garantir acesso universal e equitativo.';
    }
    
    if (input.includes('educação') || input.includes('escola')) {
      return 'A educação municipal abrange educação infantil e ensino fundamental. A gestão deve garantir qualidade do ensino, infraestrutura adequada, e formação continuada dos professores, conforme a LDB (Lei de Diretrizes e Bases).';
    }
    
    return 'Entendo sua questão. Com base nos dados que tenho sobre gestão municipal, posso ajudar com informações sobre leis, regulamentações, e análise das demandas dos cidadãos. Pode ser mais específico sobre o que gostaria de saber?';
  };

  const getRelevanceColor = (relevancia: number) => {
    if (relevancia >= 8) return "bg-red-100 text-red-800";
    if (relevancia >= 6) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Consultas Governamentais</h1>
          <p className="text-muted-foreground">
            Chat com IA Sofia para esclarecimentos sobre leis, regulamentações e questões municipais
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas IA</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {chatMessages.filter(m => m.type === 'user').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Respostas Geradas</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {chatMessages.filter(m => m.type === 'bot').length - 1}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full space-y-4">
          <div className="border rounded-lg bg-white">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sofia</h3>
                  <p className="text-sm text-gray-600">Assistente de Gestão Municipal</p>
                </div>
              </div>
            </div>
            
            <div className="h-[500px] flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-[75%] ${message.type === 'user' ? 'order-1' : ''}`}>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white ml-auto' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        <p className={`text-xs mt-1 px-2 ${
                          message.type === 'user' ? 'text-right text-gray-500' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                      
                      {message.type === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Faça sua pergunta sobre gestão municipal..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!newMessage.trim() || isTyping}
                    className="self-end bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Evaluations;