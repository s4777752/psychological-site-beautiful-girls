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

  // Получаем записи с главной страницы (bookings)
  const [bookings] = useState(() => {
    const saved = localStorage.getItem('bookings');
    const allBookings = saved ? JSON.parse(saved) : [];
    // Фильтруем только записи этого психолога
    return allBookings.filter((booking: any) => 
      booking.psychologistName === psychologist?.name
    );
  });

  // Объединяем все записи для отображения
  const getAllRecords = () => {
    const allRecords = [];
    
    // Добавляем ручные записи
    manualRecords.forEach(record => {
      allRecords.push({
        ...record,
        source: 'manual'
      });
    });
    
    // Добавляем записи с главной страницы
    bookings.forEach((booking: any) => {
      allRecords.push({
        id: booking.id,
        clientName: booking.clientName,
        clientEmail: booking.clientEmail,
        clientPhone: booking.clientPhone,
        sessionType: 'Онлайн-запись',
        sessionDate: booking.date,
        sessionTime: booking.time,
        price: booking.amount || 2500,
        notes: '',
        status: booking.status === 'paid' ? 'scheduled' : booking.status,
        createdAt: booking.createdAt,
        source: 'online'
      });
    });
    
    // Сортируем по дате и времени
    return allRecords.sort((a, b) => {
      const dateA = new Date(a.sessionDate + ' ' + a.sessionTime);
      const dateB = new Date(b.sessionDate + ' ' + b.sessionTime);
      return dateA.getTime() - dateB.getTime();
    });
  };
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
    // Ищем запись в ручных записях
    const manualRecord = manualRecords.find(record => record.id === id);
    
    // Ищем запись в онлайн-записях
    let onlineRecord = null;
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const onlineRecordIndex = allBookings.findIndex((booking: any) => booking.id === id);
    if (onlineRecordIndex !== -1) {
      onlineRecord = allBookings[onlineRecordIndex];
    }
    
    const recordToUpdate = manualRecord || onlineRecord;
    
    // Если запись отменяется, удаляем её полностью
    if (status === 'cancelled') {
      if (manualRecord) {
        // Удаляем из ручных записей
        const updatedRecords = manualRecords.filter(record => record.id !== id);
        setManualRecords(updatedRecords);
        localStorage.setItem('manualRecords', JSON.stringify(updatedRecords));
      } else if (onlineRecord) {
        // Обновляем статус онлайн-записи
        allBookings[onlineRecordIndex].status = 'cancelled';
        localStorage.setItem('bookings', JSON.stringify(allBookings));
      }
      
      // Освобождаем слот в расписании
      if (recordToUpdate && psychologist?.name) {
        const psychologistScheduleKey = `psychologistSchedule_${psychologist.name.replace(/\s+/g, '_')}`;
        const scheduleData = JSON.parse(localStorage.getItem(psychologistScheduleKey) || '{}');
        
        const dateKey = manualRecord ? recordToUpdate.sessionDate : recordToUpdate.date;
        const timeKey = manualRecord ? recordToUpdate.sessionTime : recordToUpdate.time;
        
        if (scheduleData[dateKey]) {
          scheduleData[dateKey] = scheduleData[dateKey].map((slot: any) => {
            if (slot.time === timeKey) {
              return { ...slot, booked: false };
            }
            return slot;
          });
          localStorage.setItem(psychologistScheduleKey, JSON.stringify(scheduleData));
        }
      }
    } else {
      // Для других статусов просто обновляем
      if (manualRecord) {
        const updatedRecords = manualRecords.map(record => 
          record.id === id ? { ...record, status } : record
        );
        setManualRecords(updatedRecords);
        localStorage.setItem('manualRecords', JSON.stringify(updatedRecords));
      } else if (onlineRecord) {
        allBookings[onlineRecordIndex].status = status;
        localStorage.setItem('bookings', JSON.stringify(allBookings));
      }
    }
    
    // Принудительно обновляем компонент
    window.location.reload();
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
        {/* Все записи */}
        {getAllRecords().length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-warm-800">Все записи ({getAllRecords().length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {getAllRecords().map((record) => (
                <div key={record.id} className="border border-warm-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-warm-800">{record.sessionType}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          record.source === 'manual' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {record.source === 'manual' ? 'Ручная' : 'Онлайн'}
                        </span>
                      </div>
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