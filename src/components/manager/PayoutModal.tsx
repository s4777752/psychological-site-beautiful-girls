import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface PsychologistData {
  id: number;
  name: string;
  email: string;
  totalSessions: number;
  totalEarned: number;
  commission: number;
  lastSession: string;
  rating: number;
  clientsCount: number;
}

interface PayoutModalProps {
  psychologist: PsychologistData;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PayoutModal = ({ psychologist, isOpen, onClose, onConfirm }: PayoutModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-warm-800">Выплата психологу</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="text-center p-4 bg-warm-50 rounded-lg">
              <h4 className="font-semibold text-warm-800 mb-2">{psychologist.name}</h4>
              <p className="text-sm text-warm-600 mb-3">{psychologist.email}</p>
              <div className="text-2xl font-bold text-green-600">
                ₽{psychologist.commission.toLocaleString()}
              </div>
              <p className="text-sm text-warm-500 mt-1">К выплате</p>
            </div>

            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" className="text-orange-600" size={16} />
                <p className="text-sm font-medium text-orange-800">Внимание!</p>
              </div>
              <p className="text-xs text-orange-700 mt-1">
                После выплаты все показатели психолога будут обнулены, 
                а данные перенесены в архив.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Всего сессий:</span>
                <span>{psychologist.totalSessions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Общий доход:</span>
                <span>₽{psychologist.totalEarned.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Комиссия платформы (55%):</span>
                <span>₽{(psychologist.totalEarned - psychologist.commission).toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Выплата психологу (45%):</span>
                  <span className="text-green-600">₽{psychologist.commission.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Отмена
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-green-600 hover:bg-green-700"
            >
              <Icon name="CreditCard" className="mr-2" size={16} />
              Подтвердить выплату
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutModal;