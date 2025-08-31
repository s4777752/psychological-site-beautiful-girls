import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { 
  getClientDatabase, 
  upsertClient, 
  generatePassword,
  ClientRecord 
} from "@/utils/clientStorage";

const ClientManagement = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientRecord | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    isActive: true
  });

  // Загружаем клиентов при монтировании
  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = () => {
    const clientData = getClientDatabase();
    setClients(clientData);
  };

  const formatPhone = (value: string) => {
    let digits = value.replace(/\D/g, '');
    
    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    }
    
    if (!digits.startsWith('7') && digits.length > 0) {
      digits = '7' + digits;
    }
    
    if (digits.length === 0) return '';
    if (digits.length <= 1) return `+${digits}`;
    if (digits.length <= 4) return `+${digits.slice(0, 1)} (${digits.slice(1)}`;
    if (digits.length <= 7) return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9) return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setFormData({ ...formData, phone: formatted });
  };

  const generateRandomPassword = () => {
    const newPassword = generatePassword();
    setFormData({ ...formData, password: newPassword });
    toast({
      title: "Пароль сгенерирован",
      description: `Новый пароль: ${newPassword}`
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.password) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    try {
      upsertClient(formData);
      loadClients();
      
      // Очищаем форму
      setFormData({
        name: "",
        phone: "",
        password: "",
        isActive: true
      });
      setIsAddingClient(false);
      setEditingClient(null);

      toast({
        title: "Успешно",
        description: editingClient ? "Клиент обновлен" : "Клиент добавлен"
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить клиента",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (client: ClientRecord) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      phone: client.phone,
      password: client.password,
      isActive: client.isActive
    });
    setIsAddingClient(true);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      phone: "",
      password: "",
      isActive: true
    });
    setIsAddingClient(false);
    setEditingClient(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-warm-800 mb-2">Управление клиентами</h1>
        <p className="text-warm-600">Добавляйте клиентов и управляйте их паролями для входа в личный кабинет</p>
      </div>

      {/* Add/Edit Client Form */}
      {isAddingClient && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-warm-800">
              {editingClient ? 'Редактировать клиента' : 'Добавить клиента'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя клиента *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Анна Петрова"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Номер телефона *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    maxLength={18}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль *</Label>
                <div className="flex gap-2">
                  <Input
                    id="password"
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Пароль для входа"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateRandomPassword}
                    className="whitespace-nowrap"
                  >
                    <Icon name="RefreshCw" size={16} className="mr-1" />
                    Сгенерировать
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">Активный аккаунт</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-warm-600 hover:bg-warm-700">
                  <Icon name="Save" size={16} className="mr-2" />
                  {editingClient ? 'Обновить' : 'Добавить'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  <Icon name="X" size={16} className="mr-2" />
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add Client Button */}
      {!isAddingClient && (
        <div className="mb-6">
          <Button 
            onClick={() => setIsAddingClient(true)}
            className="bg-warm-600 hover:bg-warm-700"
          >
            <Icon name="UserPlus" size={16} className="mr-2" />
            Добавить клиента
          </Button>
        </div>
      )}

      {/* Clients List */}
      <div className="grid gap-4">
        <h2 className="text-lg font-semibold text-warm-800">
          Список клиентов ({clients.length})
        </h2>
        
        {clients.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-warm-600">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-warm-400" />
              <p>Нет добавленных клиентов</p>
              <p className="text-sm">Добавьте первого клиента для начала работы</p>
            </CardContent>
          </Card>
        ) : (
          clients.map((client) => (
            <Card key={client.id} className="border-warm-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-warm-800">{client.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        client.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {client.isActive ? 'Активен' : 'Отключен'}
                      </span>
                    </div>
                    <div className="text-sm text-warm-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <Icon name="Phone" size={14} />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Key" size={14} />
                        <span>Пароль: {client.password}</span>
                      </div>
                      {client.lastLogin && (
                        <div className="flex items-center gap-2">
                          <Icon name="Clock" size={14} />
                          <span>Последний вход: {new Date(client.lastLogin).toLocaleString('ru-RU')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(client)}
                    >
                      <Icon name="Edit" size={14} className="mr-1" />
                      Изменить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientManagement;