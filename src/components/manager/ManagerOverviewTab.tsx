import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const ManagerOverviewTab = () => {
  return (
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
};

export default ManagerOverviewTab;