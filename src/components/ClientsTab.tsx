import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  nextSession: string;
  status: 'active' | 'completed' | 'cancelled';
  sessionsCount: number;
}

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

export default ClientsTab;