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

  const psychologistsData: PsychologistData[] = [
    {
      id: 1,
      name: "Мария Козлова",
      email: "maria@example.com",
      totalSessions: 45,
      totalEarned: 112500,
      commission: 50625,
      lastSession: "2024-08-16",
      rating: 4.8,
      clientsCount: 18
    },
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
                    >
                      <Icon name="FileText" size={14} className="mr-1" />
                      Детальный отчёт
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-300 text-green-600 hover:bg-green-50"
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
    </div>
  );
};

export default ManagerFinancialTab;