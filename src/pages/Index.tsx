import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const psychologists = [
    {
      id: 1,
      name: "Анна Смирнова",
      specialization: "Семейная терапия",
      experience: "8 лет",
      image: "/img/6e21af90-d81e-4f4e-b067-43f75a026d70.jpg",
      description: "Специалист по семейным отношениям и детской психологии",
      rating: 4.9,
      sessions: 450,
      price: 2500
    },
    {
      id: 2, 
      name: "Мария Козлова",
      specialization: "Тревожные расстройства",
      experience: "12 лет",
      image: "/img/e46f379d-2965-4b93-832b-a2aa073c0bb0.jpg",
      description: "Эксперт в области работы со стрессом и тревожностью",
      rating: 4.8,
      sessions: 720,
      price: 2500
    },
    {
      id: 3,
      name: "Елена Волкова", 
      specialization: "Личностная терапия",
      experience: "6 лет",
      image: "/img/fd3261af-65ed-4738-b175-5bb7aa8bcc4a.jpg",
      description: "Помогаю в развитии личности и самопознании",
      rating: 4.9,
      sessions: 320,
      price: 2500
    },
    {
      id: 4,
      name: "Дарья Петрова",
      specialization: "Когнитивно-поведенческая терапия",
      experience: "10 лет",
      image: "/img/507d09f6-4ed0-4a89-a012-fa2fba147e52.jpg",
      description: "Специалист по работе с депрессией и фобиями",
      rating: 4.7,
      sessions: 580,
      price: 2500
    },
    {
      id: 5,
      name: "София Романова",
      specialization: "Арт-терапия",
      experience: "7 лет", 
      image: "/img/4b2e6ff1-6a65-483d-9d56-631b510a50d3.jpg",
      description: "Творческий подход к решению внутренних конфликтов",
      rating: 4.8,
      sessions: 380,
      price: 2500
    },
    {
      id: 6,
      name: "Виктория Новикова",
      specialization: "Парная терапия",
      experience: "9 лет",
      image: "/img/b50310a6-0322-4453-a080-ed2a130fc8a9.jpg", 
      description: "Восстанавливаю гармонию в отношениях между партнерами",
      rating: 4.9,
      sessions: 490,
      price: 2500
    }
  ];

  const services = [
    { name: "Индивидуальная консультация", price: "2500 ₽/час", icon: "User" },
    { name: "Семейная терапия", price: "3000 ₽/час", icon: "Users" },
    { name: "Групповая терапия", price: "1500 ₽/час", icon: "UserCheck" },
    { name: "Экстренная помощь", price: "3500 ₽/час", icon: "Phone" }
  ];

  const reviews = [
    { name: "Анна К.", text: "Очень помогла справиться с тревожностью. Рекомендую!", rating: 5 },
    { name: "Михаил Р.", text: "Профессиональный подход и теплая атмосфера.", rating: 5 },
    { name: "Елена Д.", text: "Благодарна за поддержку в трудный период.", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Heart" className="text-primary" size={32} />
              <span className="text-2xl font-montserrat font-bold text-secondary">MindCare</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-secondary hover:text-primary transition-colors">Главная</a>
              <a href="#psychologists" className="text-secondary hover:text-primary transition-colors">Психологи</a>
              <a href="#services" className="text-secondary hover:text-primary transition-colors">Услуги</a>
              <a href="#booking" className="text-secondary hover:text-primary transition-colors">Запись</a>
              <a href="#reviews" className="text-secondary hover:text-primary transition-colors">Отзывы</a>
              <a href="#contacts" className="text-secondary hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Записаться
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
              <Icon name="Calendar" className="mr-2" size={20} />
              Записаться на сеанс
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3">
              <Icon name="Play" className="mr-2" size={20} />
              Как это работает
            </Button>
          </div>
        </div>
      </section>

      {/* Psychologists Section */}
      <section id="psychologists" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-secondary mb-4">
              Наши психологи
            </h2>
            <p className="text-lg text-warm-700 max-w-2xl mx-auto">
              Команда опытных специалистов с высшим психологическим образованием
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {psychologists.map((psychologist) => (
              <Card key={psychologist.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={psychologist.image} 
                    alt={psychologist.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    <Icon name="Calendar" className="mr-2" size={16} />
                    Записаться
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
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
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Выбрать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
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
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-3">
              <Icon name="Calendar" className="mr-2" size={20} />
              Начать запись
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-secondary mb-4">
              Отзывы клиентов
            </h2>
            <p className="text-lg text-warm-700 max-w-2xl mx-auto">
              Что говорят люди о нашей работе
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="p-6 animate-fade-in">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                  <p className="text-warm-700 mb-4 italic">"{review.text}"</p>
                  <p className="font-montserrat font-semibold text-secondary">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
              <p className="text-warm-700">+7 (495) 123-45-67</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Icon name="Mail" className="text-primary" size={24} />
              </div>
              <h3 className="font-montserrat font-semibold text-secondary mb-2">Email</h3>
              <p className="text-warm-700">info@mindcare.ru</p>
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
                <p>+7 (495) 123-45-67</p>
                <p>info@mindcare.ru</p>
                <p>Ежедневно 9:00 - 21:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-warm-600 mt-8 pt-8 text-center text-warm-300">
            <div className="flex justify-between items-center">
              <p>&copy; 2024 MindCare. Все права защищены.</p>
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
    </div>
  );
};

export default Index;