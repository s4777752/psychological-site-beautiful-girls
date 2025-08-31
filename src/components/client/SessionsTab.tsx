import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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

interface SessionsTabProps {
  sessions: Session[];
}

const SessionsTab = ({ sessions }: SessionsTabProps) => {
  const { toast } = useToast();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  // Функция подключения к видеосессии
  const handleConnectToSession = (sessionId: string, sessionDate: string, sessionTime: string) => {
    setLoadingStates(prev => ({ ...prev, [sessionId]: true }));
    
    // Проверяем, что сессия скоро начнется (за 10 минут до начала)
    const sessionDateTime = new Date(`${sessionDate}T${sessionTime}`);
    const now = new Date();
    const timeDiff = sessionDateTime.getTime() - now.getTime();
    const minutesUntilSession = Math.floor(timeDiff / (1000 * 60));
    
    if (minutesUntilSession > 10) {
      toast({
        title: "Рано подключаться",
        description: `Подключение будет доступно за 10 минут до начала. Осталось: ${minutesUntilSession} мин.`,
        variant: "destructive"
      });
      setLoadingStates(prev => ({ ...prev, [sessionId]: false }));
      return;
    }
    
    // Симулируем подключение к Doxy.me
    setTimeout(() => {
      const doxyUrl = `https://doxy.me/therapist-room-${sessionId}`;
      window.open(doxyUrl, '_blank');
      
      toast({
        title: "Подключение к сессии",
        description: "Вы подключились к видеосессии"
      });
      
      setLoadingStates(prev => ({ ...prev, [sessionId]: false }));
    }, 1500);
  };

  // Функция оплаты сессии
  const handlePaySession = (sessionId: string, amount: number) => {
    setLoadingStates(prev => ({ ...prev, [`pay-${sessionId}`]: true }));
    
    // Симулируем процесс оплаты
    setTimeout(() => {
      // В реальном приложении здесь будет интеграция с платежной системой
      const isPaymentSuccessful = Math.random() > 0.1; // 90% успешных платежей
      
      if (isPaymentSuccessful) {
        toast({
          title: "Оплата успешна",
          description: `Сессия оплачена: ₽${amount.toLocaleString()}`
        });
        
        // Здесь нужно обновить статус оплаты в родительском компоненте
        // Пока просто показываем уведомление
      } else {
        toast({
          title: "Ошибка оплаты",
          description: "Не удалось произвести оплату. Попробуйте позже.",
          variant: "destructive"
        });
      }
      
      setLoadingStates(prev => ({ ...prev, [`pay-${sessionId}`]: false }));
    }, 2000);
  };

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
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold text-warm-800">Мои сеансы</h2>
      </div>

      {/* Статистика оплат */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card className="border-warm-200">
          <CardContent className="p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-green-600">₽{totalPaid.toLocaleString()}</div>
            <p className="text-xs md:text-sm text-warm-600">Всего оплачено</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-warm-800">{sessions.filter(s => s.paymentStatus === 'paid').length}</div>
            <p className="text-xs md:text-sm text-warm-600">Оплаченных сессий</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200 sm:col-span-2 md:col-span-1">
          <CardContent className="p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-orange-600">{pendingPayments}</div>
            <p className="text-xs md:text-sm text-warm-600">Ожидают оплаты</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-3 md:gap-4">
        {sessions.map((session) => (
          <Card key={session.id} className="border-warm-200">
            <CardContent className="p-4 md:p-6">
              {/* Мобильная версия - вертикальная компоновка */}
              <div className="block md:hidden">
                {/* Заголовок и статус */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-warm-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Calendar" className="text-warm-600" size={16} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-warm-800 text-sm leading-tight">
                        {new Date(session.date).toLocaleDateString('ru-RU')}
                      </h3>
                      <p className="text-warm-600 text-sm">в {session.time}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">{getStatusBadge(session.status)}</div>
                </div>
                
                {/* Информация о сессии */}
                <div className="space-y-2 mb-3">
                  <p className="text-sm text-warm-600">
                    <span className="font-medium">Психолог:</span> {session.psychologist}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-warm-800">₽{session.amount.toLocaleString()}</p>
                    <div className="text-xs">{getPaymentBadge(session.paymentStatus)}</div>
                  </div>
                  {session.paymentId && (
                    <p className="text-xs text-warm-500">ID: {session.paymentId}</p>
                  )}
                  {session.notes && (
                    <p className="text-xs text-warm-500 bg-warm-50 p-2 rounded">{session.notes}</p>
                  )}
                </div>
                
                {/* Кнопки действий */}
                {session.status === 'upcoming' && (
                  <div className="space-y-2">
                    <Button 
                      size="sm" 
                      className="bg-warm-600 hover:bg-warm-700 w-full"
                      onClick={() => handleConnectToSession(session.id, session.date, session.time)}
                      disabled={loadingStates[session.id]}
                    >
                      {loadingStates[session.id] ? (
                        <>
                          <Icon name="Loader2" className="mr-2 animate-spin" size={14} />
                          Подключаем...
                        </>
                      ) : (
                        <>
                          <Icon name="Video" className="mr-2" size={14} />
                          Подключиться к сессии
                        </>
                      )}
                    </Button>
                    {session.paymentStatus === 'pending' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-orange-300 text-orange-600 hover:bg-orange-50 w-full"
                        onClick={() => handlePaySession(session.id, session.amount)}
                        disabled={loadingStates[`pay-${session.id}`]}
                      >
                        {loadingStates[`pay-${session.id}`] ? (
                          <>
                            <Icon name="Loader2" className="mr-2 animate-spin" size={14} />
                            Оплачиваем...
                          </>
                        ) : (
                          <>
                            <Icon name="CreditCard" className="mr-2" size={14} />
                            Оплатить ₽{session.amount.toLocaleString()}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
                {session.paymentStatus === 'failed' && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-300 text-red-600 hover:bg-red-50 w-full"
                    onClick={() => handlePaySession(session.id, session.amount)}
                    disabled={loadingStates[`pay-${session.id}`]}
                  >
                    {loadingStates[`pay-${session.id}`] ? (
                      <>
                        <Icon name="Loader2" className="mr-2 animate-spin" size={14} />
                        Оплачиваем...
                      </>
                    ) : (
                      <>
                        <Icon name="RefreshCw" className="mr-2" size={14} />
                        Повторить оплату
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Десктопная версия - оригинальная компоновка */}
              <div className="hidden md:flex items-center justify-between">
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
                      <Button 
                        size="sm" 
                        className="bg-warm-600 hover:bg-warm-700"
                        onClick={() => handleConnectToSession(session.id, session.date, session.time)}
                        disabled={loadingStates[session.id]}
                      >
                        {loadingStates[session.id] ? (
                          <>
                            <Icon name="Loader2" className="mr-1 animate-spin" size={14} />
                            Подключаем...
                          </>
                        ) : (
                          <>
                            <Icon name="Video" className="mr-1" size={14} />
                            Подключиться
                          </>
                        )}
                      </Button>
                      {session.paymentStatus === 'pending' && (
                        <div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-orange-300 text-orange-600 hover:bg-orange-50"
                            onClick={() => handlePaySession(session.id, session.amount)}
                            disabled={loadingStates[`pay-${session.id}`]}
                          >
                            {loadingStates[`pay-${session.id}`] ? (
                              <>
                                <Icon name="Loader2" className="mr-1 animate-spin" size={14} />
                                Оплачиваем...
                              </>
                            ) : (
                              <>
                                <Icon name="CreditCard" className="mr-1" size={14} />
                                Оплатить
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  {session.paymentStatus === 'failed' && (
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handlePaySession(session.id, session.amount)}
                        disabled={loadingStates[`pay-${session.id}`]}
                      >
                        {loadingStates[`pay-${session.id}`] ? (
                          <>
                            <Icon name="Loader2" className="mr-1 animate-spin" size={14} />
                            Оплачиваем...
                          </>
                        ) : (
                          <>
                            <Icon name="RefreshCw" className="mr-1 size={14} />
                            Повторить оплату
                          </>
                        )}
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

export default SessionsTab;