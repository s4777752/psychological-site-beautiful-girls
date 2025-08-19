import PaymentNotifications from "@/components/PaymentNotifications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ManagerPaymentsTab = () => {
  // Данные об оплатах
  const paymentsData = [
    {
      id: 1,
      clientName: "Мария Козлова",
      psychologistName: "Анна Смирнова",
      date: "2025-08-19",
      time: "10:00",
      amount: 2500,
      status: "completed",
      paymentId: "PAY_12345",
      commission: 1125, // 45%
      method: "card"
    },
    {
      id: 2,
      clientName: "Елена Иванова", 
      psychologistName: "Мария Козлова",
      date: "2025-08-19",
      time: "14:00",
      amount: 2500,
      status: "pending",
      paymentId: "PAY_12346",
      commission: 1125,
      method: "card"
    },
    {
      id: 3,
      clientName: "Дмитрий Сидоров",
      psychologistName: "Елена Волкова",
      date: "2025-08-18",
      time: "16:00",
      amount: 2500,
      status: "completed",
      paymentId: "PAY_12344",
      commission: 1125,
      method: "card"
    },
    {
      id: 4,
      clientName: "Алексей Петров",
      psychologistName: "Дарья Петрова",
      date: "2025-08-18",
      time: "11:30",
      amount: 2500,
      status: "failed",
      paymentId: "PAY_12343",
      commission: 0,
      method: "card"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Оплачено</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800">Ожидает оплаты</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Ошибка оплаты</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Неизвестно</Badge>;
    }
  };

  const completedPayments = paymentsData.filter(p => p.status === 'completed');
  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalCommissions = completedPayments.reduce((sum, p) => sum + p.commission, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">Управление оплатами</h2>
        <Button className="bg-warm-600 hover:bg-warm-700">
          <Icon name="Download" className="mr-2" size={16} />
          Экспорт отчёта
        </Button>
      </div>

      {/* Статистика оплат */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">₽{totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Общий доход за сегодня</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">₽{totalCommissions.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Комиссии психологов</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warm-800">₽{(totalRevenue - totalCommissions).toLocaleString()}</div>
            <p className="text-sm text-warm-600">Доход платформы</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{paymentsData.length}</div>
            <p className="text-sm text-warm-600">Всего транзакций</p>
          </CardContent>
        </Card>
      </div>

      {/* Список оплат */}
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-warm-800">Последние оплаты</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentsData.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border border-warm-200 rounded-lg hover:bg-warm-50"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <div>
                      <h4 className="font-semibold text-warm-800">{payment.clientName}</h4>
                      <p className="text-sm text-warm-600">
                        Психолог: {payment.psychologistName}
                      </p>
                    </div>
                    {getStatusBadge(payment.status)}
                  </div>
                  <div className="grid grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-warm-600">Дата: </span>
                      <span className="font-medium text-warm-800">
                        {new Date(payment.date).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div>
                      <span className="text-warm-600">Время: </span>
                      <span className="font-medium text-warm-800">{payment.time}</span>
                    </div>
                    <div>
                      <span className="text-warm-600">Сумма: </span>
                      <span className="font-medium text-green-600">₽{payment.amount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-warm-600">Комиссия: </span>
                      <span className="font-medium text-blue-600">₽{payment.commission.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-warm-600">ID: </span>
                      <span className="font-mono text-xs text-warm-800">{payment.paymentId}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-warm-300 text-warm-600 hover:bg-warm-100"
                  >
                    <Icon name="FileText" size={14} className="mr-1" />
                    Детали
                  </Button>
                  {payment.status === 'failed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Icon name="RefreshCw" size={14} className="mr-1" />
                      Повторить
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <PaymentNotifications userRole="manager" />
    </div>
  );
};

export default ManagerPaymentsTab;