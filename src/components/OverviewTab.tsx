import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const OverviewTab = () => {
  return (
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
            <p className="text-xs text-warm-600">-15% к прошлому</p>
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
};

export default OverviewTab;