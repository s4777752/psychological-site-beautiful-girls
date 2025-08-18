import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ChatHeaderProps {
  recipientName: string;
  userType: 'client' | 'psychologist';
  unreadCount: number;
}

const ChatHeader = ({ recipientName, userType, unreadCount }: ChatHeaderProps) => {
  return (
    <Card className="border-warm-200 rounded-b-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-warm-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {recipientName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <CardTitle className="text-warm-800 text-lg">{recipientName}</CardTitle>
              <p className="text-sm text-warm-600">
                {userType === 'client' ? 'Ваш психолог' : 'Клиент'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Badge variant="destructive" className="bg-warm-600">
                {unreadCount}
              </Badge>
            )}
            <Button size="sm" variant="outline" className="border-warm-300">
              <Icon name="Phone" size={16} />
            </Button>
            <Button size="sm" variant="outline" className="border-warm-300">
              <Icon name="Video" size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ChatHeader;