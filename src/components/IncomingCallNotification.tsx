import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface IncomingCallNotificationProps {
  callerName: string;
  roomId: string;
  onAccept: () => void;
  onDecline: () => void;
  show: boolean;
}

const IncomingCallNotification = ({ 
  callerName, 
  roomId, 
  onAccept, 
  onDecline, 
  show 
}: IncomingCallNotificationProps) => {
  const [timeLeft, setTimeLeft] = useState(30); // 30 секунд на ответ

  useEffect(() => {
    if (!show) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onDecline(); // Автоматически отклоняем после таймаута
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show, onDecline]);

  useEffect(() => {
    if (show) {
      setTimeLeft(30); // Сбрасываем таймер при новом звонке
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-300">
      <Card className="w-full max-w-md mx-4 animate-in zoom-in-95 duration-300">
        <CardContent className="p-8 text-center">
          {/* Пульсирующий аватар */}
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-warm-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Icon name="User" size={40} className="text-white" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-warm-600 rounded-full mx-auto animate-ping opacity-20"></div>
          </div>

          {/* Информация о звонке */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-warm-800 mb-2">
              Входящий видеозвонок
            </h2>
            <p className="text-lg text-warm-700 mb-1">
              {callerName}
            </p>
            <p className="text-sm text-warm-600">
              Психологическая консультация
            </p>
          </div>

          {/* Таймер */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-warm-800">{timeLeft}</span>
            </div>
            <p className="text-xs text-warm-500">секунд до автоотклонения</p>
          </div>

          {/* Кнопки управления */}
          <div className="flex justify-center space-x-6">
            {/* Отклонить */}
            <Button
              size="lg"
              variant="outline"
              onClick={onDecline}
              className="w-16 h-16 rounded-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
            >
              <Icon name="PhoneOff" size={24} />
            </Button>

            {/* Принять */}
            <Button
              size="lg"
              onClick={onAccept}
              className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 text-white animate-pulse"
            >
              <Icon name="Phone" size={24} />
            </Button>
          </div>

          {/* Дополнительные кнопки */}
          <div className="flex justify-center space-x-4 mt-4">
            <Button
              size="sm"
              variant="ghost"
              className="text-warm-600 hover:bg-warm-100"
            >
              <Icon name="MessageSquare" className="mr-2" size={16} />
              Сообщение
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-warm-600 hover:bg-warm-100"
            >
              <Icon name="Clock" className="mr-2" size={16} />
              Перенести
            </Button>
          </div>

          {/* Информация о подключении */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center text-sm text-blue-700">
              <Icon name="Shield" className="mr-2" size={16} />
              Защищенное соединение
            </div>
            <p className="text-xs text-blue-600 mt-1">
              ID сессии: {roomId.slice(-8)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomingCallNotification;