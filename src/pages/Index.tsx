import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    name: '',
    text: '',
    rating: 5
  });
  const [userReviews, setUserReviews] = useState<Array<{name: string, text: string, rating: number, replies?: Array<{name: string, text: string, timestamp: Date}>}>>([]);
  const [showReplyForm, setShowReplyForm] = useState<{show: boolean, reviewIndex: number}>({show: false, reviewIndex: -1});
  const [replyFormData, setReplyFormData] = useState({name: '', text: ''});
  const [editingReply, setEditingReply] = useState<{show: boolean, reviewIndex: number, replyIndex: number}>({show: false, reviewIndex: -1, replyIndex: -1});
  const [editReplyData, setEditReplyData] = useState({name: '', text: ''});
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginData, setLoginData] = useState({username: '', password: ''});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'psychologist' | 'manager' | null>(null);
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

  const defaultReviews = [
    { 
      name: "Анна К.", 
      text: "Очень помогла справиться с тревожностью. Рекомендую!", 
      rating: 5,
      replies: [
        { name: "Анна Смирнова", text: "Спасибо большое за отзыв! Очень рада, что смогла помочь вам.", timestamp: new Date('2024-12-20') }
      ]
    },
    { name: "Михаил Р.", text: "Профессиональный подход и теплая атмосфера.", rating: 5 },
    { name: "Елена Д.", text: "Благодарна за поддержку в трудный период.", rating: 5 }
  ];

  const allReviews = [...defaultReviews, ...userReviews];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewFormData.name && reviewFormData.text) {
      setUserReviews(prev => [...prev, { ...reviewFormData, replies: [] }]);
      setReviewFormData({ name: '', text: '', rating: 5 });
      setShowReviewForm(false);
      alert('Спасибо за ваш отзыв! Он появится на сайте.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Получаем учетные данные из системы личных кабинетов
    const getPsychologists = () => {
      const psychologists = JSON.parse(localStorage.getItem("psychologists") || "[]");
      return psychologists.filter((p: any) => p.isActive).map((p: any) => ({
        username: p.login,
        password: p.password,
        name: p.name,
        role: 'psychologist' as const
      }));
    };

    const psychologistCredentials = [
      ...getPsychologists(),
      { username: 's4777752@ya.ru', password: '89024777752s', name: 'Управляющий центра', role: 'manager' as const }
    ];

    const user = psychologistCredentials.find(
      cred => cred.username === loginData.username && cred.password === loginData.password
    );

    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      setReplyFormData({ name: user.name, text: '' });
      setShowLoginForm(false);
      setLoginData({ username: '', password: '' });
    } else {
      alert('Неверные данные для входа');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setReplyFormData({ name: '', text: '' });
  };

  const handleReplyClick = (reviewIndex: number) => {
    if (isAuthenticated) {
      setShowReplyForm({ show: true, reviewIndex });
    } else {
      setShowLoginForm(true);
      setShowReplyForm({ show: false, reviewIndex }); // Запоминаем индекс для позже
    }
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyFormData.name && replyFormData.text && isAuthenticated) {
      const reviewIndex = showReplyForm.reviewIndex;
      
      if (reviewIndex < defaultReviews.length) {
        // Если это базовый отзыв, добавляем ответ в defaultReviews (но это временно, в реальном приложении нужна база данных)
        alert('Ответ добавлен! В реальном приложении ответы сохраняются в базе данных.');
      } else {
        // Если это пользовательский отзыв
        const userReviewIndex = reviewIndex - defaultReviews.length;
        setUserReviews(prev => prev.map((review, index) => 
          index === userReviewIndex 
            ? { 
                ...review, 
                replies: [...(review.replies || []), { 
                  name: replyFormData.name, 
                  text: replyFormData.text, 
                  timestamp: new Date() 
                }] 
              }
            : review
        ));
      }
      
      setReplyFormData({ name: replyFormData.name, text: '' }); // Оставляем имя
      setShowReplyForm({ show: false, reviewIndex: -1 });
    }
  };

  // Функция для начала редактирования ответа
  const handleEditReply = (reviewIndex: number, replyIndex: number, reply: {name: string, text: string}) => {
    setEditReplyData({name: reply.name, text: reply.text});
    setEditingReply({show: true, reviewIndex, replyIndex});
  };

  // Функция для сохранения отредактированного ответа
  const handleSaveEditReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (editReplyData.text && isAuthenticated) {
      const reviewIndex = editingReply.reviewIndex;
      const replyIndex = editingReply.replyIndex;
      
      if (reviewIndex < defaultReviews.length) {
        // Если это базовый отзыв, показываем уведомление
        alert('Ответ обновлен! В реальном приложении изменения сохраняются в базе данных.');
      } else {
        // Если это пользовательский отзыв, обновляем ответ
        const userReviewIndex = reviewIndex - defaultReviews.length;
        setUserReviews(prev => prev.map((review, index) => 
          index === userReviewIndex 
            ? { 
                ...review, 
                replies: review.replies?.map((reply, idx) => 
                  idx === replyIndex 
                    ? { ...reply, text: editReplyData.text } 
                    : reply
                ) || []
              }
            : review
        ));
      }
      
      setEditingReply({show: false, reviewIndex: -1, replyIndex: -1});
      setEditReplyData({name: '', text: ''});
    }
  };

  // Функция для удаления ответа
  const handleDeleteReply = (reviewIndex: number, replyIndex: number) => {
    if (confirm('Вы действительно хотите удалить этот ответ?')) {
      if (reviewIndex < defaultReviews.length) {
        // Если это базовый отзыв, показываем уведомление
        alert('Ответ удален! В реальном приложении изменения сохраняются в базе данных.');
      } else {
        // Если это пользовательский отзыв, удаляем ответ
        const userReviewIndex = reviewIndex - defaultReviews.length;
        setUserReviews(prev => prev.map((review, index) => 
          index === userReviewIndex 
            ? { 
                ...review, 
                replies: review.replies?.filter((_, idx) => idx !== replyIndex) || []
              }
            : review
        ));
      }
    }
  };

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Heart" className="text-primary" size={32} />
              <span className="text-2xl font-montserrat font-bold text-secondary">Психологическая помощь</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-secondary hover:text-primary transition-colors">Главная</a>
              <a href="#psychologists" className="text-secondary hover:text-primary transition-colors">Психологи</a>
              <a href="#services" className="text-secondary hover:text-primary transition-colors">Услуги</a>
              <a href="#booking" className="text-secondary hover:text-primary transition-colors">Запись</a>
              <a href="#reviews" className="text-secondary hover:text-primary transition-colors">Отзывы</a>
              <a href="#contacts" className="text-secondary hover:text-primary transition-colors">Контакты</a>
            </nav>
            <div className="flex space-x-2">
              <Button 
                onClick={() => navigate('/client/login')}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Icon name="User" className="mr-2" size={16} />
                Войти как клиент
              </Button>
              <Button 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => navigate('/client/login')}
              >
                Записаться
              </Button>
            </div>
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
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
              onClick={() => navigate('/client/login')}
            >
              <Icon name="Calendar" className="mr-2" size={20} />
              Записаться на сеанс
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
              onClick={() => setIsVideoDialogOpen(true)}
            >
              <Icon name="Play" className="mr-2" size={20} />
              Как это работает
            </Button>
          </div>
        </div>
      </section>

      {/* Psychologists Section */}
      <section id="psychologists" className="py-20 bg-warm-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-white mb-4">
              Наши психологи
            </h2>
            <p className="text-lg text-warm-100 max-w-2xl mx-auto">
              Команда опытных специалистов с высшим психологическим образованием
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {psychologists.map((psychologist) => (
              <Card key={psychologist.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in border-4 border-warm-300">
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
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => navigate('/client/login')}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {allReviews.map((review, index) => (
              <Card key={index} className="p-6 animate-fade-in">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                  <p className="text-warm-700 mb-4 italic">"{review.text}"</p>
                  <p className="font-montserrat font-semibold text-secondary mb-3">{review.name}</p>
                  
                  {/* Replies */}
                  {review.replies && review.replies.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {review.replies.map((reply, replyIndex) => (
                        <div key={replyIndex} className="bg-warm-50 p-3 rounded-lg border-l-4 border-primary">
                          <p className="text-sm text-warm-700 mb-2">"{reply.text}"</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <p className="text-xs font-medium text-primary">{reply.name}</p>
                              <p className="text-xs text-warm-500">
                                {reply.timestamp.toLocaleDateString('ru-RU')}
                              </p>
                            </div>
                            {isAuthenticated && (
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditReply(index, replyIndex, reply)}
                                  className="h-6 w-6 p-0 text-primary hover:bg-primary hover:text-white"
                                >
                                  <Icon name="Edit2" size={12} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteReply(index, replyIndex)}
                                  className="h-6 w-6 p-0 text-red-500 hover:bg-red-500 hover:text-white"
                                >
                                  <Icon name="Trash2" size={12} />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Reply Button */}
                  <div className="mt-4 pt-3 border-t border-warm-200 flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReplyClick(index)}
                      className="text-primary border-primary hover:bg-primary hover:text-white text-xs"
                    >
                      <Icon name="MessageCircle" className="mr-1" size={14} />
                      {isAuthenticated ? 'Ответить' : 'Войти и ответить'}
                    </Button>
                    
                    {isAuthenticated && (
                      <div className="flex items-center text-xs text-primary">
                        <Icon name="User" className="mr-1" size={12} />
                        <span>{replyFormData.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleLogout}
                          className="ml-2 text-xs h-6 px-2"
                        >
                          Выйти
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Review Button */}
          <div className="text-center">
            <Button 
              onClick={() => setShowReviewForm(true)}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
            >
              <Icon name="Plus" className="mr-2" size={20} />
              Оставить отзыв
            </Button>
          </div>

          {/* Review Form Modal */}
          {showReviewForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-secondary">Оставить отзыв</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReviewForm(false)}
                    className="p-1"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      value={reviewFormData.name}
                      onChange={(e) => setReviewFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Оценка
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewFormData(prev => ({ ...prev, rating: star }))}
                          className="focus:outline-none"
                        >
                          <Icon 
                            name="Star" 
                            className={`${star <= reviewFormData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} transition-colors`}
                            size={24} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Ваш отзыв
                    </label>
                    <textarea
                      value={reviewFormData.text}
                      onChange={(e) => setReviewFormData(prev => ({ ...prev, text: e.target.value }))}
                      className="w-full px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Поделитесь вашим опытом..."
                      required
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                      className="flex-1"
                    >
                      Отменить
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    >
                      Отправить отзыв
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Reply Form Modal */}
          {showReplyForm.show && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-secondary">Ответить на отзыв</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplyForm({ show: false, reviewIndex: -1 })}
                    className="p-1"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>

                <form onSubmit={handleSubmitReply} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Имя специалиста
                    </label>
                    <input
                      type="text"
                      value={replyFormData.name}
                      className="w-full px-3 py-2 border border-warm-300 rounded-lg bg-warm-50 text-warm-700"
                      readOnly
                    />
                    <p className="text-xs text-warm-600 mt-1">
                      Вы вошли как {userRole === 'psychologist' ? 'психолог' : 'управляющий'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Ваш ответ
                    </label>
                    <textarea
                      value={replyFormData.text}
                      onChange={(e) => setReplyFormData(prev => ({ ...prev, text: e.target.value }))}
                      className="w-full px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Напишите ваш ответ..."
                      required
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReplyForm({ show: false, reviewIndex: -1 })}
                      className="flex-1"
                    >
                      Отменить
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    >
                      Отправить ответ
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Login Form Modal */}
          {showLoginForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-secondary">Вход для специалистов</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLoginForm(false)}
                    className="p-1"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Логин
                    </label>
                    <input
                      type="text"
                      value={loginData.username}
                      onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Введите логин"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Пароль
                    </label>
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Введите пароль"
                      required
                    />
                  </div>

                  <div className="bg-warm-50 p-3 rounded-lg text-sm text-warm-700">
                    <p className="font-medium mb-2">Учетные данные из личных кабинетов:</p>
                    <p><strong>Психологи:</strong> anna_petrov / secure123</p>
                    <p><strong></strong> mikhail_sid / pass456</p>
                    <p><strong>Управляющий:</strong> s4777752@ya.ru / 89024777752s</p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowLoginForm(false)}
                      className="flex-1"
                    >
                      Отменить
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    >
                      Войти
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Reply Form Modal */}
          {editingReply.show && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-secondary">Редактировать ответ</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingReply({show: false, reviewIndex: -1, replyIndex: -1})}
                    className="text-warm-500 hover:text-warm-700"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>

                <form onSubmit={handleSaveEditReply} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Имя специалиста
                    </label>
                    <input
                      type="text"
                      value={editReplyData.name}
                      className="w-full px-3 py-2 border border-warm-300 rounded-lg bg-warm-50 text-warm-700"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Редактировать ответ
                    </label>
                    <textarea
                      value={editReplyData.text}
                      onChange={(e) => setEditReplyData(prev => ({ ...prev, text: e.target.value }))}
                      className="w-full px-3 py-2 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Отредактируйте ваш ответ..."
                      required
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditingReply({show: false, reviewIndex: -1, replyIndex: -1})}
                      className="flex-1"
                    >
                      Отменить
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    >
                      Сохранить
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
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

      {/* Video Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] p-0">
          <DialogHeader className="px-6 py-4">
            <DialogTitle>Как работает психологическая помощь онлайн</DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Как работает психологическая помощь онлайн"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="mt-4 space-y-3">
              <h3 className="font-semibold text-lg">Простые шаги к психологической поддержке:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                  <div>
                    <p className="font-medium">Регистрация</p>
                    <p className="text-gray-600">Создайте аккаунт и заполните профиль</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                  <div>
                    <p className="font-medium">Выбор специалиста</p>
                    <p className="text-gray-600">Найдите психолога по специализации</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                  <div>
                    <p className="font-medium">Онлайн сеанс</p>
                    <p className="text-gray-600">Проведите сеанс через видеосвязь</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;