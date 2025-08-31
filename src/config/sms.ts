// SMS Configuration
export const SMS_CONFIG = {
  // SMS.ru настройки
  SMS_RU: {
    API_URL: 'https://sms.ru/sms/send',
    API_KEY: import.meta.env.VITE_SMS_RU_API_KEY || '', // Получить на https://sms.ru/
  },
  
  // SMSC.ru настройки  
  SMSC: {
    API_URL: 'https://smsc.ru/sys/send.php',
    LOGIN: import.meta.env.VITE_SMSC_LOGIN || '',
    PASSWORD: import.meta.env.VITE_SMSC_PASSWORD || '',
  },
  
  // Общие настройки
  MESSAGE_TEMPLATE: (code: string) => `Код подтверждения для входа в кабинет психолога: ${code}. Действителен 5 минут.`,
  CODE_EXPIRY_MINUTES: 5,
  
  // Для тестирования (если нет API ключей)
  DEMO_MODE: !import.meta.env.VITE_SMS_RU_API_KEY && !import.meta.env.VITE_SMSC_LOGIN
};