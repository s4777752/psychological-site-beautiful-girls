import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ClientAuth {
  id: string;
  name: string;
  phone: string;
  psychologist: string;
  nextSession: string;
}

interface Session {
  id: string;
  date: string;
  time: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  notes?: string;
  psychologist: string;
}

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [client, setClient] = useState<ClientAuth | null>(null);
  const [activeTab, setActiveTab] = useState("sessions");

  useEffect(() => {
    // Проверяем авторизацию клиента
    const auth = localStorage.getItem("clientAuth");
    if (!auth) {
      navigate("/client/login");
    } else {
      setClient(JSON.parse(auth));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("clientAuth");
    navigate("/");
  };

  if (!client) {
    return null;
  }

  const sessions: Session[] = [
    {
      id: "1",
      date: "2025-08-16",
      time: "10:00",
      status: "upcoming",
      psychologist: client.psychologist,
      notes: "Плановая консультация"
    },
    {
      id: "2",
      date: "2025-08-14",
      time: "10:00",
      status: "completed",
      psychologist: client.psychologist,
      notes: "Работа с тревожностью - хорошие результаты"
    },
    {
      id: "3",
      date: "2025-08-21",
      time: "10:00",
      status: "upcoming",
      psychologist: client.psychologist
    }
  ];

  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const nextSession = upcomingSessions[0];

  const tabs = [
    { id: "sessions", name: "Сеансы", icon: "Calendar" },
    { id: "video", name: "Видеозвонок", icon: "Video" },
    { id: "documents", name: "Документы", icon: "FileText" },
    { id: "profile", name: "Профиль", icon: "User" }
  ];

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Icon name="User" className="text-warm-600 mr-3" size={24} />
              <div>
                <h1 className="text-xl font-bold text-warm-800">Личный кабинет</h1>
                <p className="text-sm text-warm-600">Добро пожаловать, {client.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="text-warm-600 border-warm-300 hover:bg-warm-100"
              >
                <Icon name="Home" className="mr-2" size={16} />
                На главную
              </Button>
              <Button 
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Icon name="LogOut" className="mr-2" size={16} />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick info */}
        <div className="mb-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-warm-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-warm-100 rounded-full flex items-center justify-center">
                    <Icon name="UserCheck" className="text-warm-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-warm-600">Ваш психолог</p>
                    <p className="font-semibold text-warm-800">{client.psychologist}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-warm-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="Clock" className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-warm-600">Следующий сеанс</p>
                    <p className="font-semibold text-warm-800">
                      {nextSession ? 
                        `${new Date(nextSession.date).toLocaleDateString('ru-RU')} в ${nextSession.time}` :
                        'Не запланирован'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-warm-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-warm-600">Всего сеансов</p>
                    <p className="font-semibold text-warm-800">
                      {sessions.filter(s => s.status === 'completed').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-warm-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? "border-warm-500 text-warm-600"
                      : "border-transparent text-warm-500 hover:text-warm-700 hover:border-warm-300"
                  }`}
                >
                  <Icon name={tab.icon as any} className="mr-2" size={16} />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "sessions" && <SessionsTab sessions={sessions} />}
        {activeTab === "video" && <VideoTab nextSession={nextSession} />}
        {activeTab === "documents" && <DocumentsTab />}
        {activeTab === "profile" && <ProfileTab client={client} />}
      </div>
    </div>
  );
};

const SessionsTab = ({ sessions }: { sessions: Session[] }) => {
  const getStatusBadge = (status: Session['status']) => {
    const statusConfig = {
      upcoming: { label: 'Предстоящий', variant: 'default' as const },
      active: { label: 'Активный', variant: 'default' as const },
      completed: { label: 'Завершён', variant: 'secondary' as const },
      cancelled: { label: 'Отменён', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">Мои сеансы</h2>
      </div>
      
      <div className="grid gap-4">
        {sessions.map((session) => (
          <Card key={session.id} className="border-warm-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-warm-100 rounded-full flex items-center justify-center">
                    <Icon name="Calendar" className="text-warm-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-warm-800">
                      {new Date(session.date).toLocaleDateString('ru-RU')} в {session.time}
                    </h3>
                    <p className="text-sm text-warm-600">Психолог: {session.psychologist}</p>
                    {session.notes && (
                      <p className="text-sm text-warm-500 mt-1">{session.notes}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(session.status)}
                  {session.status === 'upcoming' && (
                    <div className="mt-2">
                      <Button size="sm" className="bg-warm-600 hover:bg-warm-700">
                        <Icon name="Video" className="mr-1" size={14} />
                        Подключиться
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const VideoTab = ({ nextSession }: { nextSession?: Session }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Здесь будет логика подключения к видеозвонку
    setTimeout(() => {
      setIsConnecting(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-warm-800">Видеосвязь</h2>
      
      <Card className="border-warm-200">
        <CardContent className="p-8 text-center">
          {nextSession ? (
            <div className="space-y-6">
              <div className="w-24 h-24 bg-warm-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Video" size={48} className="text-warm-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-warm-800 mb-2">
                  Следующий сеанс
                </h3>
                <p className="text-warm-600 mb-2">
                  {new Date(nextSession.date).toLocaleDateString('ru-RU')} в {nextSession.time}
                </p>
                <p className="text-sm text-warm-500">
                  Психолог: {nextSession.psychologist}
                </p>
              </div>

              <Button 
                onClick={handleConnect}
                disabled={isConnecting}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                {isConnecting ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                    Подключение...
                  </>
                ) : (
                  <>
                    <Icon name="Video" className="mr-2" size={20} />
                    Подключиться к сеансу
                  </>
                )}
              </Button>
              
              <p className="text-xs text-warm-500 mt-4">
                Убедитесь, что у вас есть доступ к камере и микрофону
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Icon name="VideoOff" size={48} className="text-warm-400 mx-auto" />
              <div>
                <h3 className="text-lg font-medium text-warm-600 mb-2">
                  Нет запланированных сеансов
                </h3>
                <p className="text-warm-500">
                  Свяжитесь с вашим психологом для записи на сеанс
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const DocumentsTab = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-warm-800">Документы и материалы</h2>
    
    <Card className="border-warm-200">
      <CardContent className="p-8 text-center">
        <Icon name="FileText" size={48} className="text-warm-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-warm-600 mb-2">
          Документы появятся здесь
        </h3>
        <p className="text-warm-500">
          Ваш психолог может делиться с вами полезными материалами и документами
        </p>
      </CardContent>
    </Card>
  </div>
);

const ProfileTab = ({ client }: { client: ClientAuth }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-warm-800">Мой профиль</h2>
    
    <Card className="border-warm-200">
      <CardHeader>
        <CardTitle className="text-warm-800">Основная информация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-warm-600 mb-1">Имя</p>
            <p className="text-warm-800">{client.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-warm-600 mb-1">Телефон</p>
            <p className="text-warm-800">{client.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-warm-600 mb-1">Психолог</p>
            <p className="text-warm-800">{client.psychologist}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-warm-600 mb-1">Статус</p>
            <Badge variant="default">Активный клиент</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ClientDashboard;