import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import PublicBookingCalendar from "@/components/PublicBookingCalendar";

const BookingSection = () => {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);

  if (showCalendar) {
    return (
      <section id="booking" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <Button
              variant="outline"
              onClick={() => setShowCalendar(false)}
              className="mb-4"
            >
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              Вернуться к описанию
            </Button>
          </div>
          <PublicBookingCalendar />
        </div>
      </section>
    );
  }

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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-12 py-3"
              onClick={() => setShowCalendar(true)}
            >
              <Icon name="Calendar" className="mr-2" size={20} />
              Онлайн календарь записи
            </Button>
            
            <span className="text-warm-500 text-sm">или</span>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white px-12 py-3"
              onClick={() => navigate('/client/login')}
            >
              <Icon name="UserPlus" className="mr-2" size={20} />
              Войти в личный кабинет
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;