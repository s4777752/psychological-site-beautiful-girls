import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

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

interface DetailReportModalProps {
  psychologist?: PsychologistData;
  client?: ClientData;
  isOpen: boolean;
  onClose: () => void;
}

const DetailReportModal = ({ psychologist, client, isOpen, onClose }: DetailReportModalProps) => {
  if (!isOpen) return null;

  if (psychologist) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-warm-800">
                Детальный отчёт: {psychologist.name}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
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
                    <span className="font-semibold">{psychologist.totalSessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Общий доход:</span>
                    <span className="font-semibold text-green-600">₽{psychologist.totalEarned.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Комиссия (45%):</span>
                    <span className="font-semibold text-blue-600">₽{psychologist.commission.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Активных клиентов:</span>
                    <span className="font-semibold">{psychologist.clientsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Рейтинг:</span>
                    <span className="font-semibold text-yellow-600">★ {psychologist.rating}</span>
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
              <Button onClick={onClose}>
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (client) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-warm-800">
                Детальный отчёт: {client.name}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
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
                    <span className="font-semibold">{client.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-semibold">{client.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Статус:</span>
                    <Badge className={client.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {client.status === "active" ? "Активный" : "Неактивный"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Средний рейтинг:</span>
                    <span className="font-semibold text-yellow-600">★ {client.averageRating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Последний сеанс:</span>
                    <span className="font-semibold">{client.lastSession}</span>
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
                    <span className="font-semibold">{client.totalSessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Всего оплачено:</span>
                    <span className="font-semibold text-green-600">₽{client.totalPaid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Средняя стоимость сессии:</span>
                    <span className="font-semibold">₽{Math.round(client.totalPaid / client.totalSessions).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доход платформы (55%):</span>
                    <span className="font-semibold text-warm-800">₽{Math.round(client.totalPaid * 0.55).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Комиссия психолога (45%):</span>
                    <span className="font-semibold text-blue-600">₽{Math.round(client.totalPaid * 0.45).toLocaleString()}</span>
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
              <Button onClick={onClose}>
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DetailReportModal;