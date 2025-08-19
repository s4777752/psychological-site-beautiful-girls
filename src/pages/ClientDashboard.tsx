import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import IncomingCallNotification from "@/components/IncomingCallNotification";
import VideoCall from "@/components/VideoCall";
import ChatInterface from "@/components/ChatInterface";

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
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  paymentId?: string;
}

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [client, setClient] = useState<ClientAuth | null>(null);
  const [activeTab, setActiveTab] = useState("sessions");
  const [incomingCall, setIncomingCall] = useState<{
    show: boolean;
    callerName: string;
    roomId: string;
  }>({ show: false, callerName: "", roomId: "" });
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState("");

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

  const handleAcceptCall = () => {
    setCurrentRoomId(incomingCall.roomId);
    setIsInVideoCall(true);
    setIncomingCall({ show: false, callerName: "", roomId: "" });
  };

  const handleDeclineCall = () => {
    setIncomingCall({ show: false, callerName: "", roomId: "" });
    toast({
      title: "Звонок отклонен",
      description: "Вы отклонили входящий видеозвонок"
    });
  };

  const handleEndCall = () => {
    setIsInVideoCall(false);
    setCurrentRoomId("");
  };

  if (!client) {
    return null;
  }

  if (isInVideoCall) {
    return (
      <VideoCall
        roomId={currentRoomId}
        userType="client"
        userName={client.name}
        onEndCall={handleEndCall}
      />
    );
  }

  const sessions: Session[] = [
    {
      id: "1",
      date: "2025-08-16",
      time: "10:00",
      status: "upcoming",
      psychologist: client.psychologist,
      notes: "Плановая консультация",
      amount: 2500,
      paymentStatus: "paid",
      paymentId: "PAY_12345"
    },
    {
      id: "2",
      date: "2025-08-14",
      time: "10:00",
      status: "completed",
      psychologist: client.psychologist,
      notes: "Работа с тревожностью - хорошие результаты",
      amount: 2500,
      paymentStatus: "paid",
      paymentId: "PAY_12344"
    },
    {
      id: "3",
      date: "2025-08-21",
      time: "10:00",
      status: "upcoming",
      psychologist: client.psychologist,
      amount: 2500,
      paymentStatus: "pending"
    },
    {
      id: "4",
      date: "2025-08-12",
      time: "15:00",
      status: "completed",
      psychologist: client.psychologist,
      notes: "Первичная консультация",
      amount: 2500,
      paymentStatus: "paid",
      paymentId: "PAY_12342"
    },
    {
      id: "5",
      date: "2025-08-19",
      time: "14:00",
      status: "cancelled",
      psychologist: client.psychologist,
      notes: "Отменено клиентом",
      amount: 2500,
      paymentStatus: "refunded",
      paymentId: "PAY_12346"
    }
  ];

  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const nextSession = upcomingSessions[0];

  const tabs = [
    { id: "sessions", name: "Сеансы", icon: "Calendar" },
    { id: "payments", name: "Платежи", icon: "CreditCard" },
    { id: "messages", name: "Сообщения", icon: "MessageSquare" },
    { id: "video", name: "Видеозвонок", icon: "Video" },
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
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="/img/6e21af90-d81e-4f4e-b067-43f75a026d70.jpg" 
                      alt={client.psychologist}
                      className="w-full h-full object-cover"
                    />
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
        {activeTab === "payments" && <PaymentsTab sessions={sessions} />}
        {activeTab === "messages" && (
          <ChatInterface 
            userType="client" 
            recipientName={client.psychologist}
          />
        )}
        {activeTab === "video" && <VideoTab nextSession={nextSession} />}
        {activeTab === "profile" && <ProfileTab client={client} />}
      </div>

      {/* Incoming Call Notification */}
      <IncomingCallNotification
        show={incomingCall.show}
        callerName={incomingCall.callerName}
        roomId={incomingCall.roomId}
        onAccept={handleAcceptCall}
        onDecline={handleDeclineCall}
      />
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

  const getPaymentBadge = (paymentStatus: Session['paymentStatus']) => {
    const paymentConfig = {
      paid: { label: 'Оплачено', variant: 'default' as const, color: 'text-green-600' },
      pending: { label: 'Ожидает оплаты', variant: 'secondary' as const, color: 'text-orange-600' },
      failed: { label: 'Ошибка оплаты', variant: 'destructive' as const, color: 'text-red-600' },
      refunded: { label: 'Возвращено', variant: 'outline' as const, color: 'text-blue-600' }
    };
    
    const config = paymentConfig[paymentStatus];
    return (
      <Badge className={`bg-opacity-20 ${config.color} border-current`}>
        {config.label}
      </Badge>
    );
  };

  const totalPaid = sessions
    .filter(s => s.paymentStatus === 'paid')
    .reduce((sum, s) => sum + s.amount, 0);

  const pendingPayments = sessions.filter(s => s.paymentStatus === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">Мои сеансы</h2>
      </div>

      {/* Статистика оплат */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">₽{totalPaid.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Всего оплачено</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warm-800">{sessions.filter(s => s.paymentStatus === 'paid').length}</div>
            <p className="text-sm text-warm-600">Оплаченных сессий</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{pendingPayments}</div>
            <p className="text-sm text-warm-600">Ожидают оплаты</p>
          </CardContent>
        </Card>
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
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-sm font-medium text-warm-800">₽{session.amount.toLocaleString()}</p>
                      {getPaymentBadge(session.paymentStatus)}
                    </div>
                    {session.paymentId && (
                      <p className="text-xs text-warm-500 mt-1">ID платежа: {session.paymentId}</p>
                    )}
                    {session.notes && (
                      <p className="text-sm text-warm-500 mt-1">{session.notes}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-2">{getStatusBadge(session.status)}</div>
                  {session.status === 'upcoming' && (
                    <div className="space-y-2">
                      <Button size="sm" className="bg-warm-600 hover:bg-warm-700">
                        <Icon name="Video" className="mr-1" size={14} />
                        Подключиться
                      </Button>
                      {session.paymentStatus === 'pending' && (
                        <div>
                          <Button size="sm" variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                            <Icon name="CreditCard" className="mr-1" size={14} />
                            Оплатить
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  {session.paymentStatus === 'failed' && (
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                        <Icon name="RefreshCw" className="mr-1" size={14} />
                        Повторить оплату
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

const PaymentsTab = ({ sessions }: { sessions: Session[] }) => {
  const getPaymentBadge = (paymentStatus: Session['paymentStatus']) => {
    const paymentConfig = {
      paid: { label: 'Оплачено', color: 'bg-green-100 text-green-800' },
      pending: { label: 'Ожидает оплаты', color: 'bg-orange-100 text-orange-800' },
      failed: { label: 'Ошибка оплаты', color: 'bg-red-100 text-red-800' },
      refunded: { label: 'Возвращено', color: 'bg-blue-100 text-blue-800' }
    };
    
    const config = paymentConfig[paymentStatus];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const totalPaid = sessions
    .filter(s => s.paymentStatus === 'paid')
    .reduce((sum, s) => sum + s.amount, 0);

  const totalRefunded = sessions
    .filter(s => s.paymentStatus === 'refunded')
    .reduce((sum, s) => sum + s.amount, 0);

  const pendingAmount = sessions
    .filter(s => s.paymentStatus === 'pending')
    .reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">История платежей</h2>
        <Button variant="outline" className="border-warm-300 text-warm-600 hover:bg-warm-100">
          <Icon name="Download" className="mr-2" size={16} />
          Скачать чеки
        </Button>
      </div>

      {/* Статистика платежей */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">₽{totalPaid.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Всего оплачено</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">₽{pendingAmount.toLocaleString()}</div>
            <p className="text-sm text-warm-600">К оплате</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">₽{totalRefunded.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Возвращено</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warm-800">{sessions.length}</div>
            <p className="text-sm text-warm-600">Всего транзакций</p>
          </CardContent>
        </Card>
      </div>

      {/* История платежей */}
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-warm-800">Детальная история</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border border-warm-200 rounded-lg hover:bg-warm-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-warm-100 rounded-full flex items-center justify-center">
                      <Icon name="CreditCard" className="text-warm-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm-800">
                        Сессия от {new Date(session.date).toLocaleDateString('ru-RU')}
                      </h4>
                      <p className="text-sm text-warm-600">
                        {session.time} • Психолог: {session.psychologist}
                      </p>
                      {session.paymentId && (
                        <p className="text-xs text-warm-500 font-mono">ID: {session.paymentId}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-semibold text-warm-800">₽{session.amount.toLocaleString()}</p>
                        <p className="text-xs text-warm-500">
                          {new Date(session.date).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      {getPaymentBadge(session.paymentStatus)}
                    </div>
                    {session.paymentStatus === 'pending' && (
                      <div className="mt-2">
                        <Button size="sm" className="bg-primary hover:bg-primary-dark">
                          <Icon name="CreditCard" className="mr-1" size={12} />
                          Оплатить
                        </Button>
                      </div>
                    )}
                    {session.paymentStatus === 'failed' && (
                      <div className="mt-2">
                        <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                          <Icon name="RefreshCw" className="mr-1" size={12} />
                          Повторить
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

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