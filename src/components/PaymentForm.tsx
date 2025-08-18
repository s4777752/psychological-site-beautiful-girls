import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PaymentFormProps {
  psychologistName?: string;
  sessionPrice?: number;
  onClose?: () => void;
  onPaymentSuccess?: (clientData: {name: string, email: string, phone: string}) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  psychologistName = "", 
  sessionPrice = 2500,
  onClose,
  onPaymentSuccess 
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Загружаем скрипт T-Bank
    const script = document.createElement('script');
    script.src = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Добавляем обработчик формы после загрузки скрипта
      if (formRef.current) {
        const form = formRef.current;
        
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          
          const formData = new FormData(form);
          const description = formData.get('description') as string;
          const amount = formData.get('amount') as string;
          const email = formData.get('email') as string;
          const phone = formData.get('phone') as string;
          
          // Устанавливаем чек
          const receiptData = {
            "EmailCompany": "info@mindcare.ru",
            "Taxation": "patent", 
            "FfdVersion": "1.2",
            "Items": [
              {
                "Name": description || "Психологическая консультация",
                "Price": Math.round(parseFloat(amount) * 100),
                "Quantity": 1.00,
                "Amount": Math.round(parseFloat(amount) * 100),
                "PaymentMethod": "full_prepayment",
                "PaymentObject": "service",
                "Tax": "none",
                "MeasurementUnit": "pc"
              }
            ]
          };

          const receiptInput = form.querySelector('input[name="receipt"]') as HTMLInputElement;
          if (receiptInput) {
            receiptInput.value = JSON.stringify(receiptData);
          }

          // Вызываем функцию оплаты T-Bank
          if (typeof (window as any).pay === 'function') {
            (window as any).pay(form);
            
            // После успешной оплаты вызываем callback
            if (onPaymentSuccess) {
              const clientData = {
                name: formData.get('name') as string,
                email: email,
                phone: phone
              };
              onPaymentSuccess(clientData);
            }
          }
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Оплата сеанса
          </CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
        {psychologistName && (
          <p className="text-gray-600">
            Консультация с {psychologistName}
          </p>
        )}
      </CardHeader>
      
      <CardContent>
        <style>{`
          .payform-tbank {
            display: flex;
            margin: 2px auto;
            flex-direction: column;
            max-width: 100%;
          }
          .payform-tbank-row {
            margin: 2px;
            border-radius: 4px;
            flex: 1;
            transition: 0.3s;
            border: 1px solid #DFE3F3;
            padding: 15px;
            outline: none;
            background-color: #DFE3F3;
            font-size: 15px;
          }
          .payform-tbank-row:focus {
            background-color: #FFFFFF;
            border: 1px solid #616871;
            border-radius: 4px;
          }
          .payform-tbank-btn {
            background-color: #FBC520;
            border: 1px solid #FBC520;
            color: #3C2C0B;
            cursor: pointer;
          }
          .payform-tbank-btn:hover {
            background-color: #FAB619;
            border: 1px solid #FAB619;
          }
        `}</style>
        
        <form 
          ref={formRef}
          className="payform-tbank" 
          name="payform-tbank" 
          id="payform-tbank"
        >
          <input 
            className="payform-tbank-row" 
            type="hidden" 
            name="terminalkey" 
            value="1755530914676DEMO" 
          />
          <input 
            className="payform-tbank-row" 
            type="hidden" 
            name="frame" 
            value="false" 
          />
          <input 
            className="payform-tbank-row" 
            type="hidden" 
            name="language" 
            value="ru" 
          />
          <input 
            className="payform-tbank-row" 
            type="hidden" 
            name="receipt" 
            value="" 
          />
          <input 
            className="payform-tbank-row" 
            type="text" 
            placeholder="Сумма заказа" 
            name="amount" 
            defaultValue={sessionPrice}
            required 
          />
          <input 
            className="payform-tbank-row" 
            type="hidden" 
            placeholder="Номер заказа" 
            name="order" 
          />
          <input 
            className="payform-tbank-row" 
            type="text" 
            placeholder="Описание заказа" 
            name="description"
            defaultValue={`Консультация психолога ${psychologistName} (50 минут)`}
          />
          <input 
            className="payform-tbank-row" 
            type="text" 
            placeholder="ФИО плательщика" 
            name="name"
            required 
          />
          <input 
            className="payform-tbank-row" 
            type="email" 
            placeholder="E-mail" 
            name="email"
            required 
          />
          <input 
            className="payform-tbank-row" 
            type="tel" 
            placeholder="Контактный телефон" 
            name="phone"
            required 
          />
          <input 
            className="payform-tbank-row payform-tbank-btn" 
            type="submit" 
            value="Оплатить" 
          />
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center text-blue-700 mb-2">
            <Icon name="Info" size={16} className="mr-2" />
            <span className="font-medium">Информация об оплате</span>
          </div>
          <ul className="text-sm text-blue-600 space-y-1">
            <li>• Длительность сеанса: 50 минут</li>
            <li>• Безопасная оплата через T-Bank</li>
            <li>• После оплаты вы получите подтверждение</li>
            <li>• Возврат средств возможен за 24 часа</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;