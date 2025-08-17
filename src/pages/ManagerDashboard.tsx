import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import PsychologistsManager from "@/components/PsychologistsManager";
import PaymentNotifications from "@/components/PaymentNotifications";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Проверяем авторизацию
    const isAuth = localStorage.getItem("managerAuth");
    if (!isAuth) {
      navigate("/admin/manager");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("managerAuth");
    navigate("/admin");
  };

  const tabs = [
    { id: "overview", name: "Обзор", icon: "BarChart3" },
    { id: "sessions", name: "Записи", icon: "Calendar" },
    { id: "payments", name: "Уведомления", icon: "Bell" },
    { id: "financial", name: "Финансы", icon: "DollarSign" },
    { id: "content", name: "Контент", icon: "FileText" },
    { id: "psychologists", name: "Психологи", icon: "Users" },
    { id: "settings", name: "Настройки", icon: "Settings" }
  ];

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Icon name="UserCog" className="text-warm-600 mr-3" size={24} />
              <h1 className="text-xl font-bold text-warm-800">Панель управляющего</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="text-warm-600 border-warm-300 hover:bg-warm-100"
              >
                <Icon name="Eye" className="mr-2" size={16} />
                Просмотр сайта
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
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "sessions" && <SessionsTab />}
        {activeTab === "payments" && <PaymentsTab />}
        {activeTab === "financial" && <FinancialTab />}
        {activeTab === "content" && <ContentTab />}
        {activeTab === "psychologists" && <PsychologistsTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
};

const OverviewTab = () => (
  <div className="grid gap-6 md:grid-cols-3">
    <Card className="border-warm-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-warm-700">Активные психологи</CardTitle>
        <Icon name="Users" className="h-4 w-4 text-warm-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-warm-800">6</div>
        <p className="text-xs text-warm-600">Все специалисты онлайн</p>
      </CardContent>
    </Card>
    <Card className="border-warm-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-warm-700">Записей сегодня</CardTitle>
        <Icon name="Calendar" className="h-4 w-4 text-warm-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-warm-800">24</div>
        <p className="text-xs text-warm-600">+12% к вчерашнему дню</p>
      </CardContent>
    </Card>
    <Card className="border-warm-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-warm-700">Доход за месяц</CardTitle>
        <Icon name="DollarSign" className="h-4 w-4 text-warm-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-warm-800">₽180,000</div>
        <p className="text-xs text-warm-600">+8% к прошлому месяцу</p>
      </CardContent>
    </Card>
  </div>
);

const ContentTab = () => {
  const [heroTitle, setHeroTitle] = useState("Профессиональная психологическая помощь онлайн");
  const [heroDescription, setHeroDescription] = useState("Получите квалифицированную поддержку от лицензированных психологов не выходя из дома");

  return (
    <div className="space-y-6">
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-warm-800">Редактирование главной страницы</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero-title">Заголовок Hero секции</Label>
            <Input
              id="hero-title"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="border-warm-300 focus:border-warm-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-desc">Описание Hero секции</Label>
            <Textarea
              id="hero-desc"
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              className="border-warm-300 focus:border-warm-500"
              rows={3}
            />
          </div>
          <Button className="bg-warm-600 hover:bg-warm-700">
            <Icon name="Save" className="mr-2" size={16} />
            Сохранить изменения
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const SessionsTab = () => {
  const [sessions] = useState([
    {
      id: 1,
      clientName: "Анна Иванова",
      psychologistName: "Мария Козлова",
      date: "2024-08-16",
      time: "14:00",
      status: "upcoming",
      type: "Индивидуальная терапия",
      duration: "50 мин",
      price: 2500
    },
    {
      id: 2,
      clientName: "Сергей Петров",
      psychologistName: "Анна Смирнова",
      date: "2024-08-16",
      time: "16:00",
      status: "in_progress",
      type: "Семейная терапия",
      duration: "50 мин",
      price: 2500
    },
    {
      id: 3,
      clientName: "Елена Козлова",
      psychологistName: "Елена Волкова",
      date: "2024-08-16",
      time: "10:00",
      status: "completed",
      type: "Личностная терапия",
      duration: "50 мин",
      price: 2500
    },
    {
      id: 4,
      clientName: "Дмитрий Орлов",
      psychologistName: "Дарья Петрова",
      date: "2024-08-16",
      time: "18:00",
      status: "upcoming",
      type: "КПТ",
      duration: "50 мин",
      price: 2500
    },
    {
      id: 5,
      clientName: "Ольга Морозова",
      psychологistName: "Мария Козлова",
      date: "2024-08-15",
      time: "15:00",
      status: "completed",
      type: "Тревожные расстройства",
      duration: "50 мин",
      price: 2500
    }
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Предстоящий</Badge>;
      case "in_progress":
        return <Badge className="bg-green-100 text-green-800">В процессе</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Завершен</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Отменен</Badge>;
      default:
        return <Badge>Неизвестно</Badge>;
    }
  };

  const filteredSessions = sessions.filter(session => {
    const matchesFilter = filterStatus === "all" || session.status === filterStatus;
    const matchesSearch = searchTerm === "" || 
      session.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.psychologistName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = sessions
    .filter(s => s.status === "completed")
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">Управление записями</h2>
        <div className="flex space-x-4">
          <Input
            placeholder="Поиск по клиенту или психологу..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 border-warm-300 focus:border-warm-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-warm-300 rounded-md focus:border-warm-500"
          >
            <option value="all">Все статусы</option>
            <option value="upcoming">Предстоящие</option>
            <option value="in_progress">В процессе</option>
            <option value="completed">Завершенные</option>
            <option value="cancelled">Отмененные</option>
          </select>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warm-800">{sessions.length}</div>
            <p className="text-sm text-warm-600">Всего записей</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {sessions.filter(s => s.status === "upcoming").length}
            </div>
            <p className="text-sm text-warm-600">Предстоящих</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {sessions.filter(s => s.status === "completed").length}
            </div>
            <p className="text-sm text-warm-600">Завершенных</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warm-800">₽{totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Доход с завершенных</p>
          </CardContent>
        </Card>
      </div>

      {/* Таблица записей */}
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-warm-800">Список записей</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border border-warm-200 rounded-lg hover:bg-warm-50"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-warm-800">{session.clientName}</h3>
                      <p className="text-sm text-warm-600">Клиент</p>
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-warm-400" />
                    <div>
                      <h3 className="font-semibold text-warm-800">{session.psychologistName}</h3>
                      <p className="text-sm text-warm-600">Психолог</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-warm-600">
                    <span className="flex items-center">
                      <Icon name="Calendar" size={14} className="mr-1" />
                      {session.date}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {session.time}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Timer" size={14} className="mr-1" />
                      {session.duration}
                    </span>
                    <span className="flex items-center">
                      <Icon name="CreditCard" size={14} className="mr-1" />
                      ₽{session.price}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-warm-600">{session.type}</div>
                </div>
                <div className="flex items-center space-x-4">
                  {getStatusBadge(session.status)}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-warm-300 text-warm-600 hover:bg-warm-100"
                  >
                    <Icon name="Eye" size={14} className="mr-1" />
                    Подробнее
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const FinancialTab = () => {
  const [reportType, setReportType] = useState("overview");
  const [dateRange, setDateRange] = useState("all");

  // Данные по клиентам
  const clientsData = [
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

  // Данные по психологам
  const psychologistsData = [
    {
      id: 1,
      name: "Мария Козлова",
      email: "maria@example.com",
      totalSessions: 45,
      totalEarned: 112500,
      commission: 50625, // 45% от общей суммы
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
              // Логика экспорта отчёта
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

const PaymentsTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-warm-800">Уведомления о записях</h2>
      <PaymentNotifications userRole="manager" />
    </div>
  );
};

const PsychologistsTab = () => <PsychologistsManager />;

const SettingsTab = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-warm-800">Настройки сайта</h2>
    <Card className="border-warm-200">
      <CardHeader>
        <CardTitle className="text-warm-800">Общие настройки</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="site-name">Название сайта</Label>
          <Input
            id="site-name"
            defaultValue="Психологическая помощь"
            className="border-warm-300 focus:border-warm-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Телефон для связи</Label>
          <Input
            id="contact-phone"
            defaultValue="+7 (495) 123-45-67"
            className="border-warm-300 focus:border-warm-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email для связи</Label>
          <Input
            id="contact-email"
            defaultValue="info@psyhelp.ru"
            className="border-warm-300 focus:border-warm-500"
          />
        </div>
        <Button className="bg-warm-600 hover:bg-warm-700">
          <Icon name="Save" className="mr-2" size={16} />
          Сохранить настройки
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default ManagerDashboard;