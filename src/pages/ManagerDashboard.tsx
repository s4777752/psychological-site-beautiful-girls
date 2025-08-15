import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import PsychologistsManager from "@/components/PsychologistsManager";

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
            defaultValue="MindCare"
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
            defaultValue="info@mindcare.ru"
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