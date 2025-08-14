import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

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
      price: 2500,
      online: true
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
      price: 2500,
      online: true
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
      price: 2500,
      online: true
    },
    {
      id: 4,
      name: "Дарья Петрова",
      specialization: "Когнитивно-поведенческая терапия",
      experience: "10 лет",
      image: "/img/627d201c-55b5-483f-8961-49631ef64850.jpg",
      description: "Специалист по работе с депрессией и фобиями",
      rating: 4.7,
      sessions: 580,
      price: 2500,
      online: true
    },
    {
      id: 5,
      name: "София Романова",
      specialization: "Арт-терапия",
      experience: "7 лет", 
      image: "/img/c980f623-e925-464c-952a-0c895d70770f.jpg",
      description: "Творческий подход к решению внутренних конфликтов",
      rating: 4.8,
      sessions: 380,
      price: 2500,
      online: true
    },
    {
      id: 6,
      name: "Виктория Новикова",
      specialization: "Парная терапия",
      experience: "9 лет",
      image: "/img/111be528-b72b-4311-8912-6b1db824e78d.jpg", 
      description: "Восстанавливаю гармонию в отношениях между партнерами",
      rating: 4.9,
      sessions: 490,
      price: 2500,
      online: true
    }
  ];

  const features = [
    {
      icon: "Video",
      title: "Онлайн видео-сеансы",
      description: "Качественная связь через веб-камеру в любое время"
    },
    {
      icon: "Shield",
      title: "Полная конфиденциальность", 
      description: "Защищенные сеансы с соблюдением врачебной тайны"
    },
    {
      icon: "CreditCard",
      title: "Удобная оплата",
      description: "Безопасная онлайн оплата картой или электронными деньгами"
    },
    {
      icon: "Calendar",
      title: "Гибкое расписание",
      description: "Записывайтесь на удобное время 24/7"
    }
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  const handleBooking = (psychologist) => {
    setSelectedPsychologist(psychologist);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handlePayment = () => {
    alert("Переходим к оплате 2500₽. В реальном проекте здесь будет интеграция с платежной системой.");
  };

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-warm-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
        <div className="container mx-auto text-center">
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
            
            {/* Price Highlight */}

          </div>
        </div>
      </section>

      {/* Features */}
      <section id="psychologists" className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-secondary mb-4">
              Наши психологи
            </h2>
            <p className="text-lg text-warm-700 max-w-2xl mx-auto">
              Команда опытных специалистов с высшим психологическим образованием
            </p>
          </div>
        </div>
      </section>

      {/* Specialists */}


          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {psychologists.map((psychologist) => (
              <Card key={psychologist.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in">
                <div className="relative">
                  <img 
                    src={psychologist.image} 
                    alt={psychologist.name}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-white">
                      <Icon name="Circle" size={8} className="mr-1 fill-current" />
                      Онлайн
                    </Badge>
                  </div>
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
                  

                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white" onClick={() => handleBooking(psychologist)}>
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
              Качественные онлайн консультации по доступным ценам
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardContent className="p-0">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="User" className="text-primary" size={24} />
                </div>
                <h3 className="font-montserrat font-semibold text-secondary mb-2">
                  Индивидуальная консультация
                </h3>
                <p className="text-2xl font-bold text-primary mb-4">2500 ₽/час</p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" onClick={() => document.getElementById('psychologists')?.scrollIntoView({behavior: 'smooth'})}>
                  Выбрать
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardContent className="p-0">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" className="text-primary" size={24} />
                </div>
                <h3 className="font-montserrat font-semibold text-secondary mb-2">
                  Семейная терапия
                </h3>
                <p className="text-2xl font-bold text-primary mb-4">3000 ₽/час</p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Выбрать
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardContent className="p-0">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="UserCheck" className="text-primary" size={24} />
                </div>
                <h3 className="font-montserrat font-semibold text-secondary mb-2">
                  Групповая терапия
                </h3>
                <p className="text-2xl font-bold text-primary mb-4">1500 ₽/час</p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Выбрать
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <CardContent className="p-0">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" className="text-primary" size={24} />
                </div>
                <h3 className="font-montserrat font-semibold text-secondary mb-2">
                  Экстренная помощь
                </h3>
                <p className="text-2xl font-bold text-primary mb-4">3500 ₽/час</p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Выбрать
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedPsychologist && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Запись к специалисту</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSelectedPsychologist(null);
                    setSelectedTime("");
                  }}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="flex items-center mb-4">
                <img 
                  src={selectedPsychologist.image} 
                  alt={selectedPsychologist.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{selectedPsychologist.name}</h4>
                  <p className="text-sm text-gray-600">{selectedPsychologist.specialization}</p>
                  <p className="text-lg font-bold text-primary">{selectedPsychologist.price} ₽/час</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Выберите дату</label>
                  <input 
                    type="date" 
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Время</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(time => (
                      <Button key={time} variant="outline" size="sm" className="text-sm">
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ваше имя</label>
                  <input 
                    type="text" 
                    placeholder="Введите имя"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <input 
                    type="tel" 
                    placeholder="+7 (999) 123-45-67"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>



                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3" onClick={handlePayment}>
                  <Icon name="CreditCard" size={16} className="mr-2" />
                  Оплатить и записаться
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
            <p>&copy; 2024 MindCare. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;