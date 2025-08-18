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
      // Добавляем демо данные
      const demoPsychologists: Psychologist[] = [
        {
          id: "1",
          name: "Анна Петрова",
          email: "anna@mindcare.ru",
          login: "anna_petrov",
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
    resetToDefaultData
  };
};