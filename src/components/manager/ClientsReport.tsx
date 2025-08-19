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

interface ClientsReportProps {
  clients: ClientData[];
  onClientReport: (client: ClientData) => void;
}

const ClientsReport = ({ clients, onClientReport }: ClientsReportProps) => {
  return (
    <Card className="border-warm-200">
      <CardHeader>
        <CardTitle className="text-warm-800">Финансовый отчёт по клиентам</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.map((client) => (
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
                onClick={() => onClientReport(client)}
              >
                <Icon name="FileText" size={14} className="mr-1" />
                Детальный отчёт
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientsReport;