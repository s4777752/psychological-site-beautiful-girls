import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface PaymentsTabProps {
  sessions: Session[];
}

const PaymentsTab = ({ sessions }: PaymentsTabProps) => {
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

export default PaymentsTab;