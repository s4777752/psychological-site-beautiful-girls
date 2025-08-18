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
    </div>
  );
};

export default ManagerSettingsTab;