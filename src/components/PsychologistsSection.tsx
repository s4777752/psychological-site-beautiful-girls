import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Psychologist {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  image: string;
  description: string;
  rating: number;
  sessions: number;
  price: number;
}

interface PsychologistsSectionProps {
  psychologists: Psychologist[];
  onBookingClick: (name: string, specialty: string) => void;
  onAvatarClick: (image: string, name: string) => void;
}

const PsychologistsSection = ({ psychologists, onBookingClick, onAvatarClick }: PsychologistsSectionProps) => {
  return (
    <section id="psychologists" className="py-20 bg-warm-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-white mb-4">
            Наши психологи
          </h2>
          <p className="text-lg text-warm-100 max-w-2xl mx-auto">Команда опытных специалистов с психологическим образованием</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {psychologists.map((psychologist) => (
            <Card key={psychologist.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in border-4 border-warm-300">
              <div className="aspect-[4/3] overflow-hidden cursor-pointer">
                <img 
                  src={psychologist.image} 
                  alt={psychologist.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onClick={() => onAvatarClick(psychologist.image, psychologist.name)}
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-montserrat font-semibold text-secondary">
                    {psychologist.name}
                  </h3>
                  <Badge variant="secondary" className="bg-accent text-secondary">
                    {psychologist.experience}
                  </Badge>
                </div>
                <p className="text-primary font-medium mb-3">{psychologist.specialization}</p>
                <p className="text-warm-700 text-sm mb-4">{psychologist.description}</p>
                
                <div className="flex items-center justify-between mb-4 text-sm text-warm-600">
                  <div className="flex items-center">
                    <Icon name="Star" size={16} className="text-yellow-400 mr-1 fill-current" />
                    <span>{psychologist.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Timer" size={16} className="mr-1" />
                    <span>50 мин</span>
                  </div>
                  <div className="font-semibold text-secondary">
                    {psychologist.price.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => onBookingClick(psychologist.name, psychologist.specialization)}
                >
                  <Icon name="Calendar" className="mr-2" size={16} />
                  Записаться
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PsychologistsSection;