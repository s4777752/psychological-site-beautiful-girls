import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Psychologist } from "@/types/psychologist";

interface PsychologistCardProps {
  psychologist: Psychologist;
  onEdit: (psychologist: Psychologist) => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

const PsychologistCard = ({ psychologist, onEdit, onToggleStatus, onDelete }: PsychologistCardProps) => {
  return (
    <Card className="border-warm-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-warm-100 rounded-full overflow-hidden">
              {psychologist.photo && psychologist.photo !== "/api/placeholder/150/150" ? (
                <img 
                  src={psychologist.photo} 
                  alt={psychologist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" className="text-warm-600" size={24} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold text-warm-800">{psychologist.name}</h3>
                <Badge className={psychologist.isActive ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                  {psychologist.isActive ? "Активен" : "Неактивен"}
                </Badge>
              </div>
              <p className="text-warm-600 mb-1">{psychologist.specialization}</p>
              <p className="text-sm text-warm-500 mb-2">{psychologist.email}</p>
              <p className="text-sm text-warm-700">{psychologist.description}</p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-warm-600">
                <span>Опыт: {psychologist.experience} лет</span>
                <span>Цена: ₽{psychologist.price}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(psychologist)}
              className="text-warm-600 border-warm-300 hover:bg-warm-100"
            >
              <Icon name="Edit" size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleStatus(psychologist.id)}
              className={psychologist.isActive 
                ? "text-green-600 border-green-300 hover:bg-green-50"
                : "text-red-600 border-red-300 hover:bg-red-50"
              }
            >
              <Icon name={psychologist.isActive ? "UserX" : "UserCheck"} size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(psychologist.id)}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>
        
        {/* Данные для входа */}
        <div className="mt-4 p-4 bg-warm-50 rounded-lg border border-warm-200">
          <h4 className="text-sm font-medium text-warm-800 mb-2">Данные для входа в кабинет:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-warm-600">Логин: </span>
              <span className="font-mono bg-white px-2 py-1 rounded border">{psychologist.login}</span>
            </div>
            <div>
              <span className="text-warm-600">Пароль: </span>
              <span className="font-mono bg-white px-2 py-1 rounded border">{psychologist.password}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PsychologistCard;