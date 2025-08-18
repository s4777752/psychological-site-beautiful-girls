import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface Service {
  name: string;
  price: string;
  icon: string;
}

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-20 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-secondary mb-4">
            Услуги и цены
          </h2>
          <p className="text-lg text-warm-700 max-w-2xl mx-auto">
            Выберите подходящий формат психологической помощи
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardContent className="p-0">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={service.icon} className="text-primary" size={24} />
                </div>
                <h3 className="font-montserrat font-semibold text-secondary mb-2">
                  {service.name}
                </h3>
                <p className="text-2xl font-bold text-primary mb-4">{service.price}</p>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => navigate('/client/login')}
                >
                  Выбрать
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;