import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const [clients, setClients] = useState<Client[]>([
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

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    nextSession: "",
    notes: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddClient = () => {
    const client: Client = {
      id: (clients.length + 1).toString(),
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      nextSession: newClient.nextSession,
      status: "active",
      sessionsCount: 0
    };
    
    setClients([...clients, client]);
    setNewClient({ name: "", email: "", phone: "", nextSession: "", notes: "" });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">Мои клиенты</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-warm-600 hover:bg-warm-700">
              <Icon name="UserPlus" className="mr-2" size={16} />
              Добавить клиента
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Добавить нового клиента</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Имя и фамилия</Label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  placeholder="Введите имя клиента"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  placeholder="client@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nextSession">Следующая сессия</Label>
                <Input
                  id="nextSession"
                  type="datetime-local"
                  value={newClient.nextSession}
                  onChange={(e) => setNewClient({...newClient, nextSession: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Заметки</Label>
                <Textarea
                  id="notes"
                  value={newClient.notes}
                  onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                  placeholder="Дополнительная информация о клиенте..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleAddClient}
                  disabled={!newClient.name || !newClient.email || !newClient.phone}
                  className="bg-warm-600 hover:bg-warm-700 flex-1"
                >
                  <Icon name="Plus" className="mr-2" size={16} />
                  Добавить клиента
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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