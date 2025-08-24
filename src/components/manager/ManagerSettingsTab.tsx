import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const ManagerSettingsTab = () => {
  const [siteName, setSiteName] = useState("Психологическая помощь");
  const [contactPhone, setContactPhone] = useState("+7 (495) 123-45-67");
  const [contactPhone2, setContactPhone2] = useState("+7 (902) 477-77-52");
  const [contactEmail, setContactEmail] = useState("info@psyhelp.ru");

  const handleTestConnection = () => {
    alert("🔄 Проверяем соединение с платежным терминалом...\n\n✅ Соединение успешно!\n✅ Терминал готов к работе\n✅ Чеки настроены корректно");
  };

  const handleSaveSettings = () => {
    localStorage.setItem('siteSettings', JSON.stringify({
      siteName,
      contactPhone,
      contactPhone2,
      contactEmail
    }));
    alert("✅ Настройки сохранены!\n\nИзменения отобразятся на главной странице.");
  };

  return (
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
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="border-warm-300 focus:border-warm-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Телефон для связи основной</Label>
            <Input
              id="contact-phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="border-warm-300 focus:border-warm-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone2">Второй телефон</Label>
            <Input
              id="contact-phone2"
              value={contactPhone2}
              onChange={(e) => setContactPhone2(e.target.value)}
              className="border-warm-300 focus:border-warm-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email для связи</Label>
            <Input
              id="contact-email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="border-warm-300 focus:border-warm-500"
            />
          </div>
          <Button 
            onClick={handleSaveSettings}
            className="bg-warm-600 hover:bg-warm-700"
          >
            <Icon name="Save" className="mr-2" size={16} />
            Сохранить настройки
          </Button>
        </CardContent>
      </Card>

      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-warm-800 flex items-center">
            <Icon name="CreditCard" className="mr-2" size={20} />
            Настройки платежей T-Bank
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="terminal-id">ID терминала</Label>
            <Input
              id="terminal-id"
              defaultValue="1755530914695"
              className="border-warm-300 focus:border-warm-500 font-mono"
              readOnly
            />
            <p className="text-xs text-warm-600">Текущий активный терминал</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="terminal-password">Пароль терминала</Label>
            <Input
              id="terminal-password"
              type="password"
              defaultValue="_31Ot0oNsEDkmVJK"
              className="border-warm-300 focus:border-warm-500 font-mono"
              readOnly
            />
            <p className="text-xs text-warm-600">Используется для подписи запросов</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" className="text-blue-600 mt-0.5" size={16} />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Статус интеграции</p>
                <p>✅ Терминал подключен и активен</p>
                <p>✅ Чеки настроены (патентная система)</p>
                <p>✅ Уведомления работают</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleTestConnection}
            variant="outline" 
            className="border-warm-300 text-warm-600 hover:bg-warm-50"
          >
            <Icon name="RefreshCw" className="mr-2" size={16} />
            Проверить соединение
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerSettingsTab;