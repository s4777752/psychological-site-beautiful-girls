import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ManagerSettingsTab = () => {
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
          <Button variant="outline" className="border-warm-300 text-warm-600">
            <Icon name="RefreshCw" className="mr-2" size={16} />
            Проверить соединение
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerSettingsTab;