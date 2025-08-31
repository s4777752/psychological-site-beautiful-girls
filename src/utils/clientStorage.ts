// Утилиты для работы с клиентской базой и паролями

export interface ClientRecord {
  id: string;
  name: string;
  phone: string;
  password: string; // Пароль, который задает управляющий
  isActive: boolean; // Активен ли клиент
  createdAt: string;
  lastLogin?: string;
}

// Ключ для хранения клиентской базы с паролями
const CLIENT_DATABASE_KEY = 'clientDatabase';

// Получить базу клиентов
export const getClientDatabase = (): ClientRecord[] => {
  try {
    const data = localStorage.getItem(CLIENT_DATABASE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Ошибка чтения базы клиентов:', error);
    return [];
  }
};

// Сохранить базу клиентов
export const saveClientDatabase = (clients: ClientRecord[]): void => {
  try {
    localStorage.setItem(CLIENT_DATABASE_KEY, JSON.stringify(clients));
  } catch (error) {
    console.error('Ошибка сохранения базы клиентов:', error);
  }
};

// Найти клиента по номеру телефона
export const findClientByPhone = (phone: string): ClientRecord | null => {
  const clients = getClientDatabase();
  const cleanPhone = phone.replace(/\D/g, '');
  
  return clients.find(client => {
    const clientPhone = client.phone.replace(/\D/g, '');
    const normalizedClientPhone = clientPhone.startsWith('8') ? '7' + clientPhone.slice(1) : clientPhone;
    const normalizedPhone = cleanPhone.startsWith('8') ? '7' + cleanPhone.slice(1) : cleanPhone;
    return normalizedClientPhone === normalizedPhone;
  }) || null;
};

// Проверить авторизацию клиента
export const authenticateClient = (phone: string, password: string): { success: boolean; client?: ClientRecord; error?: string } => {
  const client = findClientByPhone(phone);
  
  if (!client) {
    return { success: false, error: 'Клиент не найден в базе' };
  }
  
  if (!client.isActive) {
    return { success: false, error: 'Доступ к аккаунту отключен. Обратитесь к администратору' };
  }
  
  if (client.password !== password) {
    return { success: false, error: 'Неверный пароль' };
  }
  
  // Обновляем время последнего входа
  const clients = getClientDatabase();
  const clientIndex = clients.findIndex(c => c.id === client.id);
  if (clientIndex >= 0) {
    clients[clientIndex].lastLogin = new Date().toISOString();
    saveClientDatabase(clients);
  }
  
  return { success: true, client: { ...client, lastLogin: new Date().toISOString() } };
};

// Добавить или обновить клиента (для управляющего)
export const upsertClient = (clientData: Omit<ClientRecord, 'id' | 'createdAt'>): void => {
  const clients = getClientDatabase();
  const existingClientIndex = clients.findIndex(c => {
    const clientPhone = c.phone.replace(/\D/g, '');
    const newPhone = clientData.phone.replace(/\D/g, '');
    const normalizedClientPhone = clientPhone.startsWith('8') ? '7' + clientPhone.slice(1) : clientPhone;
    const normalizedNewPhone = newPhone.startsWith('8') ? '7' + newPhone.slice(1) : newPhone;
    return normalizedClientPhone === normalizedNewPhone;
  });
  
  if (existingClientIndex >= 0) {
    // Обновляем существующего клиента
    clients[existingClientIndex] = {
      ...clients[existingClientIndex],
      ...clientData
    };
  } else {
    // Добавляем нового клиента
    const newClient: ClientRecord = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...clientData,
      createdAt: new Date().toISOString()
    };
    clients.push(newClient);
  }
  
  saveClientDatabase(clients);
};

// Генерировать случайный пароль
export const generatePassword = (length: number = 8): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Инициализация демо-данных (если база пустая)
export const initializeDemoClients = (): void => {
  const clients = getClientDatabase();
  
  if (clients.length === 0) {
    const demoClients: ClientRecord[] = [
      {
        id: '1',
        name: 'Анна Петрова',
        phone: '+7 (999) 123-45-67',
        password: 'anna123',
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Михаил Сидоров', 
        phone: '+7 (999) 987-65-43',
        password: 'mikhail456',
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
    
    saveClientDatabase(demoClients);
  }
};