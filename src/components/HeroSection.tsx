import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onVideoClick: () => void;
}

const HeroSection = ({ onVideoClick }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <section id="home" className="py-20 bg-gradient-to-br from-warm-50 to-warm-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-montserrat font-bold text-secondary mb-6 animate-fade-in">
          Онлайн психологическая помощь
        </h1>
        <p className="text-xl text-warm-700 mb-8 max-w-3xl mx-auto animate-fade-in">
          Профессиональная поддержка через видеосвязь в комфортной домашней обстановке. 
          Квалифицированные психологи готовы помочь вам в решении любых жизненных вопросов.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
            onClick={() => window.open('tel:89024777752', '_self')}
          >
            <Icon name="Phone" className="mr-2" size={20} />
            Позвонить
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
            onClick={onVideoClick}
          >
            <Icon name="Play" className="mr-2" size={20} />
            Как это работает
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;