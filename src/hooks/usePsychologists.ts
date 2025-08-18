import { useState, useEffect } from "react";
import { Psychologist } from "@/types/psychologist";

export const usePsychologists = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);

  // Загружаем психологов из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem("psychologists");
    if (saved) {
      setPsychologists(JSON.parse(saved));
    } else {
      // Добавляем демо данные соответствующие главной странице
      const demoPsychologists: Psychologist[] = [
        {
          id: "1",
          name: "Анна Смирнова",
          email: "anna.smirnova@mindcare.ru",
          login: "anna_smirnova",
          password: "secure123",
          specialization: "Семейная терапия",
          experience: 8,
          description: "Специалист по семейным отношениям и детской психологии",
          photo: "/img/6e21af90-d81e-4f4e-b067-43f75a026d70.jpg",
          price: 2500,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "2", 
          name: "Мария Козлова",
          email: "maria.kozlova@mindcare.ru",
          login: "maria_kozlova",
          password: "pass456",
          specialization: "Тревожные расстройства",
          experience: 12,
          description: "Эксперт в области работы со стрессом и тревожностью",
          photo: "/img/e46f379d-2965-4b93-832b-a2aa073c0bb0.jpg",
          price: 2500,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "3",
          name: "Елена Волкова",
          email: "elena.volkova@mindcare.ru",
          login: "elena_volkova",
          password: "pass789",
          specialization: "Личностная терапия",
          experience: 6,
          description: "Помогаю в развитии личности и самопознании",
          photo: "/img/fd3261af-65ed-4738-b175-5bb7aa8bcc4a.jpg",
          price: 2500,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "4",
          name: "Дарья Петрова",
          email: "darya.petrova@mindcare.ru",
          login: "darya_petrova",
          password: "pass321",
          specialization: "Когнитивно-поведенческая терапия",
          experience: 10,
          description: "Специалист по работе с депрессией и фобиями",
          photo: "/img/507d09f6-4ed0-4a89-a012-fa2fba147e52.jpg",
          price: 2500,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "5",
          name: "София Романова",
          email: "sofia.romanova@mindcare.ru",
          login: "sofia_romanova",
          password: "pass654",
          specialization: "Арт-терапия",
          experience: 7,
          description: "Творческий подход к решению внутренних конфликтов",
          photo: "/img/4b2e6ff1-6a65-483d-9d56-631b510a50d3.jpg",
          price: 2500,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "6",
          name: "Виктория Новикова",
          email: "victoria.novikova@mindcare.ru",
          login: "victoria_novikova",
          password: "pass987",
          specialization: "Парная терапия",
          experience: 9,
          description: "Восстанавливаю гармонию в отношениях между партнерами",
          photo: "/img/b50310a6-0322-4453-a080-ed2a130fc8a9.jpg",
          price: 2500,
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      setPsychologists(demoPsychologists);
      localStorage.setItem("psychologists", JSON.stringify(demoPsychologists));
    }
  }, []);

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("psychologists", JSON.stringify(psychologists));
  }, [psychologists]);

  const generateLogin = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  };

  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const savePsychologist = (psychologist: Omit<Psychologist, 'id' | 'createdAt'>, editingPsychologist?: Psychologist | null) => {
    if (editingPsychologist) {
      // Редактирование
      setPsychologists(prev => prev.map(p => 
        p.id === editingPsychologist.id 
          ? { ...psychologist, id: editingPsychologist.id, createdAt: editingPsychologist.createdAt }
          : p
      ));
    } else {
      // Создание нового
      const newPsychologist: Psychologist = {
        ...psychologist,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setPsychologists(prev => [...prev, newPsychologist]);
    }
  };

  const deletePsychologist = (id: string) => {
    setPsychologists(prev => prev.filter(p => p.id !== id));
  };

  const togglePsychologistStatus = (id: string) => {
    setPsychologists(prev => prev.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const updateAvatars = () => {
    const avatarUrls = [
      "/img/148ae978-2c90-4d01-acd2-ccfa8e98a895.jpg",
      "/img/4ef3170e-e763-421c-a99e-ab2ee9a6add7.jpg", 
      "/img/ea8ae03c-77bd-4b60-b079-1a5fe301f22a.jpg",
      "/img/0debfe46-0706-4b20-8c73-c7c16e794e16.jpg",
      "/img/104cc427-5808-45e3-966b-067b8e3d9ca5.jpg",
      "/img/0a8c511e-7502-428f-b09a-381ae3e7e242.jpg",
      "/img/c33f23bd-8471-4caf-ab9a-fd9201b3f577.jpg",
      "/img/b4658d4c-1563-4682-b91b-ae1836ac54d7.jpg"
    ];
    
    setPsychologists(prev => prev.map((p, index) => ({
      ...p,
      photo: avatarUrls[index % avatarUrls.length] || p.photo
    })));
  };

  const resetToDefaultData = () => {
    const demoPsychologists: Psychologist[] = [
      {
        id: "1",
        name: "Анна Петрова",
        email: "anna@mindcare.ru",
        login: "anna_petrova",
        password: "secure123",
        specialization: "Семейная терапия",
        experience: 8,
        description: "Специализируюсь на работе с семейными парами и детско-родительскими отношениями",
        photo: "/api/placeholder/150/150",
        price: 10,
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "2", 
        name: "Михаил Сидоров",
        email: "mikhail@mindcare.ru",
        login: "mikhail_sid",
        password: "pass456",
        specialization: "Когнитивно-поведенческая терапия",
        experience: 12,
        description: "Помогаю справиться с тревожными расстройствами и депрессией",
        photo: "/api/placeholder/150/150",
        price: 10,
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
    setPsychologists(demoPsychologists);
    localStorage.setItem("psychologists", JSON.stringify(demoPsychologists));
  };

  return {
    psychologists,
    generateLogin,
    generatePassword,
    savePsychologist,
    deletePsychologist,
    togglePsychologistStatus,
    updateAvatars,
    resetToDefaultData
  };
};