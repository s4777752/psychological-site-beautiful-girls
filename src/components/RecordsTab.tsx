import { useState } from "react";
import PaymentNotifications from "@/components/PaymentNotifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface PsychologistAuth {
  id: string;
  name: string;
  login: string;
}

interface ManualRecord {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  sessionType: string;
  sessionDate: string;
  sessionTime: string;
  price: number;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

const RecordsTab = () => {
  const [psychologist] = useState<PsychologistAuth | null>(() => {
    const auth = localStorage.getItem("psychologistAuth");
    return auth ? JSON.parse(auth) : null;
  });

  const [manualRecords, setManualRecords] = useState<ManualRecord[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    sessionType: "",
    sessionDate: "",
    sessionTime: "",
    price: "",
    notes: ""
  });

  const handleAddRecord = () => {
    const record: ManualRecord = {
      id: Date.now().toString(),
      clientName: newRecord.clientName,
      clientEmail: newRecord.clientEmail,
      clientPhone: newRecord.clientPhone,
      sessionType: newRecord.sessionType,
      sessionDate: newRecord.sessionDate,
      sessionTime: newRecord.sessionTime,
      price: parseFloat(newRecord.price) || 0,
      notes: newRecord.notes,
      status: 'scheduled',
      createdAt: new Date().toLocaleString('ru-RU')
    };
    
    setManualRecords([record, ...manualRecords]);
    setNewRecord({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      sessionType: "",
      sessionDate: "",
      sessionTime: "",
      price: "",
      notes: ""
    });
    setIsDialogOpen(false);
  };

  const updateRecordStatus = (id: string, status: 'scheduled' | 'completed' | 'cancelled') => {
    setManualRecords(records => 
      records.map(record => 
        record.id === id ? { ...record, status } : record
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">Записи на сессии</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-warm-600 hover:bg-warm-700">
              <Icon name="Plus" className="mr-2" size={16} />
              Добавить запись
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Добавить запись вручную</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="clientName">Имя клиента</Label>
                <Input
                  id="clientName"
                  value={newRecord.clientName}
                  onChange={(e) => setNewRecord({...newRecord, clientName: e.target.value})}
                  placeholder="Введите имя клиента"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="clientEmail">Email клиента</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={newRecord.clientEmail}
                  onChange={(e) => setNewRecord({...newRecord, clientEmail: e.target.value})}
                  placeholder="client@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="clientPhone">Телефон клиента</Label>
                <Input
                  id="clientPhone"
                  value={newRecord.clientPhone}
                  onChange={(e) => setNewRecord({...newRecord, clientPhone: e.target.value})}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sessionType">Тип сессии</Label>
                <Select onValueChange={(value) => setNewRecord({...newRecord, sessionType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип сессии" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Индивидуальная терапия</SelectItem>
                    <SelectItem value="family">Семейная терапия</SelectItem>
                    <SelectItem value="couple">Парная терапия</SelectItem>
                    <SelectItem value="group">Групповая терапия</SelectItem>
                    <SelectItem value="consultation">Консультация</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="sessionDate">Дата сессии</Label>
                  <Input
                    id="sessionDate"
                    type="date"
                    value={newRecord.sessionDate}
                    onChange={(e) => setNewRecord({...newRecord, sessionDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="sessionTime">Время</Label>
                  <Input
                    id="sessionTime"
                    type="time"
                    value={newRecord.sessionTime}
                    onChange={(e) => setNewRecord({...newRecord, sessionTime: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Стоимость (₽)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newRecord.price}
                  onChange={(e) => setNewRecord({...newRecord, price: e.target.value})}
                  placeholder="2500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Заметки</Label>
                <Textarea
                  id="notes"
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                  placeholder="Дополнительные заметки о сессии..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleAddRecord}
                  disabled={!newRecord.clientName || !newRecord.sessionType || !newRecord.sessionDate}
                  className="bg-warm-600 hover:bg-warm-700 flex-1"
                >
                  <Icon name="Plus" className="mr-2" size={16} />
                  Добавить запись
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

      <div className="space-y-6">
        {/* Ручные записи */}
        {manualRecords.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-warm-800">Ручные записи</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {manualRecords.map((record) => (
                <div key={record.id} className="border border-warm-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-warm-800">{record.sessionType}</h3>
                      <p className="text-sm text-warm-600">
                        {new Date(record.sessionDate).toLocaleDateString('ru-RU')} в {record.sessionTime}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={record.status === 'scheduled' ? 'default' : 'outline'}
                        onClick={() => updateRecordStatus(record.id, 'scheduled')}
                        className="text-xs"
                      >
                        Запланирована
                      </Button>
                      <Button
                        size="sm"
                        variant={record.status === 'completed' ? 'default' : 'outline'}
                        onClick={() => updateRecordStatus(record.id, 'completed')}
                        className="text-xs"
                      >
                        Завершена
                      </Button>
                      <Button
                        size="sm"
                        variant={record.status === 'cancelled' ? 'destructive' : 'outline'}
                        onClick={() => updateRecordStatus(record.id, 'cancelled')}
                        className="text-xs"
                      >
                        Отменена
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-warm-600 space-y-1">
                    <p><strong>Клиент:</strong> {record.clientName}</p>
                    {record.clientEmail && <p><strong>Email:</strong> {record.clientEmail}</p>}
                    {record.clientPhone && <p><strong>Телефон:</strong> {record.clientPhone}</p>}
                    <p><strong>Стоимость:</strong> {record.price.toLocaleString()} ₽</p>
                    <p><strong>Создано:</strong> {record.createdAt}</p>
                    {record.notes && <p><strong>Заметки:</strong> {record.notes}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Автоматические записи из системы оплат */}
        <PaymentNotifications userRole="psychologist" psychologistName={psychologist?.name} />
      </div>
    </div>
  );
};

export default RecordsTab;