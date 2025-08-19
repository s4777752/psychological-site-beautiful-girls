import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface PayoutRecord {
  id: string;
  psychologistName: string;
  psychologistEmail: string;
  amount: number;
  totalSessions: number;
  payoutDate: string;
  period: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  transactionId: string;
}

const ManagerArchiveTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedPsychologist, setSelectedPsychologist] = useState("all");

  // Получаем данные из localStorage или используем моковые данные
  const getPayoutRecords = (): PayoutRecord[] => {
    const savedRecords = localStorage.getItem('payoutArchive');
    if (savedRecords) {
      return JSON.parse(savedRecords);
    }
    
    // Моковые данные для демонстрации
    return [
      {
        id: "payout_001",
        psychologistName: "Мария Козлова",
        psychologistEmail: "maria@example.com",
        amount: 45000,
        totalSessions: 40,
        payoutDate: "2025-07-31",
        period: "Июль 2025",
        status: "completed",
        paymentMethod: "Банковский перевод",
        transactionId: "TXN_789456123"
      },
      {
        id: "payout_002",
        psychologistName: "Анна Смирнова",
        psychologistEmail: "anna.smirnova@example.com",
        amount: 38000,
        totalSessions: 35,
        payoutDate: "2025-07-31",
        period: "Июль 2025",
        status: "completed",
        paymentMethod: "Банковский перевод",
        transactionId: "TXN_789456124"
      },
      {
        id: "payout_003",
        psychologistName: "Елена Волкова",
        psychologistEmail: "elena.volkova@example.com",
        amount: 32000,
        totalSessions: 30,
        payoutDate: "2025-06-30",
        period: "Июнь 2025",
        status: "completed",
        paymentMethod: "Банковский перевод",
        transactionId: "TXN_678345012"
      }
    ];
  };

  const payoutRecords = getPayoutRecords();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Выплачено</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800">Обработка</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Ошибка</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Неизвестно</Badge>;
    }
  };

  const filteredRecords = payoutRecords.filter(record => {
    const matchesPeriod = selectedPeriod === "all" || record.period.includes(selectedPeriod);
    const matchesPsychologist = selectedPsychologist === "all" || record.psychologistName === selectedPsychologist;
    return matchesPeriod && matchesPsychologist;
  });

  const totalPaidOut = payoutRecords
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + r.amount, 0);

  const uniquePsychologists = [...new Set(payoutRecords.map(r => r.psychologistName))];
  const uniquePeriods = [...new Set(payoutRecords.map(r => r.period))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">Архив выплат</h2>
        <div className="flex space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-warm-300 rounded-md focus:border-warm-500"
          >
            <option value="all">Все периоды</option>
            {uniquePeriods.map(period => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
          <select
            value={selectedPsychologist}
            onChange={(e) => setSelectedPsychologist(e.target.value)}
            className="px-3 py-2 border border-warm-300 rounded-md focus:border-warm-500"
          >
            <option value="all">Все психологи</option>
            {uniquePsychologists.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <Button 
            className="bg-warm-600 hover:bg-warm-700"
            onClick={() => {
              alert("Экспорт архива в Excel (функция в разработке)");
            }}
          >
            <Icon name="Download" className="mr-2" size={16} />
            Экспорт архива
          </Button>
        </div>
      </div>

      {/* Статистика архива */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">₽{totalPaidOut.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Всего выплачено</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warm-800">{payoutRecords.filter(r => r.status === 'completed').length}</div>
            <p className="text-sm text-warm-600">Успешных выплат</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{uniquePsychologists.length}</div>
            <p className="text-sm text-warm-600">Психологов получили</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{Math.round(totalPaidOut / payoutRecords.filter(r => r.status === 'completed').length || 0).toLocaleString()}</div>
            <p className="text-sm text-warm-600">Средняя выплата</p>
          </CardContent>
        </Card>
      </div>

      {/* Список выплат из архива */}
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-warm-800">
            История выплат ({filteredRecords.length} записей)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Archive" size={48} className="text-warm-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-warm-600 mb-2">Архив пуст</h3>
                <p className="text-warm-500">Выплаты появятся здесь после их завершения</p>
              </div>
            ) : (
              filteredRecords
                .sort((a, b) => new Date(b.payoutDate).getTime() - new Date(a.payoutDate).getTime())
                .map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 border border-warm-200 rounded-lg hover:bg-warm-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon name="CheckCircle" className="text-green-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-warm-800">{record.psychologistName}</h4>
                        <p className="text-sm text-warm-600">{record.psychologistEmail}</p>
                        <p className="text-xs text-warm-500 font-mono">ID: {record.transactionId}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-warm-600">Период</p>
                      <p className="font-medium text-warm-800">{record.period}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-warm-600">Сессий</p>
                      <p className="font-medium text-warm-800">{record.totalSessions}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-warm-600">Сумма</p>
                      <p className="font-bold text-green-600 text-lg">₽{record.amount.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-warm-600">Дата выплаты</p>
                      <p className="font-medium text-warm-800">
                        {new Date(record.payoutDate).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-warm-600">Статус</p>
                      <div className="mt-1">{getStatusBadge(record.status)}</div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-warm-300 text-warm-600 hover:bg-warm-100"
                        onClick={() => {
                          alert(`Детали выплаты:\n\nПсихолог: ${record.psychologistName}\nСумма: ₽${record.amount.toLocaleString()}\nСпособ: ${record.paymentMethod}\nID транзакции: ${record.transactionId}`);
                        }}
                      >
                        <Icon name="FileText" size={14} className="mr-1" />
                        Детали
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                        onClick={() => {
                          alert("Скачивание справки о выплате (функция в разработке)");
                        }}
                      >
                        <Icon name="Download" size={14} className="mr-1" />
                        Справка
                      </Button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerArchiveTab;