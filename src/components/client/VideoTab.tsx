import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Session {
  id: string;
  date: string;
  time: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  notes?: string;
  psychologist: string;
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  paymentId?: string;
}

interface VideoTabProps {
  nextSession?: Session;
}

const VideoTab = ({ nextSession }: VideoTabProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-warm-800">Видеосвязь</h2>
      
      <Card className="border-warm-200">
        <CardContent className="p-8 text-center">
          {nextSession ? (
            <div className="space-y-6">
              <div className="w-24 h-24 bg-warm-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Video" size={48} className="text-warm-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-warm-800 mb-2">
                  Следующий сеанс
                </h3>
                <p className="text-warm-600 mb-2">
                  {new Date(nextSession.date).toLocaleDateString('ru-RU')} в {nextSession.time}
                </p>
                <p className="text-sm text-warm-500">
                  Психолог: {nextSession.psychologist}
                </p>
              </div>

              <Button 
                onClick={handleConnect}
                disabled={isConnecting}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                {isConnecting ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                    Подключение...
                  </>
                ) : (
                  <>
                    <Icon name="Video" className="mr-2" size={20} />
                    Подключиться к сеансу
                  </>
                )}
              </Button>
              
              <p className="text-xs text-warm-500 mt-4">
                Убедитесь, что у вас есть доступ к камере и микрофону
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Icon name="VideoOff" size={48} className="text-warm-400 mx-auto" />
              <div>
                <h3 className="text-lg font-medium text-warm-600 mb-2">
                  Нет запланированных сеансов
                </h3>
                <p className="text-warm-500">
                  Свяжитесь с вашим психологом для записи на сеанс
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoTab;