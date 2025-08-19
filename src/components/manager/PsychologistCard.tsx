import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface PsychologistData {
  id: number;
  name: string;
  email: string;
  totalSessions: number;
  totalEarned: number;
  commission: number;
  lastSession: string;
  rating: number;
  clientsCount: number;
}

interface PsychologistCardProps {
  psychologist: PsychologistData;
  onDetailedReport: (psychologist: PsychologistData) => void;
  onPayout: (psychologist: PsychologistData) => void;
}

const PsychologistCard = ({ psychologist, onDetailedReport, onPayout }: PsychologistCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 border border-warm-200 rounded-lg hover:bg-warm-50">
      <div className="flex-1">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="font-semibold text-warm-800">{psychologist.name}</h3>
            <p className="text-sm text-warm-600">{psychologist.email}</p>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-5 gap-4 text-sm">
          <div>
            <span className="text-warm-600">Сеансов: </span>
            <span className="font-medium text-warm-800">{psychologist.totalSessions}</span>
          </div>
          <div>
            <span className="text-warm-600">Общий доход: </span>
            <span className="font-medium text-green-600">₽{psychologist.totalEarned.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-warm-600">Комиссия (45%): </span>
            <span className="font-medium text-blue-600">₽{psychologist.commission.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-warm-600">Клиентов: </span>
            <span className="font-medium text-warm-800">{psychologist.clientsCount}</span>
          </div>
          <div>
            <span className="text-warm-600">Рейтинг: </span>
            <span className="font-medium text-yellow-600">★ {psychologist.rating}</span>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="border-warm-300 text-warm-600 hover:bg-warm-100"
          onClick={() => onDetailedReport(psychologist)}
        >
          <Icon name="FileText" size={14} className="mr-1" />
          Детальный отчёт
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-green-300 text-green-600 hover:bg-green-50"
          onClick={() => onPayout(psychologist)}
        >
          <Icon name="CreditCard" size={14} className="mr-1" />
          Выплатить
        </Button>
      </div>
    </div>
  );
};

export default PsychologistCard;