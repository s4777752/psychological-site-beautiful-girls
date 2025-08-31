import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientAuth from './ClientAuth';
import ClientDashboard from './ClientDashboard';
import { findClientByPhone, ClientRecord, initializeDemoClients } from '@/utils/clientStorage';

const ClientPortal: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientData, setClientData] = useState<ClientRecord | null>(null);

  useEffect(() => {
    // Сначала инициализируем демо-клиентов
    initializeDemoClients();
    
    // Проверяем, есть ли сохраненная сессия клиента
    const savedClient = localStorage.getItem('clientSession');
    if (savedClient) {
      try {
        const { id, phone, name, timestamp } = JSON.parse(savedClient);
        // Проверяем, что сессия не старше 24 часов
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          // Дополнительно проверяем, что клиент все еще существует в базе
          const client = findClientByPhone(phone);
          if (client && client.isActive) {
            setClientData(client);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('clientSession');
          }
        } else {
          localStorage.removeItem('clientSession');
        }
      } catch (error) {
        console.error('Ошибка парсинга сессии клиента:', error);
        localStorage.removeItem('clientSession');
      }
    }
  }, []);

  const handleLogin = (client: ClientRecord) => {
    setClientData(client);
    setIsLoggedIn(true);
    
    // Сохраняем сессию клиента
    localStorage.setItem('clientSession', JSON.stringify({
      id: client.id,
      phone: client.phone,
      name: client.name,
      timestamp: Date.now()
    }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setClientData(null);
    localStorage.removeItem('clientSession');
  };

  if (isLoggedIn && clientData) {
    return (
      <ClientDashboard 
        clientData={clientData} 
        onLogout={handleLogout}
      />
    );
  }

  // Если не авторизован, перенаправляем на страницу входа
  useEffect(() => {
    // Делаем небольшую задержку для инициализации
    const timer = setTimeout(() => {
      if (!isLoggedIn && !clientData) {
        navigate('/client/login');
      } else if (isLoggedIn && clientData) {
        // Если авторизован, перенаправляем в дашборд
        navigate('/client/dashboard');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isLoggedIn, clientData, navigate]);

  // Показываем загрузку пока проверяем сессию
  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-warm-600 mx-auto mb-4"></div>
        <p className="text-warm-600">Проверяем авторизацию...</p>
      </div>
    </div>
  );
};

export default ClientPortal;