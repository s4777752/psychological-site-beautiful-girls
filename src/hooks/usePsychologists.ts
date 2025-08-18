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
          photo: "/img/e8819b40-1740-4422-9215-a1e091b65dd1.jpg",
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
          photo: "/img/1835074a-97c0-454f-8e5d-c1122380e83b.jpg",
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
          photo: "/img/39c5356f-e920-4028-91d2-4d922e28ace3.jpg",
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
          photo: "/img/aadbab90-e716-4c17-b281-0ea1773babd2.jpg",
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
          photo: "/img/ecc98f30-32e3-48a6-9fe3-3258858f72d0.jpg",
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
          photo: "/img/4fcc6a49-2857-451e-81c7-c59a9186dffd.jpg",
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

  const resetToDefaultData = () => {
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
        photo: "/img/e8819b40-1740-4422-9215-a1e091b65dd1.jpg",
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
        photo: "/img/1835074a-97c0-454f-8e5d-c1122380e83b.jpg",
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
        photo: "/img/39c5356f-e920-4028-91d2-4d922e28ace3.jpg",
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
        photo: "/img/aadbab90-e716-4c17-b281-0ea1773babd2.jpg",
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
        photo: "/img/ecc98f30-32e3-48a6-9fe3-3258858f72d0.jpg",
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
        photo: "/img/4fcc6a49-2857-451e-81c7-c59a9186dffd.jpg",
        price: 2500,
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
    resetToDefaultData
  };
};