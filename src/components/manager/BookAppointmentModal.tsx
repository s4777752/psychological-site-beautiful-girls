import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (appointment: AppointmentData) => void;
}

interface AppointmentData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  psychologistId: string;
  date: string;
  time: string;
  type: string;
  notes: string;
}

const BookAppointmentModal = ({ isOpen, onClose, onBookAppointment }: BookAppointmentModalProps) => {
  const [formData, setFormData] = useState<AppointmentData>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    psychologistId: "",
    date: "",
    time: "",
    type: "Индивидуальная терапия",
    notes: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const psychologists = [
    { id: "1", name: "Мария Козлова" },
    { id: "2", name: "Анна Смирнова" },
    { id: "3", name: "Елена Волкова" },
    { id: "4", name: "Дарья Петрова" }
  ];

  const sessionTypes = [
    "Индивидуальная терапия",
    "Семейная терапия",
    "Личностная терапия",
    "КПТ",
    "Тревожные расстройства",
    "Работа с депрессией"
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
    "21:00", "22:00", "23:00"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Имя клиента обязательно";
    }
    if (formData.clientEmail.trim() && !/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = "Некорректный email";
    }
    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = "Телефон обязателен";
    }
    if (!formData.psychologistId) {
      newErrors.psychologistId = "Выберите психолога";
    }
    if (!formData.date) {
      newErrors.date = "Выберите дату";
    }
    if (!formData.time) {
      newErrors.time = "Выберите время";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onBookAppointment(formData);
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      psychologistId: "",
      date: "",
      time: "",
      type: "Индивидуальная терапия",
      notes: ""
    });
    setErrors({});
  };

  const handleInputChange = (field: keyof AppointmentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-warm-800">
            <Icon name="Calendar" className="mr-2" size={24} />
            Запись клиента к психологу
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Информация о клиенте */}
          <div className="space-y-4 p-4 bg-warm-50 rounded-lg">
            <h3 className="font-semibold text-warm-800">Информация о клиенте</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientName" className="text-warm-700">
                  Имя клиента *
                </Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                  className={`mt-1 ${errors.clientName ? "border-red-500" : "border-warm-300"}`}
                  placeholder="Введите имя клиента"
                />
                {errors.clientName && (
                  <span className="text-sm text-red-500">{errors.clientName}</span>
                )}
              </div>

              <div>
                <Label htmlFor="clientPhone" className="text-warm-700">
                  Телефон *
                </Label>
                <Input
                  id="clientPhone"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                  className={`mt-1 ${errors.clientPhone ? "border-red-500" : "border-warm-300"}`}
                  placeholder="+7 (xxx) xxx-xx-xx"
                />
                {errors.clientPhone && (
                  <span className="text-sm text-red-500">{errors.clientPhone}</span>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="clientEmail" className="text-warm-700">
                Email
              </Label>
              <Input
                id="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                className={`mt-1 ${errors.clientEmail ? "border-red-500" : "border-warm-300"}`}
                placeholder="email@example.com"
              />
              {errors.clientEmail && (
                <span className="text-sm text-red-500">{errors.clientEmail}</span>
              )}
            </div>
          </div>

          {/* Детали записи */}
          <div className="space-y-4 p-4 bg-warm-50 rounded-lg">
            <h3 className="font-semibold text-warm-800">Детали записи</h3>
            
            <div>
              <Label htmlFor="psychologist" className="text-warm-700">
                Психолог *
              </Label>
              <select
                id="psychologist"
                value={formData.psychologistId}
                onChange={(e) => handleInputChange("psychologistId", e.target.value)}
                className={`mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-warm-500 ${
                  errors.psychologistId ? "border-red-500" : "border-warm-300"
                }`}
              >
                <option value="">Выберите психолога</option>
                {psychologists.map((psychologist) => (
                  <option key={psychologist.id} value={psychologist.id}>
                    {psychologist.name}
                  </option>
                ))}
              </select>
              {errors.psychologistId && (
                <span className="text-sm text-red-500">{errors.psychologistId}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-warm-700">
                  Дата *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className={`mt-1 ${errors.date ? "border-red-500" : "border-warm-300"}`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && (
                  <span className="text-sm text-red-500">{errors.date}</span>
                )}
              </div>

              <div>
                <Label htmlFor="time" className="text-warm-700">
                  Время *
                </Label>
                <select
                  id="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className={`mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-warm-500 ${
                    errors.time ? "border-red-500" : "border-warm-300"
                  }`}
                >
                  <option value="">Выберите время</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <span className="text-sm text-red-500">{errors.time}</span>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="type" className="text-warm-700">
                Тип сессии
              </Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-warm-300 rounded-md focus:outline-none focus:ring-2 focus:ring-warm-500"
              >
                {sessionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="notes" className="text-warm-700">
                Заметки
              </Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-warm-300 rounded-md focus:outline-none focus:ring-2 focus:ring-warm-500"
                rows={3}
                placeholder="Дополнительная информация о записи..."
              />
            </div>
          </div>

          {/* Действия */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                handleReset();
                onClose();
              }}
              className="border-warm-300 text-warm-600 hover:bg-warm-50"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="bg-warm-600 hover:bg-warm-700 text-white"
            >
              <Icon name="Calendar" className="mr-2" size={16} />
              Записать клиента
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;