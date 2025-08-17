import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import PsychologistCalendar from "@/components/PsychologistCalendar";
import ChatInterface from "@/components/ChatInterface";
import ScheduleManager from "@/components/ScheduleManager";

interface PsychologistAuth {
  id: string;
  name: string;
  login: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  nextSession: string;
  status: 'active' | 'completed' | 'cancelled';
  sessionsCount: number;
}

const PsychologistDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [psychologist, setPsychologist] = useState<PsychologistAuth | null>(null);

  useEffect(() => {
    // Проверяем авторизацию
    const auth = localStorage.getItem("psychologistAuth");
    if (!auth) {
      navigate("/admin/psychologist");
    } else {
      setPsychologist(JSON.parse(auth));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("psychologistAuth");
    navigate("/admin");
  };

  if (!psychologist) {
    return null;
  }

  const tabs = [
    { id: "overview", name: "Обзор", icon: "BarChart3" },
    { id: "clients", name: "Клиенты", icon: "Users" },
    { id: "messages", name: "Сообщения", icon: "MessageSquare" },
    { id: "schedule", name: "Расписание", icon: "Calendar" },
    { id: "profile", name: "Профиль", icon: "User" }
  ];

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Icon name="Heart" className="text-warm-600 mr-3" size={24} />
              <div>
                <h1 className="text-xl font-bold text-warm-800">Кабинет психолога</h1>
                <p className="text-sm text-warm-600">Добро пожаловать, {psychologist.name}</p>
              </div>
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
        {activeTab === "clients" && <ClientsTab />}
        {activeTab === "messages" && <MessagesTab />}
        {activeTab === "schedule" && <ScheduleTab />}
        {activeTab === "profile" && <ProfileTab psychologist={psychologist} />}
      </div>
    </div>
  );
};

const OverviewTab = () => (
  <div className="space-y-6">
    <div className="grid gap-6 md:grid-cols-4">
      <Card className="border-warm-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-warm-700">Активные клиенты</CardTitle>
          <Icon name="Users" className="h-4 w-4 text-warm-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warm-800">12</div>
          <p className="text-xs text-warm-600">В работе</p>
        </CardContent>
      </Card>
      <Card className="border-warm-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-warm-700">Сессий сегодня</CardTitle>
          <Icon name="Calendar" className="h-4 w-4 text-warm-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warm-800">4</div>
          <p className="text-xs text-warm-600">Запланировано</p>
        </CardContent>
      </Card>
      <Card className="border-warm-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-warm-700">Доход за месяц</CardTitle>
          <Icon name="DollarSign" className="h-4 w-4 text-warm-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warm-800">₽84,000</div>
          <p className="text-xs text-warm-600">+15% к прошлому</p>
        </CardContent>
      </Card>
      <Card className="border-warm-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-warm-700">Рейтинг</CardTitle>
          <Icon name="Star" className="h-4 w-4 text-warm-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warm-800">4.9</div>
          <p className="text-xs text-warm-600">Средний балл</p>
        </CardContent>
      </Card>
    </div>

    {/* Сегодняшние сессии */}
    <Card className="border-warm-200">
      <CardHeader>
        <CardTitle className="text-warm-800">Сегодняшние сессии</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-warm-50 rounded-lg">
            <div>
              <h4 className="font-medium text-warm-800">Елена Иванова</h4>
              <p className="text-sm text-warm-600">10:00 - 11:00</p>
            </div>
            <Badge variant="default">Подтверждена</Badge>
          </div>
          <div className="flex items-center justify-between p-4 bg-warm-50 rounded-lg">
            <div>
              <h4 className="font-medium text-warm-800">Алексей Петров</h4>
              <p className="text-sm text-warm-600">14:00 - 15:00</p>
            </div>
            <Badge variant="outline">Ожидает</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ClientsTab = () => {
  const [clients] = useState<Client[]>([
    {
      id: "1",
      name: "Елена Иванова",
      email: "elena@example.com",
      phone: "+7 (999) 123-45-67",
      nextSession: "2025-08-16 10:00",
      status: "active",
      sessionsCount: 8
    },
    {
      id: "2",
      name: "Алексей Петров", 
      email: "alex@example.com",
      phone: "+7 (999) 765-43-21",
      nextSession: "2025-08-16 14:00",
      status: "active",
      sessionsCount: 3
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">Мои клиенты</h2>
        <Button className="bg-warm-600 hover:bg-warm-700">
          <Icon name="UserPlus" className="mr-2" size={16} />
          Добавить клиента
        </Button>
      </div>
      
      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="border-warm-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-warm-100 rounded-full flex items-center justify-center">
                    <Icon name="User" className="text-warm-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-warm-800">{client.name}</h3>
                    <p className="text-sm text-warm-600">{client.email}</p>
                    <p className="text-sm text-warm-600">{client.phone}</p>
                    <p className="text-xs text-warm-500 mt-1">
                      Сессий проведено: {client.sessionsCount}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                    {client.status === 'active' ? 'Активен' : 'Завершен'}
                  </Badge>
                  <p className="text-sm text-warm-600 mt-2">
                    Следующая сессия: {new Date(client.nextSession).toLocaleString('ru-RU')}
                  </p>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline" className="text-warm-600 border-warm-300">
                      <Icon name="MessageCircle" size={14} />
                    </Button>
                    <Button size="sm" variant="outline" className="text-warm-600 border-warm-300">
                      <Icon name="FileText" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ScheduleTab = () => {
  const [psychologist] = useState<PsychologistAuth | null>(() => {
    const auth = localStorage.getItem("psychologistAuth");
    return auth ? JSON.parse(auth) : null;
  });

  return (
    <div className="space-y-6">
      <ScheduleManager psychologistName={psychologist?.name || "Психолог"} />
    </div>
  );
};

const ProfileTab = ({ psychologist }: { psychologist: PsychologistAuth }) => {
  const [profileData, setProfileData] = useState({
    name: psychologist.name,
    email: "",
    specialization: "",
    experience: "",
    description: "",
    price: ""
  });

  useEffect(() => {
    // Загружаем данные профиля из списка психологов
    const psychologists = JSON.parse(localStorage.getItem("psychologists") || "[]");
    const currentPsychologist = psychologists.find((p: any) => p.id === psychologist.id);
    
    if (currentPsychologist) {
      setProfileData({
        name: currentPsychologist.name,
        email: currentPsychologist.email,
        specialization: currentPsychologist.specialization,
        experience: currentPsychologist.experience.toString(),
        description: currentPsychologist.description,
        price: currentPsychologist.price.toString()
      });
    }
  }, [psychologist.id]);

  const handleSaveProfile = () => {
    // Обновляем данные в localStorage
    const psychologists = JSON.parse(localStorage.getItem("psychologists") || "[]");
    const updatedPsychologists = psychologists.map((p: any) => {
      if (p.id === psychologist.id) {
        return {
          ...p,
          name: profileData.name,
          email: profileData.email,
          specialization: profileData.specialization,
          experience: parseInt(profileData.experience),
          description: profileData.description,
          price: parseInt(profileData.price)
        };
      }
      return p;
    });
    
    localStorage.setItem("psychologists", JSON.stringify(updatedPsychologists));
    
    // Обновляем данные авторизации
    const updatedAuth = { ...psychologist, name: profileData.name };
    localStorage.setItem("psychologistAuth", JSON.stringify(updatedAuth));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-warm-800">Мой профиль</h2>
      
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-warm-800">Основная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">ФИО</Label>
              <Input
                id="profile-name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="border-warm-300 focus:border-warm-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                className="border-warm-300 focus:border-warm-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profile-specialization">Специализация</Label>
              <Input
                id="profile-specialization"
                value={profileData.specialization}
                onChange={(e) => setProfileData(prev => ({ ...prev, specialization: e.target.value }))}
                className="border-warm-300 focus:border-warm-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-experience">Опыт работы (лет)</Label>
              <Input
                id="profile-experience"
                type="number"
                value={profileData.experience}
                onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                className="border-warm-300 focus:border-warm-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-price">Стоимость сессии (₽)</Label>
            <Input
              id="profile-price"
              type="number"
              value={profileData.price}
              onChange={(e) => setProfileData(prev => ({ ...prev, price: e.target.value }))}
              className="border-warm-300 focus:border-warm-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-description">О себе</Label>
            <Textarea
              id="profile-description"
              value={profileData.description}
              onChange={(e) => setProfileData(prev => ({ ...prev, description: e.target.value }))}
              className="border-warm-300 focus:border-warm-500"
              rows={4}
            />
          </div>

          <Button onClick={handleSaveProfile} className="bg-warm-600 hover:bg-warm-700">
            <Icon name="Save" className="mr-2" size={16} />
            Сохранить изменения
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const MessagesTab = () => {
  const [selectedClient, setSelectedClient] = useState<string>("Анна Петрова");
  
  const clients = [
    "Анна Петрова", 
    "Михаил Иванов", 
    "Елена Сидорова", 
    "Дмитрий Козлов"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-warm-800">Сообщения</h2>
      
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Client List */}
        <Card className="border-warm-200">
          <CardHeader>
            <CardTitle className="text-warm-800">Клиенты</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {clients.map((client) => (
                <button
                  key={client}
                  onClick={() => setSelectedClient(client)}
                  className={`w-full text-left px-4 py-3 hover:bg-warm-100 border-l-4 transition-colors ${
                    selectedClient === client 
                      ? "border-warm-500 bg-warm-50 text-warm-800" 
                      : "border-transparent text-warm-600"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-warm-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {client.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{client}</p>
                      <p className="text-xs text-warm-500 truncate">
                        {selectedClient === client ? "Набирает сообщение..." : "Последнее сообщение..."}
                      </p>
                    </div>
                    {Math.random() > 0.7 && (
                      <Badge variant="destructive" className="bg-warm-600 text-xs">
                        {Math.floor(Math.random() * 3) + 1}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <ChatInterface 
            userType="psychologist" 
            recipientName={selectedClient}
          />
        </div>
      </div>
    </div>
  );
};

export default PsychologistDashboard;