import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface ClientAuth {
  id: string;
  name: string;
  phone: string;
  psychologist: string;
  nextSession: string;
}

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

interface QuickInfoCardsProps {
  client: ClientAuth;
  sessions: Session[];
  nextSession?: Session;
}

const QuickInfoCards = ({ client, sessions, nextSession }: QuickInfoCardsProps) => {
  return (
    <div className="mb-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-warm-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="/img/6e21af90-d81e-4f4e-b067-43f75a026d70.jpg" 
                  alt={client.psychologist}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-warm-600">Ваш психолог</p>
                <p className="font-semibold text-warm-800">{client.psychologist}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warm-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="Clock" className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-warm-600">Следующий сеанс</p>
                <p className="font-semibold text-warm-800">
                  {nextSession ? 
                    `${new Date(nextSession.date).toLocaleDateString('ru-RU')} в ${nextSession.time}` :
                    'Не запланирован'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warm-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-warm-600">Всего сеансов</p>
                <p className="font-semibold text-warm-800">
                  {sessions.filter(s => s.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickInfoCards;