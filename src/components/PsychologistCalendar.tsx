import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import VideoCall from "@/components/VideoCall";

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'therapy' | 'diagnostics';
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface TimeSlot {
  time: string;
  available: boolean;
  appointment?: Appointment;
}

const PsychologistCalendar = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const [currentCallData, setCurrentCallData] = useState<{
    roomId: string;
    clientName: string;
    appointmentId: string;
  } | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      clientName: 'Анна Петрова',
      clientPhone: '+7 (999) 123-45-67',
      date: '2024-08-15',
      time: '10:00',
      duration: 60,
      type: 'therapy',
      notes: 'Повторная сессия, работа с тревожностью',
      status: 'scheduled'
    },
    {
      id: '2',
      clientName: 'Михаил Сидоров',
      clientPhone: '+7 (999) 987-65-43',
      date: '2024-08-15',
      time: '14:00',
      duration: 60,
      type: 'consultation',
      status: 'scheduled'
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    clientName: '',
    clientPhone: '',
    time: '',
    duration: 60,
    type: 'consultation' as Appointment['type'],
    notes: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Генерация временных слотов с 9:00 до 20:00
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const dateStr = selectedDate.toISOString().split('T')[0];
    
    for (let hour = 9; hour <= 19; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const appointment = appointments.find(app => 
          app.date === dateStr && app.time === timeStr
        );
        
        slots.push({
          time: timeStr,
          available: !appointment,
          appointment
        });
      }
    }
    
    return slots;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleAddAppointment = () => {
    if (!newAppointment.clientName || !newAppointment.clientPhone || !newAppointment.time) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    const dateStr = selectedDate.toISOString().split('T')[0];
    
    // Проверяем, что слот свободен
    const existingAppointment = appointments.find(app => 
      app.date === dateStr && app.time === newAppointment.time
    );
    
    if (existingAppointment) {
      toast({
        title: "Ошибка",
        description: "Это время уже занято",
        variant: "destructive"
      });
      return;
    }

    const appointment: Appointment = {
      id: Date.now().toString(),
      clientName: newAppointment.clientName,
      clientPhone: newAppointment.clientPhone,
      date: dateStr,
      time: newAppointment.time,
      duration: newAppointment.duration,
      type: newAppointment.type,
      notes: newAppointment.notes,
      status: 'scheduled'
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({
      clientName: '',
      clientPhone: '',
      time: '',
      duration: 60,
      type: 'consultation',
      notes: ''
    });
    setIsDialogOpen(false);

    toast({
      title: "Успешно",
      description: "Клиент записан на прием"
    });
  };

  const getTypeLabel = (type: Appointment['type']) => {
    const labels = {
      consultation: 'Консультация',
      therapy: 'Терапия',
      diagnostics: 'Диагностика'
    };
    return labels[type];
  };

  const getTypeColor = (type: Appointment['type']) => {
    const colors = {
      consultation: 'bg-blue-100 text-blue-800',
      therapy: 'bg-green-100 text-green-800',
      diagnostics: 'bg-purple-100 text-purple-800'
    };
    return colors[type];
  };

  const handleStartVideoCall = (appointment: Appointment) => {
    const roomId = `session_${appointment.id}_${Date.now()}`;
    
    // Уведомляем клиента о входящем звонке
    toast({
      title: "Звонок клиенту",
      description: `Начинаем видеозвонок с ${appointment.clientName}`
    });

    // Имитируем отправку уведомления клиенту
    // В реальном приложении здесь будет WebSocket или push-уведомление
    
    setCurrentCallData({
      roomId,
      clientName: appointment.clientName,
      appointmentId: appointment.id
    });
    setIsInVideoCall(true);
  };

  const handleEndCall = () => {
    setIsInVideoCall(false);
    setCurrentCallData(null);
    
    toast({
      title: "Звонок завершен",
      description: "Видеосвязь отключена"
    });
  };

  const timeSlots = generateTimeSlots();

  if (isInVideoCall && currentCallData) {
    return (
      <VideoCall
        roomId={currentCallData.roomId}
        userType="psychologist"
        userName="Психолог"
        onEndCall={handleEndCall}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with date navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-warm-800">
              Календарь записей
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-warm-600 hover:bg-warm-700">
                  <Icon name="Plus" className="mr-2" size={16} />
                  Записать клиента
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Новая запись</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="clientName">Имя клиента *</Label>
                    <Input
                      id="clientName"
                      value={newAppointment.clientName}
                      onChange={(e) => setNewAppointment({...newAppointment, clientName: e.target.value})}
                      placeholder="Введите имя"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="clientPhone">Телефон *</Label>
                    <Input
                      id="clientPhone"
                      value={newAppointment.clientPhone}
                      onChange={(e) => setNewAppointment({...newAppointment, clientPhone: e.target.value})}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time">Время *</Label>
                    <Select 
                      value={newAppointment.time} 
                      onValueChange={(value) => setNewAppointment({...newAppointment, time: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите время" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.filter(slot => slot.available).map((slot) => (
                          <SelectItem key={slot.time} value={slot.time}>
                            {slot.time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Тип приема</Label>
                    <Select 
                      value={newAppointment.type} 
                      onValueChange={(value: Appointment['type']) => setNewAppointment({...newAppointment, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Консультация</SelectItem>
                        <SelectItem value="therapy">Терапия</SelectItem>
                        <SelectItem value="diagnostics">Диагностика</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Продолжительность (мин)</Label>
                    <Select 
                      value={newAppointment.duration.toString()} 
                      onValueChange={(value) => setNewAppointment({...newAppointment, duration: parseInt(value)})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">60 минут</SelectItem>
                        <SelectItem value="90">90 минут</SelectItem>
                        <SelectItem value="120">120 минут</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Заметки</Label>
                    <Textarea
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      placeholder="Дополнительная информация"
                      rows={3}
                    />
                  </div>

                  <Button 
                    onClick={handleAddAppointment}
                    className="w-full bg-warm-600 hover:bg-warm-700"
                  >
                    Записать клиента
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => changeDate(-1)}
              className="text-warm-600 border-warm-300"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-warm-800 capitalize">
                {formatDate(selectedDate)}
              </h3>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => changeDate(1)}
              className="text-warm-600 border-warm-300"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calendar grid */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {timeSlots.map((slot) => (
              <div
                key={slot.time}
                className={`p-3 rounded-lg border transition-colors ${
                  slot.available
                    ? 'border-warm-200 bg-warm-50 hover:bg-warm-100'
                    : 'border-warm-300 bg-warm-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-warm-800">{slot.time}</span>
                  {slot.available ? (
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      Свободно
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-600 border-red-300">
                      Занято
                    </Badge>
                  )}
                </div>
                
                {slot.appointment && (
                  <div className="space-y-2">
                    <div className="font-medium text-sm text-warm-800">
                      {slot.appointment.clientName}
                    </div>
                    <div className="text-xs text-warm-600">
                      {slot.appointment.clientPhone}
                    </div>
                    <Badge className={`text-xs ${getTypeColor(slot.appointment.type)}`}>
                      {getTypeLabel(slot.appointment.type)} • {slot.appointment.duration} мин
                    </Badge>
                    {slot.appointment.notes && (
                      <div className="text-xs text-warm-600 italic">
                        {slot.appointment.notes}
                      </div>
                    )}
                    <div className="flex space-x-2 mt-3">
                      <Button
                        size="sm"
                        onClick={() => handleStartVideoCall(slot.appointment!)}
                        className="bg-green-600 hover:bg-green-700 text-white flex-1"
                      >
                        <Icon name="Video" className="mr-1" size={14} />
                        Позвонить
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-warm-600 border-warm-300"
                      >
                        <Icon name="MessageCircle" className="mr-1" size={14} />
                        Чат
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-warm-800 flex items-center">
            <Icon name="Clock" className="mr-2" size={20} />
            Сводка дня
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-warm-50 rounded-lg">
              <div className="text-2xl font-bold text-warm-800">
                {appointments.filter(app => app.date === selectedDate.toISOString().split('T')[0]).length}
              </div>
              <div className="text-sm text-warm-600">Всего записей</div>
            </div>
            <div className="text-center p-4 bg-warm-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {timeSlots.filter(slot => slot.available).length}
              </div>
              <div className="text-sm text-warm-600">Свободных слотов</div>
            </div>
            <div className="text-center p-4 bg-warm-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {appointments
                  .filter(app => app.date === selectedDate.toISOString().split('T')[0])
                  .reduce((total, app) => total + app.duration, 0)
                } мин
              </div>
              <div className="text-sm text-warm-600">Общее время</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PsychologistCalendar;