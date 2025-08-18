import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface EmptyPsychologistStateProps {
  onAddPsychologist: () => void;
}

const EmptyPsychologistState = ({ onAddPsychologist }: EmptyPsychologistStateProps) => {
  return (
    <Card className="border-warm-200">
      <CardContent className="p-12 text-center">
        <Icon name="Users" className="mx-auto text-warm-400 mb-4" size={48} />
        <h3 className="text-lg font-medium text-warm-700 mb-2">Нет психологов</h3>
        <p className="text-warm-600 mb-4">Добавьте первого психолога для начала работы</p>
        <Button 
          className="bg-warm-600 hover:bg-warm-700"
          onClick={onAddPsychologist}
        >
          <Icon name="UserPlus" className="mr-2" size={16} />
          Добавить психолога
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyPsychologistState;