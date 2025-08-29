import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import BookAppointmentModal from "./BookAppointmentModal";

interface Session {
  id: number;
  clientName: string;
  psychologistName: string;
  date: string;
  time: string;
  status: string;
  type: string;
  duration: string;
  price: number;
}

const ManagerSessionsTab = () => {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      clientName: "Анна Иванова",
      psychologistName: "Мария Козлова",
      date: "2024-08-16",
      time: "14:00",
      status: "upcoming",
      type: "Индивидуальная терапия",
      duration: "50 мин",
      price: 2500
    },
    {
      id: 2,
      clientName: "Сергей Петров",
      psychologistName: "Анна Смирнова",
      date: "2024-08-16",
      time: "16:00",
      status: "in_progress",
      type: "Семейная терапия",
      duration: "50 мин",
      price: 2500
    },
    {
      id: 3,
      clientName: "Елена Козлова",
      psychologistName: "Елена Волкова",
      date: "2024-08-16",
      time: "10:00",
      status: "completed",
      type: "Личностная терапия",
      duration: "50 мин",
      price: 2500
    },
    {
      id: 4,
      clientName: "Дмитрий Орлов",
      psychologistName: "Дарья Петрова",
      date: "2024-08-16",
      time: "18:00",
      status: "upcoming",
      type: "КПТ",
      duration: "50 мин",
      price: 2500
    },
    {
      id: 5,
      clientName: "Ольга Морозова",
      psychologistName: "Мария Козлова",
      date: "2024-08-15",
      time: "15:00",
      status: "completed",
      type: "Тревожные расстройства",
      duration: "50 мин",
      price: 2500
    }
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Предстоящий</Badge>;
      case "in_progress":
        return <Badge className="bg-green-100 text-green-800">В процессе</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Завершен</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Отменен</Badge>;
      default:
        return <Badge>Неизвестно</Badge>;
    }
  };

  const filteredSessions = sessions.filter(session => {
    const matchesFilter = filterStatus === "all" || session.status === filterStatus;
    const matchesSearch = searchTerm === "" || 
      session.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.psychologistName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = sessions
    .filter(s => s.status === "completed")
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warm-800">Управление записями</h2>
        <div className="flex space-x-4">
          <Button
            className="bg-warm-600 hover:bg-warm-700 text-white"
            onClick={() => setIsBookingModalOpen(true)}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Записать клиента
          </Button>
          <Button
            variant="outline"
            className="border-warm-300 text-warm-600 hover:bg-warm-100"
            onClick={() => {
              alert("Синхронизация записей... Функция находится в разработке.");
            }}
          >
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Синхронизировать
          </Button>
          <Input
            placeholder="Поиск по клиенту или психологу..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 border-warm-300 focus:border-warm-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-warm-300 rounded-md focus:border-warm-500"
          >
            <option value="all">Все статусы</option>
            <option value="upcoming">Предстоящие</option>
            <option value="in_progress">В процессе</option>
            <option value="completed">Завершенные</option>
            <option value="cancelled">Отмененные</option>
          </select>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warm-800">{sessions.length}</div>
            <p className="text-sm text-warm-600">Всего записей</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {sessions.filter(s => s.status === "upcoming").length}
            </div>
            <p className="text-sm text-warm-600">Предстоящих</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {sessions.filter(s => s.status === "completed").length}
            </div>
            <p className="text-sm text-warm-600">Завершенных</p>
          </CardContent>
        </Card>
        <Card className="border-warm-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warm-800">₽{totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-warm-600">Доход с завершенных</p>
          </CardContent>
        </Card>
      </div>

      {/* Таблица записей */}
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-warm-800">Список записей</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border border-warm-200 rounded-lg hover:bg-warm-50"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-warm-800">{session.clientName}</h3>
                      <p className="text-sm text-warm-600">Клиент</p>
                    </div>
                    <Icon name="ArrowRight" size={16} className="text-warm-400" />
                    <div>
                      <h3 className="font-semibold text-warm-800">{session.psychologistName}</h3>
                      <p className="text-sm text-warm-600">Психолог</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-warm-600">
                    <span className="flex items-center">
                      <Icon name="Calendar" size={14} className="mr-1" />
                      {session.date}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {session.time}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Timer" size={14} className="mr-1" />
                      {session.duration}
                    </span>
                    <span className="flex items-center">
                      <Icon name="CreditCard" size={14} className="mr-1" />
                      ₽{session.price}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-warm-600">{session.type}</div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(session.status)}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-warm-300 text-warm-600 hover:bg-warm-100"
                    onClick={() => {
                      alert("Синхронизация записи с внешними системами... Функция находится в разработке.");
                    }}
                  >
                    <Icon name="RefreshCw" size={14} className="mr-1" />
                    Синхр.
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-warm-300 text-warm-600 hover:bg-warm-100"
                  >
                    <Icon name="Eye" size={14} className="mr-1" />
                    Подробнее
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <BookAppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookAppointment={(appointmentData) => {
          const psychologists = [
            { id: "1", name: "Мария Козлова" },
            { id: "2", name: "Анна Смирнова" },
            { id: "3", name: "Елена Волкова" },
            { id: "4", name: "Дарья Петрова" }
          ];
          
          const newSession: Session = {
            id: sessions.length + 1,
            clientName: appointmentData.clientName,
            psychologistName: psychologists.find(p => p.id === appointmentData.psychologistId)?.name || "Неизвестный психолог",
            date: appointmentData.date,
            time: appointmentData.time,
            status: "upcoming",
            type: appointmentData.type,
            duration: "50 мин",
            price: 2500
          };
          setSessions([...sessions, newSession]);
        }}
      />
    </div>
  );
};

export default ManagerSessionsTab;