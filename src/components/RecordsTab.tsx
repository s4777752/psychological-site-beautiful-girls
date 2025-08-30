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

  // Загружаем и сохраняем ручные записи в localStorage
  const [manualRecords, setManualRecords] = useState<ManualRecord[]>(() => {
    const saved = localStorage.getItem('manualRecords');
    return saved ? JSON.parse(saved) : [];
  });
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
    
    const updatedRecords = [record, ...manualRecords];
    setManualRecords(updatedRecords);
    // Сохраняем в localStorage
    localStorage.setItem('manualRecords', JSON.stringify(updatedRecords));
    
    // Также обновляем расписание психолога, чтобы заблокировать слот
    if (psychologist?.name) {
      const psychologistScheduleKey = `psychologistSchedule_${psychologist.name.replace(/\s+/g, '_')}`;
      const scheduleData = JSON.parse(localStorage.getItem(psychologistScheduleKey) || '{}');
      
      if (scheduleData[newRecord.sessionDate]) {
        scheduleData[newRecord.sessionDate] = scheduleData[newRecord.sessionDate].map((slot: any) => {
          if (slot.time === newRecord.sessionTime) {
            return { ...slot, booked: true };
          }
          return slot;
        });
        localStorage.setItem(psychologistScheduleKey, JSON.stringify(scheduleData));
      }
    }
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
    // Обновляем статус записи для всех случаев, включая отмену
    const updatedRecords = manualRecords.map(record => 
      record.id === id ? { ...record, status } : record
    );
    setManualRecords(updatedRecords);
    localStorage.setItem('manualRecords', JSON.stringify(updatedRecords));
    
    // При отмене освобождаем слот в расписании
    if (status === 'cancelled') {
      const recordToUpdate = manualRecords.find(record => record.id === id);
      if (recordToUpdate && psychologist?.name) {
        const psychologistScheduleKey = `psychologistSchedule_${psychologist.name.replace(/\s+/g, '_')}`;
        const scheduleData = JSON.parse(localStorage.getItem(psychologistScheduleKey) || '{}');
        
        if (scheduleData[recordToUpdate.sessionDate]) {
          scheduleData[recordToUpdate.sessionDate] = scheduleData[recordToUpdate.sessionDate].map((slot: any) => {
            if (slot.time === recordToUpdate.sessionTime) {
              return { ...slot, booked: false };
            }
            return slot;
          });
          localStorage.setItem(psychologistScheduleKey, JSON.stringify(scheduleData));
        }
      }
    }
  };

  const deleteRecord = (id: string) => {
    const recordToDelete = manualRecords.find(record => record.id === id);
    
    // Удаляем запись полностью
    const updatedRecords = manualRecords.filter(record => record.id !== id);
    setManualRecords(updatedRecords);
    localStorage.setItem('manualRecords', JSON.stringify(updatedRecords));
    
    // Освобождаем слот в расписании
    if (recordToDelete && psychologist?.name) {
      const psychologistScheduleKey = `psychologistSchedule_${psychologist.name.replace(/\s+/g, '_')}`;
      const scheduleData = JSON.parse(localStorage.getItem(psychologistScheduleKey) || '{}');
      
      if (scheduleData[recordToDelete.sessionDate]) {
        scheduleData[recordToDelete.sessionDate] = scheduleData[recordToDelete.sessionDate].map((slot: any) => {
          if (slot.time === recordToDelete.sessionTime) {
            return { ...slot, booked: false };
          }
          return slot;
        });
        localStorage.setItem(psychologistScheduleKey, JSON.stringify(scheduleData));
      }
    }
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
                    <div className="flex gap-2 items-center">
                      <Button
                        size="sm"
                        onClick={() => updateRecordStatus(record.id, 'scheduled')}
                        className={`text-xs ${
                          record.status === 'scheduled' 
                            ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300'
                        }`}
                      >
                        Запланирована
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateRecordStatus(record.id, 'completed')}
                        className={`text-xs ${
                          record.status === 'completed' 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-green-100 hover:bg-green-200 text-green-700 border-green-300'
                        }`}
                      >
                        Завершена
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateRecordStatus(record.id, 'cancelled')}
                        className={`text-xs ${
                          record.status === 'cancelled' 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-red-100 hover:bg-red-200 text-red-700 border-red-300'
                        }`}
                      >
                        Отменена
                      </Button>
                      <div className="ml-4">
                        <Button
                          size="sm"
                          onClick={() => {
                            if (window.confirm('Вы уверены, что хотите удалить эту запись? Это действие нельзя отменить.')) {
                              deleteRecord(record.id);
                            }
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white p-2"
                          title="Удалить запись"
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
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
                  
                  {/* Кнопки связи с клиентом */}
                  {record.clientPhone && (
                    <div className="mt-4 pt-3 border-t border-warm-200">
                      <p className="text-sm font-medium text-warm-700 mb-3">Связь с клиентом:</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          onClick={() => window.open('https://zoom.us/start/videomeeting', '_blank')}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                        >
                          <Icon name="Video" size={14} className="mr-1" />
                          Видео
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => {
                            const message = prompt(`Напишите сообщение для ${record.clientName}:`);
                            if (message && message.trim()) {
                              alert(`Сообщение готово к отправке:\n\n"${message}"\n\nДля отправки используйте любой из мессенджеров ниже.`);
                            }
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
                        >
                          <Icon name="Mail" size={14} className="mr-1" />
                          Сообщение
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => window.open(`https://wa.me/${record.clientPhone.replace(/[^0-9]/g, '')}?text=Здравствуйте! Это ваш психолог. Напоминаю о сеансе ${new Date(record.sessionDate).toLocaleDateString('ru-RU')} в ${record.sessionTime}`, '_blank')}
                          className="bg-green-500 hover:bg-green-600 text-white text-xs"
                        >
                          <Icon name="MessageCircle" size={14} className="mr-1" />
                          WhatsApp
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => window.open(`https://t.me/${record.clientPhone.replace(/[^0-9]/g, '')}`, '_blank')}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
                        >
                          <Icon name="Send" size={14} className="mr-1" />
                          Telegram
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => window.open(`sms:${record.clientPhone}?body=Здравствуйте! Это ваш психолог. Напоминаю о сеансе ${new Date(record.sessionDate).toLocaleDateString('ru-RU')} в ${record.sessionTime}`, '_blank')}
                          className="bg-purple-500 hover:bg-purple-600 text-white text-xs"
                        >
                          <Icon name="MessageSquare" size={14} className="mr-1" />
                          SMS
                        </Button>
                      </div>
                    </div>
                  )}
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