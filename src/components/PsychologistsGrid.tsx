import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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
  isOnline?: boolean;
}

const PsychologistsGrid: React.FC = () => {
  const psychologists: Psychologist[] = [
    {
      id: 1,
      name: "Анна Смирнова",
      specialization: "Семейная терапия",
      experience: "8 лет",
      image: "/img/709609a5-4a2c-4620-85c0-26ff7678568e.jpg",
      description: "Специалист по семейным отношениям и детской психологии",
      rating: 4.9,
      sessions: 450,
      price: 2500,
      isOnline: true
    },
    {
      id: 2,
      name: "Мария Козлова",
      specialization: "Тревожные расстройства",
      experience: "12 лет",
      image: "/img/aa484c8b-db6a-418c-b2fa-6ecc552a72ac.jpg",
      description: "Эксперт в области работы со стрессом и тревожностью",
      rating: 4.8,
      sessions: 720,
      price: 2500,
      isOnline: true
    },
    {
      id: 3,
      name: "Елена Волкова",
      specialization: "Личностная терапия",
      experience: "6 лет",
      image: "/img/314793dd-0a21-41f5-a6ba-6abba58891e5.jpg",
      description: "Помогаю в развитии личности и самопознании",
      rating: 4.9,
      sessions: 320,
      price: 2500,
      isOnline: false
    },
    {
      id: 4,
      name: "Дарья Петрова",
      specialization: "Когнитивно-поведенческая терапия",
      experience: "10 лет",
      image: "/img/5239e8de-b7dc-4b08-927e-1b7f9f6f7cdf.jpg",
      description: "Специалист по работе с депрессией и фобиями",
      rating: 4.7,
      sessions: 580,
      price: 2500,
      isOnline: true
    },
    {
      id: 5,
      name: "София Романова",
      specialization: "Арт-терапия",
      experience: "7 лет",
      image: "/img/f2effb86-7055-464e-9be7-7162f7d3eee3.jpg",
      description: "Творческий подход к решению внутренних конфликтов",
      rating: 4.8,
      sessions: 380,
      price: 2500,
      isOnline: true
    },
    {
      id: 6,
      name: "Виктория Новикова",
      specialization: "Парная терапия",
      experience: "9 лет",
      image: "/img/29e8257d-8db2-4f36-b298-1133a31b71c3.jpg",
      description: "Восстанавливаю гармонию в отношениях между партнерами",
      rating: 4.9,
      sessions: 490,
      price: 2500,
      isOnline: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Наши психологи
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Профессиональные специалисты готовы помочь вам в решении любых вопросов
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {psychologists.map((psychologist) => (
          <Card key={psychologist.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={psychologist.image}
                alt={psychologist.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4">
                {psychologist.isOnline ? (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <Icon name="Circle" size={8} className="mr-1 fill-current" />
                    Онлайн
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <Icon name="Circle" size={8} className="mr-1 fill-current" />
                    Оффлайн
                  </Badge>
                )}
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {psychologist.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  {psychologist.specialization}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {psychologist.description}
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Icon name="Star" size={16} className="text-yellow-400 mr-1 fill-current" />
                    <span>{psychologist.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Users" size={16} className="mr-1" />
                    <span>{psychologist.sessions}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Clock" size={16} className="mr-1" />
                    <span>{psychologist.experience}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-gray-900">
                  {psychologist.price.toLocaleString('ru-RU')} ₽
                  <span className="text-sm font-normal text-gray-500"> / сеанс</span>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Записаться
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PsychologistsGrid;