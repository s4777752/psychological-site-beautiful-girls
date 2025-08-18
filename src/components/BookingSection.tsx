import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const BookingSection = () => {
  const navigate = useNavigate();

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-montserrat font-bold text-secondary mb-8">
          Записаться на сеанс
        </h2>
        <div className="bg-warm-50 rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-montserrat font-semibold text-secondary mb-2">Выберите психолога</h3>
              <p className="text-warm-700 text-sm">Найдите специалиста по вашему запросу</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-montserrat font-semibold text-secondary mb-2">Выберите время</h3>
              <p className="text-warm-700 text-sm">Удобное время в календаре специалиста</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-montserrat font-semibold text-secondary mb-2">Проведите сеанс</h3>
              <p className="text-warm-700 text-sm">Встреча через защищенную видеосвязь</p>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-12 py-3"
            onClick={() => navigate('/client/login')}
          >
            <Icon name="Calendar" className="mr-2" size={20} />
            Начать запись
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;