// SMS API интеграция
// Поддерживаемые провайдеры: SMS.ru, SMSC.ru, Twilio, и др.

interface SMSConfig {
  provider: 'sms.ru' | 'smsc.ru' | 'twilio';
  apiKey: string;
  apiSecret?: string;
  from?: string;
}

interface SendSMSRequest {
  phone: string;
  message: string;
}

interface SendSMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

class SMSService {
  private config: SMSConfig;

  constructor(config: SMSConfig) {
    this.config = config;
  }

  async sendSMS(request: SendSMSRequest): Promise<SendSMSResponse> {
    switch (this.config.provider) {
      case 'sms.ru':
        return this.sendViaSMSRu(request);
      case 'smsc.ru':
        return this.sendViaSMSC(request);
      case 'twilio':
        return this.sendViaTwilio(request);
      default:
        throw new Error('Unsupported SMS provider');
    }
  }

  private async sendViaSMSRu(request: SendSMSRequest): Promise<SendSMSResponse> {
    try {
      const response = await fetch('https://sms.ru/sms/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_id: this.config.apiKey,
          to: request.phone,
          msg: request.message,
          json: 1
        })
      });

      const data = await response.json();
      
      if (data.status === 'OK') {
        return {
          success: true,
          messageId: data.sms?.message_id
        };
      } else {
        return {
          success: false,
          error: data.status_text || 'SMS sending failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async sendViaSMSC(request: SendSMSRequest): Promise<SendSMSResponse> {
    try {
      const response = await fetch('https://smsc.ru/sys/send.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          login: this.config.apiKey,
          psw: this.config.apiSecret || '',
          phones: request.phone,
          mes: request.message,
          fmt: '3' // JSON format
        })
      });

      const data = await response.json();
      
      if (data.error_code === undefined) {
        return {
          success: true,
          messageId: data.id?.toString()
        };
      } else {
        return {
          success: false,
          error: data.error || 'SMS sending failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async sendViaTwilio(request: SendSMSRequest): Promise<SendSMSResponse> {
    try {
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${this.config.apiKey}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${this.config.apiKey}:${this.config.apiSecret}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: this.config.from || '',
          To: request.phone,
          Body: request.message
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          messageId: data.sid
        };
      } else {
        return {
          success: false,
          error: data.message || 'SMS sending failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Экспортируем сервис с конфигурацией по умолчанию
export const smsService = new SMSService({
  provider: 'sms.ru', // Можно изменить на нужный провайдер
  apiKey: process.env.VITE_SMS_API_KEY || 'your-api-key-here'
});

export type { SendSMSRequest, SendSMSResponse, SMSConfig };
export { SMSService };