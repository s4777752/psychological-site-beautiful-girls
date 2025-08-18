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
      "/img/52ccc0ff-df9f-497e-8c51-a60191b978a3.jpg",
      "/img/55dc36c0-a21b-4877-890c-37ce72828085.jpg", 
      "/img/0bdc3d42-1f81-4a45-a156-eabc119ab018.jpg",
      "/img/3ee2f57f-8f87-4364-af0c-54f0710b4ee3.jpg",
      "/img/5f762636-5e2d-4df4-8800-02c1cdb9e7c2.jpg",
      "/img/4498d197-dfaf-42f3-b746-1733f710121a.jpg",
      "/img/0e1cb882-bb43-4e89-9bf7-bc5bef9a5141.jpg",
      "/img/87d8ec24-e9a5-43b9-9b2d-c1e98f3eebe4.jpg"
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