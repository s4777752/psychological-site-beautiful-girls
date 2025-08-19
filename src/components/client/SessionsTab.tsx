import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

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

export default SessionsTab;