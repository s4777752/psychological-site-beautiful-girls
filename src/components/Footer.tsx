import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const [siteSettings, setSiteSettings] = useState({
    siteName: "MindCare",
    contactPhone: "+7 (495) 123-45-67",
    contactEmail: "info@mindcare.ru"
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <>
      {/* Contact Section */}
      <section id="contacts" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-secondary mb-4">
              Контакты
            </h2>
            <p className="text-lg text-warm-700 max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Icon name="Phone" className="text-primary" size={24} />
              </div>
              <h3 className="font-montserrat font-semibold text-secondary mb-2">Телефон</h3>
              <p className="text-warm-700">{siteSettings.contactPhone}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Icon name="Mail" className="text-primary" size={24} />
              </div>
              <h3 className="font-montserrat font-semibold text-secondary mb-2">Email</h3>
              <p className="text-warm-700">{siteSettings.contactEmail}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Icon name="Clock" className="text-primary" size={24} />
              </div>
              <h3 className="font-montserrat font-semibold text-secondary mb-2">Время работы</h3>
              <p className="text-warm-700">Ежедневно 9:00 - 21:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Heart" className="text-primary" size={24} />
                <span className="text-xl font-montserrat font-bold">MindCare</span>
              </div>
              <p className="text-warm-200">
                Профессиональная психологическая помощь онлайн. 
                Мы помогаем людям найти внутреннюю гармонию и решить жизненные проблемы.
              </p>
            </div>
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-warm-200">
                <li>Индивидуальная терапия</li>
                <li>Семейная терапия</li>
                <li>Групповые сеансы</li>
                <li>Экстренная помощь</li>
              </ul>
            </div>
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-warm-200">
                <p>{siteSettings.contactPhone}</p>
                <p>{siteSettings.contactEmail}</p>
                <p>Ежедневно 9:00 - 24:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-warm-600 mt-8 pt-8 text-center text-warm-300">
            <div className="flex justify-between items-center">
              <div>
                <p>&copy; 2024 MindCare. Все права защищены.</p>
                <p className="text-xs text-warm-400 mt-1">ИП Паклин Сергей Васильевич | ИНН 594200005879 | ОГРНИП 305591619400016</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/admin')}
                className="text-warm-400 hover:text-white hover:bg-warm-700 text-xs"
              >
                <Icon name="Settings" size={14} className="mr-1" />
                Администрация
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;