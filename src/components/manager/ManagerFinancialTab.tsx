import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface ClientData {
  id: number;
  name: string;
  email: string;
  totalSessions: number;
  totalPaid: number;
  lastSession: string;
  status: string;
  averageRating: number;
}

interface PsychologistData {
  id: number;
  name: string;
  email: string;
  totalSessions: number;
  totalEarned: number;
  commission: number;
  lastSession: string;
  rating: number;
  clientsCount: number;
}

const ManagerFinancialTab = () => {
  const [reportType, setReportType] = useState("overview");
  const [dateRange, setDateRange] = useState("all");
  const [selectedPsychologist, setSelectedPsychologist] = useState<PsychologistData | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  const clientsData: ClientData[] = [
    {
      id: 1,
      name: "Анна Иванова",
      email: "anna@example.com",
      totalSessions: 8,
      totalPaid: 20000,
      lastSession: "2024-08-15",
      status: "active",
      averageRating: 4.8
    },
    {
      id: 2,
      name: "Сергей Петров",
      email: "sergey@example.com",
      totalSessions: 12,
      totalPaid: 30000,
      lastSession: "2024-08-16",
      status: "active",
      averageRating: 4.9
    },
    {
      id: 3,
      name: "Елена Козлова",
      email: "elena@example.com",
      totalSessions: 5,
      totalPaid: 12500,
      lastSession: "2024-08-10",
      status: "inactive",
      averageRating: 4.7
    },
    {
      id: 4,
      name: "Дмитрий Орлов",
      email: "dmitry@example.com",
      totalSessions: 15,
      totalPaid: 37500,
      lastSession: "2024-08-16",
      status: "active",
      averageRating: 5.0
    }
  ];

  // Проверяем есть ли флаг о выплате в localStorage
  const getUpdatedPsychologistData = () => {
    const payoutFlag = localStorage.getItem('mariaPayout');
    if (payoutFlag) {
      return {
        id: 1,
        name: "Мария Козлова",
        email: "maria@example.com",
        totalSessions: 0, // Обнулено после выплаты
        totalEarned: 0,   // Обнулено после выплаты
        commission: 0,    // Обнулено после выплаты
        lastSession: "2024-08-16",
        rating: 4.8,
        clientsCount: 18
      };
    }
    return {
      id: 1,
      name: "Мария Козлова",
      email: "maria@example.com",
      totalSessions: 45,
      totalEarned: 112500,
      commission: 50625,
      lastSession: "2024-08-16",
      rating: 4.8,
      clientsCount: 18
    };
  };

  const psychologistsData: PsychologistData[] = [
    getUpdatedPsychologistData(),
    {
      id: 2,
      name: "Анна Смирнова",
      email: "anna.smirnova@example.com",
      totalSessions: 38,
      totalEarned: 95000,
      commission: 42750,
      lastSession: "2024-08-16",
      rating: 4.9,
      clientsCount: 15
    },
    {
      id: 3,
      name: "Елена Волкова",
      email: "elena.volkova@example.com",
      totalSessions: 32,
      totalEarned: 80000,
      commission: 36000,
      lastSession: "2024-08-15",
      rating: 4.7,
      clientsCount: 12
    },
    {
      id: 4,
      name: "Дарья Петрова",
      email: "darya@example.com",
      totalSessions: 28,
      totalEarned: 70000,
      commission: 31500,
      lastSession: "2024-08-16",
      rating: 4.6,
      clientsCount: 11
    }
  ];

  const totalRevenue = clientsData.reduce((sum, client) => sum + client.totalPaid, 0);
  const totalCommissions = psychologistsData.reduce((sum, psychologist) => sum + psychologist.commission, 0);
  const platformRevenue = totalRevenue - totalCommissions;

  const handleDetailedReport = (psychologist: PsychologistData) => {
    setSelectedPsychologist(psychologist);
    setShowDetailModal(true);
  };

  const handlePayout = (psychologist: PsychologistData) => {
    setSelectedPsychologist(psychologist);
    setShowPayoutModal(true);
  };

  const handlePayoutConfirm = () => {
    if (selectedPsychologist) {
      // Создаем запись для архива
      const payoutRecord = {
        id: `payout_${Date.now()}`,
        psychologistName: selectedPsychologist.name,
        psychologistEmail: selectedPsychologist.email,
        amount: selectedPsychologist.commission,
        totalSessions: selectedPsychologist.totalSessions,
        payoutDate: new Date().toISOString().split('T')[0],
        period: `Август 2025`,
        status: 'completed' as const,
        paymentMethod: 'Банковский перевод',
        transactionId: `TXN_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };

      // Сохраняем в архив
      const existingArchive = localStorage.getItem('payoutArchive');
      const archive = existingArchive ? JSON.parse(existingArchive) : [];
      archive.push(payoutRecord);
      localStorage.setItem('payoutArchive', JSON.stringify(archive));

      // Устанавливаем флаг выплаты для демонстрации (в реальности будет API)
      if (selectedPsychologist.name === "Мария Козлова") {
        localStorage.setItem('mariaPayout', 'true');
      }

      // Обнуляем показатели психолога (в реальном приложении это будет API запрос)
      const updatedPsychologist = {
        ...selectedPsychologist,
        totalEarned: 0,
        commission: 0,
        totalSessions: 0
      };

      // Здесь бы мы обновили данные через API
      // В демо просто показываем успешное сообщение
      alert(
        `✅ Выплата успешно завершена!\n\n` +
        `Психолог: ${selectedPsychologist.name}\n` +
        `Сумма: ₽${selectedPsychologist.commission.toLocaleString()}\n` +
        `ID транзакции: ${payoutRecord.transactionId}\n\n` +
        `📋 Данные сохранены в архиве\n` +
        `🔄 Показатели психолога обнулены`
      );

      setShowPayoutModal(false);
      setSelectedPsychologist(null);

      // В реальном приложении здесь бы был перезапрос данных
      // Для демонстрации просто перезагружаем страницу через 2 секунды
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleClientReport = (client: ClientData) => {
    setSelectedClient(client);
    setShowClientModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">Финансовые отчёты</h2>
        <div className="flex space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-warm-300 rounded-md focus:border-warm-500"
          >
            <option value="all">За всё время</option>
            <option value="month">За месяц</option>
            <option value="week">За неделю</option>
            <option value="today">За сегодня</option>
          </select>
          <Button 
            className="bg-warm-600 hover:bg-warm-700"
            onClick={() => {
              alert("Экспорт отчёта в PDF/Excel (функция в разработке)");
            }}
          >
            <Icon name="Download" className="mr-2" size={16} />
            Экспорт отчёта
          </Button>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">₽{totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Общий доход</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">₽{totalCommissions.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Выплачено психологам</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warm-800">₽{platformRevenue.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Доход платформы</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {psychologistsData.reduce((sum, p) => sum + p.totalSessions, 0)}
            </div>
            <p className="text-sm text-warm-600">Всего сеансов</p>
          </CardContent>
        </Card>
      </div>

      {/* Переключатель между отчётами */}
      <div className="flex space-x-4">
        <Button
          variant={reportType === "overview" ? "default" : "outline"}
          onClick={() => setReportType("overview")}
          className={reportType === "overview" ? "bg-warm-600 hover:bg-warm-700" : "border-warm-300 text-warm-600 hover:bg-warm-100"}
        >
          <Icon name="BarChart3" className="mr-2" size={16} />
          Общий обзор
        </Button>
        <Button
          variant={reportType === "clients" ? "default" : "outline"}
          onClick={() => setReportType("clients")}
          className={reportType === "clients" ? "bg-warm-600 hover:bg-warm-700" : "border-warm-300 text-warm-600 hover:bg-warm-100"}
        >
          <Icon name="Users" className="mr-2" size={16} />
          По клиентам
        </Button>
        <Button
          variant={reportType === "psychologists" ? "default" : "outline"}
          onClick={() => setReportType("psychologists")}
          className={reportType === "psychologists" ? "bg-warm-600 hover:bg-warm-700" : "border-warm-300 text-warm-600 hover:bg-warm-100"}
        >
          <Icon name="UserCheck" className="mr-2" size={16} />
          По психологам
        </Button>
      </div>

      {/* Отчёт по клиентам */}
      {reportType === "clients" && (
        <Card className="border-warm-200">
          <CardHeader>
            <CardTitle className="text-warm-800">Финансовый отчёт по клиентам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientsData.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-4 border border-warm-200 rounded-lg hover:bg-warm-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-warm-800">{client.name}</h3>
                        <p className="text-sm text-warm-600">{client.email}</p>
                      </div>
                      <Badge className={client.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {client.status === "active" ? "Активный" : "Неактивный"}
                      </Badge>
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-warm-600">Сеансов: </span>
                        <span className="font-medium text-warm-800">{client.totalSessions}</span>
                      </div>
                      <div>
                        <span className="text-warm-600">Оплачено: </span>
                        <span className="font-medium text-green-600">₽{client.totalPaid.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-warm-600">Последний сеанс: </span>
                        <span className="font-medium text-warm-800">{client.lastSession}</span>
                      </div>
                      <div>
                        <span className="text-warm-600">Рейтинг: </span>
                        <span className="font-medium text-yellow-600">★ {client.averageRating}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-warm-300 text-warm-600 hover:bg-warm-100"
                    onClick={() => handleClientReport(client)}
                  >
                    <Icon name="FileText" size={14} className="mr-1" />
                    Детальный отчёт
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Отчёт по психологам */}
      {reportType === "psychologists" && (
        <Card className="border-warm-200">
          <CardHeader>
            <CardTitle className="text-warm-800">Финансовый отчёт по психологам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {psychologistsData.map((psychologist) => (
                <div
                  key={psychologist.id}
                  className="flex items-center justify-between p-4 border border-warm-200 rounded-lg hover:bg-warm-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-warm-800">{psychologist.name}</h3>
                        <p className="text-sm text-warm-600">{psychologist.email}</p>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className="text-warm-600">Сеансов: </span>
                        <span className="font-medium text-warm-800">{psychologist.totalSessions}</span>
                      </div>
                      <div>
                        <span className="text-warm-600">Общий доход: </span>
                        <span className="font-medium text-green-600">₽{psychologist.totalEarned.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-warm-600">Комиссия (45%): </span>
                        <span className="font-medium text-blue-600">₽{psychologist.commission.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-warm-600">Клиентов: </span>
                        <span className="font-medium text-warm-800">{psychologist.clientsCount}</span>
                      </div>
                      <div>
                        <span className="text-warm-600">Рейтинг: </span>
                        <span className="font-medium text-yellow-600">★ {psychologist.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-warm-300 text-warm-600 hover:bg-warm-100"
                      onClick={() => handleDetailedReport(psychologist)}
                    >
                      <Icon name="FileText" size={14} className="mr-1" />
                      Детальный отчёт
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-300 text-green-600 hover:bg-green-50"
                      onClick={() => handlePayout(psychologist)}
                    >
                      <Icon name="CreditCard" size={14} className="mr-1" />
                      Выплатить
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Общий обзор */}
      {reportType === "overview" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-warm-200">
            <CardHeader>
              <CardTitle className="text-warm-800">Топ клиенты по доходу</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clientsData
                  .sort((a, b) => b.totalPaid - a.totalPaid)
                  .slice(0, 3)
                  .map((client, index) => (
                    <div key={client.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-warm-600 text-white text-xs flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span className="font-medium text-warm-800">{client.name}</span>
                      </div>
                      <span className="font-bold text-green-600">₽{client.totalPaid.toLocaleString()}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-200">
            <CardHeader>
              <CardTitle className="text-warm-800">Топ психологи по доходу</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {psychologistsData
                  .sort((a, b) => b.totalEarned - a.totalEarned)
                  .slice(0, 3)
                  .map((psychologist, index) => (
                    <div key={psychologist.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-warm-600 text-white text-xs flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span className="font-medium text-warm-800">{psychologist.name}</span>
                      </div>
                      <span className="font-bold text-blue-600">₽{psychologist.totalEarned.toLocaleString()}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Модальное окно детального отчёта */}
      {showDetailModal && selectedPsychologist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-warm-800">
                  Детальный отчёт: {selectedPsychologist.name}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetailModal(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Основная статистика</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Всего сессий:</span>
                      <span className="font-semibold">{selectedPsychologist.totalSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Общий доход:</span>
                      <span className="font-semibold text-green-600">₽{selectedPsychologist.totalEarned.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Комиссия (45%):</span>
                      <span className="font-semibold text-blue-600">₽{selectedPsychologist.commission.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Активных клиентов:</span>
                      <span className="font-semibold">{selectedPsychologist.clientsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Рейтинг:</span>
                      <span className="font-semibold text-yellow-600">★ {selectedPsychologist.rating}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Детализация по месяцам</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between p-2 bg-warm-50 rounded">
                      <span>Август 2025:</span>
                      <span className="font-semibold">₽25,000</span>
                    </div>
                    <div className="flex justify-between p-2 bg-warm-50 rounded">
                      <span>Июль 2025:</span>
                      <span className="font-semibold">₽30,000</span>
                    </div>
                    <div className="flex justify-between p-2 bg-warm-50 rounded">
                      <span>Июнь 2025:</span>
                      <span className="font-semibold">₽27,500</span>
                    </div>
                    <div className="flex justify-between p-2 bg-warm-50 rounded">
                      <span>Май 2025:</span>
                      <span className="font-semibold">₽30,000</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => alert("Экспорт отчёта в PDF (функция в разработке)")}
                >
                  <Icon name="Download" className="mr-2" size={16} />
                  Экспорт PDF
                </Button>
                <Button onClick={() => setShowDetailModal(false)}>
                  Закрыть
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно выплаты */}
      {showPayoutModal && selectedPsychologist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-warm-800">Выплата психологу</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPayoutModal(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="text-center p-4 bg-warm-50 rounded-lg">
                  <h4 className="font-semibold text-warm-800 mb-2">{selectedPsychologist.name}</h4>
                  <p className="text-sm text-warm-600 mb-3">{selectedPsychologist.email}</p>
                  <div className="text-2xl font-bold text-green-600">
                    ₽{selectedPsychologist.commission.toLocaleString()}
                  </div>
                  <p className="text-sm text-warm-500 mt-1">К выплате</p>
                </div>

                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" className="text-orange-600" size={16} />
                    <p className="text-sm font-medium text-orange-800">Внимание!</p>
                  </div>
                  <p className="text-xs text-orange-700 mt-1">
                    После выплаты все показатели психолога будут обнулены, 
                    а данные перенесены в архив.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Всего сессий:</span>
                    <span>{selectedPsychologist.totalSessions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Общий доход:</span>
                    <span>₽{selectedPsychologist.totalEarned.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Комиссия платформы (55%):</span>
                    <span>₽{(selectedPsychologist.totalEarned - selectedPsychologist.commission).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Выплата психологу (45%):</span>
                      <span className="text-green-600">₽{selectedPsychologist.commission.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowPayoutModal(false)}
                >
                  Отмена
                </Button>
                <Button
                  onClick={handlePayoutConfirm}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Icon name="CreditCard" className="mr-2" size={16} />
                  Подтвердить выплату
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно отчёта клиента */}
      {showClientModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-warm-800">
                  Детальный отчёт: {selectedClient.name}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClientModal(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Информация о клиенте</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Имя:</span>
                      <span className="font-semibold">{selectedClient.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-semibold">{selectedClient.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Статус:</span>
                      <Badge className={selectedClient.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {selectedClient.status === "active" ? "Активный" : "Неактивный"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Средний рейтинг:</span>
                      <span className="font-semibold text-yellow-600">★ {selectedClient.averageRating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Последний сеанс:</span>
                      <span className="font-semibold">{selectedClient.lastSession}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Финансовая статистика</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Всего сессий:</span>
                      <span className="font-semibold">{selectedClient.totalSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Всего оплачено:</span>
                      <span className="font-semibold text-green-600">₽{selectedClient.totalPaid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Средняя стоимость сессии:</span>
                      <span className="font-semibold">₽{Math.round(selectedClient.totalPaid / selectedClient.totalSessions).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Доход платформы (55%):</span>
                      <span className="font-semibold text-warm-800">₽{Math.round(selectedClient.totalPaid * 0.55).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Комиссия психолога (45%):</span>
                      <span className="font-semibold text-blue-600">₽{Math.round(selectedClient.totalPaid * 0.45).toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>История платежей</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-green-50 rounded border border-green-200">
                      <span>15.08.2025</span>
                      <span className="font-semibold text-green-600">₽2,500</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 rounded border border-green-200">
                      <span>08.08.2025</span>
                      <span className="font-semibold text-green-600">₽2,500</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 rounded border border-green-200">
                      <span>01.08.2025</span>
                      <span className="font-semibold text-green-600">₽2,500</span>
                    </div>
                    <div className="flex justify-between p-3 bg-orange-50 rounded border border-orange-200">
                      <span>25.07.2025</span>
                      <span className="font-semibold text-orange-600">₽2,500 (ожидает)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => alert("Экспорт отчёта клиента в PDF (функция в разработке)")}
                >
                  <Icon name="Download" className="mr-2" size={16} />
                  Экспорт PDF
                </Button>
                <Button onClick={() => setShowClientModal(false)}>
                  Закрыть
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerFinancialTab;