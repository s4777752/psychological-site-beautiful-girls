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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-rose-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-2 rounded-full">
                <Icon name="Heart" className="text-white" size={28} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">PsyOnline</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#specialists" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Специалисты</a>
              <a href="#features" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Услуги</a>
              <a href="#contact" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Контакты</a>
              <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                <Icon name="Phone" size={16} className="mr-2" />
                +7 (495) 123-45-67
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Онлайн психология
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-600 to-pink-500"> для современных людей</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Профессиональная психологическая помощь через видео-связь с красивыми и квалифицированными специалистами. Записывайтесь на сеанс и получайте поддержку, не выходя из дома.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                onClick={() => document.getElementById('specialists')?.scrollIntoView({behavior: 'smooth'})}
              >
                <Icon name="Video" size={20} className="mr-2" />
                Выбрать психолога
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 px-10 py-4 text-lg font-semibold hover:bg-gray-50">
                <Icon name="Play" size={20} className="mr-2" />
                Как это работает
              </Button>
            </div>
            
            {/* Price Highlight */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto border border-rose-200 shadow-xl">
              <div className="text-4xl font-bold text-rose-600 mb-2">2 500 ₽</div>
              <div className="text-gray-700 text-lg font-medium">за 1 час онлайн сеанса</div>
              <div className="text-sm text-gray-500 mt-3">💎 Первая консультация со скидкой 20%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-gray-600">Современный подход к психологической помощи</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:scale-105">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-rose-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name={feature.icon} size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialists */}
      <section id="specialists" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Наши специалисты</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Красивые и профессиональные психологи с многолетним опытом, готовые помочь вам в любое время через видео-связь
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {psychologists.map((psychologist) => (
              <Card key={psychologist.id} className="overflow-hidden border-0 bg-white/70 backdrop-blur-sm hover:bg-white/95 transition-all duration-500 hover:shadow-2xl hover:scale-105 group">
                <div className="relative">
                  <img 
                    src={psychologist.image} 
                    alt={psychologist.name}
                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    {psychologist.online && (
                      <Badge className="bg-green-500 text-white shadow-lg">
                        <Icon name="Circle" size={8} className="mr-1 fill-current animate-pulse" />
                        Онлайн
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 text-gray-800 shadow-lg">
                      <Icon name="Video" size={14} className="mr-1" />
                      Веб-камера
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-800">{psychologist.name}</h3>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-bold text-yellow-700">{psychologist.rating}</span>
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="mb-4 bg-rose-100 text-rose-700 font-medium px-3 py-1">
                    {psychologist.specialization}
                  </Badge>
                  
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{psychologist.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-xl">
                    <span className="flex items-center">
                      <Icon name="Award" size={14} className="mr-1" />
                      Опыт: {psychologist.experience}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Users" size={14} className="mr-1" />
                      {psychologist.sessions} сеансов
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-rose-600">{psychologist.price.toLocaleString()} ₽</div>
                      <div className="text-sm text-gray-500">за час</div>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-semibold px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      onClick={() => handleBooking(psychologist)}
                    >
                      <Icon name="Calendar" size={16} className="mr-2" />
                      Записаться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedPsychologist && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Запись на сеанс</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSelectedPsychologist(null);
                    setSelectedTime("");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>
              
              <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl">
                <img 
                  src={selectedPsychologist.image} 
                  alt={selectedPsychologist.name}
                  className="w-20 h-20 rounded-full object-cover mr-4 border-4 border-white shadow-lg"
                />
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{selectedPsychologist.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">{selectedPsychologist.specialization}</p>
                  <div className="flex items-center">
                    <Icon name="Star" size={14} className="text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-medium">{selectedPsychologist.rating}</span>
                    <span className="text-sm text-gray-500 ml-2">• {selectedPsychologist.sessions} сеансов</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-3 text-gray-700">Выберите дату</label>
                  <input 
                    type="date" 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-3 text-gray-700">Выберите время</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(time => (
                      <Button 
                        key={time} 
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm" 
                        className={`text-sm py-2 ${
                          selectedTime === time 
                            ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white" 
                            : "border-gray-200 hover:border-rose-300 hover:bg-rose-50"
                        }`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-3 text-gray-700">Ваше имя</label>
                  <input 
                    type="text" 
                    placeholder="Введите ваше имя"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-3 text-gray-700">Телефон</label>
                  <input 
                    type="tel" 
                    placeholder="+7 (999) 123-45-67"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="bg-rose-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Стоимость сеанса:</span>
                    <span className="text-2xl font-bold text-rose-600">2 500 ₽</span>
                  </div>
                  <div className="text-sm text-gray-500">1 час видео-консультации</div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  onClick={handlePayment}
                >
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оплатить 2 500 ₽
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-2 rounded-full">
                  <Icon name="Heart" className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold">PsyOnline</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">Профессиональная психологическая помощь онлайн через видео-связь с лучшими специалистами</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Услуги</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">🎥 Онлайн видео-сеансы</li>
                <li className="hover:text-white transition-colors cursor-pointer">👥 Семейная терапия</li>
                <li className="hover:text-white transition-colors cursor-pointer">🧠 Личностная терапия</li>
                <li className="hover:text-white transition-colors cursor-pointer">🚨 Экстренная помощь</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Контакты</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center hover:text-white transition-colors">
                  <Icon name="Phone" size={16} className="mr-2" />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center hover:text-white transition-colors">
                  <Icon name="Mail" size={16} className="mr-2" />
                  info@psyonline.ru
                </li>
                <li className="flex items-center hover:text-white transition-colors">
                  <Icon name="Clock" size={16} className="mr-2" />
                  24/7 доступность
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Следите за нами</h4>
              <div className="flex space-x-4 mb-4">
                <div className="bg-gray-800 p-3 rounded-full hover:bg-rose-500 transition-colors cursor-pointer">
                  <Icon name="MessageCircle" size={20} />
                </div>
                <div className="bg-gray-800 p-3 rounded-full hover:bg-rose-500 transition-colors cursor-pointer">
                  <Icon name="Instagram" size={20} />
                </div>
                <div className="bg-gray-800 p-3 rounded-full hover:bg-rose-500 transition-colors cursor-pointer">
                  <Icon name="Youtube" size={20} />
                </div>
              </div>
              <p className="text-gray-400 text-sm">Подпишитесь для получения полезных советов по психологии</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PsyOnline. Все права защищены. Лицензия на психологическую деятельность.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;